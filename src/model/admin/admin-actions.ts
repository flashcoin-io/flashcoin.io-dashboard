/**
 * Created by sontt on 9/21/16.
 */
import {
    ADMIN, IPagingOptions, IAccount, IAdminData, IFindAccountsData, ITransaction,
    IFullTransaction, IUserDetails, DirectionType, IDateRange, ISignupAccountsData, ITransactionsData, IFountainTracking
} from '../types';
import store from '../store';
import AdminService from './admin-service';
import commonActions from '../common/actions';
import async from 'async';

interface SearchUserServerUser {
    created_ts: string;
    created_by: string;
    display_name: string;
    email: string;
    phone: string;
    balance: number;
}
interface SearchUserResp {
    rc: number;
    users: SearchUserServerUser[];
    total_members: number;
}

interface GetTxnsByUserResp {
    rc: number;
    txns: ServerTxn[];
    total_txns: number;
}

interface ServerUserWallet {
    username: string;
    email: string;
    display_name: string;
    profile_pic_url: string;
    id: string;
    currency_type: number;
    address: string;
    status: number;
}

interface GetWalletsByEmailResp {
    rc: number;
    results: ServerUserWallet[];
}

interface ServerTxn {
    sender_email: string;
    sender_public_address: string;
    sender_display_name: string;
    receiver_email: string;
    receiver_display_name: string;
    receiver_public_address: string;
    memo: string;
    amount: number;
    created_ts: string;
    transaction_id: string;
}

interface IGetFountainTrackingsResp {
    rc: number;
    total_count: number;
    trackings: IFountainTracking[];
}

const adminActions = {
    findAccounts(opts: { term: string, startDate: string, endDate: string, pagingOpts: IPagingOptions }) {
        return (dispatch) => {
            dispatch(commonActions.toggleLoading(true));
            var paging = opts.pagingOpts;
            var data = {
                term: opts.term,
                start: paging.pageIndex * paging.pageSize,
                size: paging.pageSize,
                start_date: opts.startDate ? opts.startDate : null,
                end_date: opts.endDate ? opts.endDate : null,
                order_by: paging.orderBy,
                asc: paging.asc
            };

            AdminService.singleton().searchUser(data).then((resp: SearchUserResp) => {
                console.log('+++++ searchUser resp = ' + JSON.stringify(resp));
                dispatch(commonActions.toggleLoading(false));
                if (resp.rc === 1) {
                    var users: IAccount[] = resp.users.map((u) => {
                        return {
                            createdTime: u.created_ts,
                            createdBy: u.created_by,
                            name: u.display_name,
                            email: u.email,
                            phone: u.phone,
                            balance: u.balance || 0
                        } as IAccount;
                    });

                    dispatch(adminActions.findAccountsSuccess(users, opts.term,
                        {
                            pageIndex: paging.pageIndex, pageSize: paging.pageSize,
                            total: resp.total_members, orderBy: paging.orderBy, asc: paging.asc
                        }));
                } else {
                    dispatch(adminActions.findAccountsFailed());
                }
            })
        }
    },

    signupAccounts(opts: { startDate: string, endDate: string, createdVia: string, pagingOpts: IPagingOptions }) {
        return (dispatch) => {
            dispatch(commonActions.toggleLoading(true));
            var paging = opts.pagingOpts;
            var data = {
                term: null,
                start: paging.pageIndex * paging.pageSize,
                size: paging.pageSize,
                start_date: opts.startDate ? opts.startDate : null,
                end_date: opts.endDate ? opts.endDate : null,
                order_by: paging.orderBy,
                asc: paging.asc,
                created_by: opts.createdVia
            };

            AdminService.singleton().searchUser(data).then((resp: SearchUserResp) => {
                console.log('+++++ searchUser resp = ' + JSON.stringify(resp));
                dispatch(commonActions.toggleLoading(false));
                if (resp.rc === 1) {
                    var users: IAccount[] = resp.users.map((u) => {
                        return {
                            createdTime: u.created_ts,
                            createdBy: u.created_by,
                            name: u.display_name,
                            email: u.email,
                            phone: u.phone,
                            balance: u.balance || 0
                        } as IAccount;
                    });

                    dispatch(adminActions.signupAccountsSuccess(users, { from: opts.startDate, to: opts.endDate },
                        {
                            pageIndex: paging.pageIndex, pageSize: paging.pageSize,
                            total: resp.total_members, orderBy: paging.orderBy, asc: paging.asc
                        }));
                } else {
                    dispatch(adminActions.signupAccountsFailed());
                }
            })
        }
    },

    getTransactionsByUser({account, from, to, paging}: { account: IAccount, from: string, to: string, paging: IPagingOptions }) {
        return (dispatch) => {
            dispatch(commonActions.toggleLoading(true));
            var email = account.email;
            var start = paging.pageIndex * paging.pageSize;
            var size = paging.pageSize;
            AdminService.singleton().getTransactionsByUser({ email, from, to, start, size })
                .then((resp: GetTxnsByUserResp) => {
                    console.log('+++++ getTransactionsByUser resp = ' + JSON.stringify(resp));
                    dispatch(commonActions.toggleLoading(false));
                    if (resp.rc === 1) {
                        var owner = account;
                        var txns: ITransaction[] = resp.txns.map((tx: ServerTxn) => {
                            var direction = (owner.email == tx.receiver_email) ? DirectionType.Incomming : DirectionType.Outgoing;

                            return {
                                name: (direction == DirectionType.Incomming) ? tx.sender_display_name : tx.receiver_display_name,
                                email: (direction == DirectionType.Incomming) ? tx.sender_email : tx.receiver_email,
                                publicAddress: (direction == DirectionType.Incomming) ? tx.sender_public_address : tx.receiver_public_address,
                                note: tx.memo,
                                amount: tx.amount,
                                date: tx.created_ts,
                                direction: direction,
                                txid: tx.transaction_id
                            } as ITransaction
                        });

                        dispatch(adminActions.getTransactionsByUserSuccess(account, txns, { from: from, to: to },
                            { pageIndex: paging.pageIndex, pageSize: paging.pageSize, total: resp.total_txns }));
                    } else {
                        dispatch(adminActions.getTransactionsByUserFailed());
                    }
                })
        }
    },

    getWalletsByEmail(email) {
        return (dispatch) => {
            var start = 0;
            var size = 1;
            AdminService.singleton().getWalletsByEmail(email, start, size)
                .then((resp: GetWalletsByEmailResp) => {
                    console.log('+++++ getWalletsByEmail resp = ' + JSON.stringify(resp));
                    if (resp.rc === 1) {
                        var wallet = resp.results[0];
                        dispatch(adminActions.getWalletsByEmailSuccess(wallet));
                    }
                })
        }
    },

    getWalletsByEmailSuccess(wallet: ServerUserWallet): { type: string, data: ServerUserWallet } {
        return { type: ADMIN.GET_USER_WALLET_SUCCESS, data: wallet }
    },

    getTransactions({from, to, transactionType, paging}: { from: string, to: string, transactionType: string, paging: IPagingOptions }) {
        return (dispatch) => {
            dispatch(commonActions.toggleLoading(true));
            var start = paging.pageIndex * paging.pageSize;
            var size = paging.pageSize;
            AdminService.singleton().getTransactions({ from, to, start, size, transactionType: transactionType })
                .then((resp: GetTxnsByUserResp) => {
                    console.log('+++++ getTransactions resp = ' + JSON.stringify(resp));
                    dispatch(commonActions.toggleLoading(false));
                    if (resp.rc === 1) {
                        var txns: IFullTransaction[] = resp.txns.map((tx: ServerTxn) => {
                            return {
                                // name: tx.sender_display_name,
                                from: tx.sender_email,
                                senderPublicAddress: tx.sender_public_address,
                                to: tx.receiver_email,
                                receiverPublicAddress: tx.receiver_public_address,
                                note: tx.memo,
                                amount: tx.amount,
                                date: tx.created_ts,
                                txid: tx.transaction_id
                            } as IFullTransaction
                        });

                        dispatch(adminActions.getTransactionsSuccess(txns, { from: from, to: to },
                            { pageIndex: paging.pageIndex, pageSize: paging.pageSize, total: resp.total_txns }));
                    }
                })
        }
    },

    getTransactionsByUserFailed: function (): any {
        return { type: ADMIN.GET_USER_TXNS_FAILED };
    },

    getTransactionsByUserSuccess: function (user: IAccount, txns: ITransaction[], range: IDateRange,
        paging: IPagingOptions): { type: string, data: IUserDetails } {
        // return (dispatch) =>{
        //     dispatch({type: ADMIN.GET_USER_TXNS_SUCCESS, data: {user, txns, range, pagingOpts:paging}});

        //     bus.emit(ADMIN.GET_USER_TXNS_SUCCESS, {user, txns, range, pagingOpts:paging});
        //     bus.emit(ADMIN.ON_CHANGE);
        // };
        return { type: ADMIN.GET_USER_TXNS_SUCCESS, data: { user, txns, range, pagingOpts: paging } }
    },

    getTransactionsSuccess: function (txns: IFullTransaction[], range: IDateRange,
        paging: IPagingOptions): { type: string, data: ITransactionsData } {
        return { type: ADMIN.GET_TXNS_SUCCESS, data: { txns, range, pagingOpts: paging } }
    },

    findAccountsSuccess(accounts: IAccount[], searchText: string, paging: IPagingOptions): { type: string, data: IFindAccountsData } {
        return { type: ADMIN.FIND_ACCOUNTS_SUCCESS, data: { accounts, searchText, paging } };
    },

    findAccountsFailed() {
        return { type: ADMIN.FIND_ACCOUNTS_FAILED };
    },

    signupAccountsSuccess(accounts: IAccount[], range: IDateRange, paging: IPagingOptions): { type: string, data: ISignupAccountsData } {
        return { type: ADMIN.SIGNUP_ACCOUNTS_SUCCESS, data: { accounts, range, paging } };
    },

    signupAccountsFailed() {
        return { type: ADMIN.SIGNUP_ACCOUNTS_FAILED };
    },

    getFountainTrackings({from, to, paging}: { from: string, to: string, paging: IPagingOptions }) {
        return function (dispatch) {
            dispatch(commonActions.toggleLoading(true));
            var start = paging.pageIndex * paging.pageSize;
            var size = paging.pageSize;
            AdminService.singleton().getTrackings({ from: from, to: to, start: start, size: size })
                .then(function (resp: IGetFountainTrackingsResp) {
                    console.log('+++++ getTrackings resp = ' + JSON.stringify(resp));
                    dispatch(commonActions.toggleLoading(false));
                    if (resp.rc === 1) {
                        let action = {
                            type: ADMIN.GET_FTN_TRACKINGS_SUCCESS,
                            data: {
                                trackings: resp.trackings,
                                range: { from: from, to: to },
                                paging: { pageIndex: paging.pageIndex, pageSize: paging.pageSize, total: resp.total_count }
                            }
                        }
                        dispatch(action);
                    }
                })
        }
    },
    unsubscribeEmail(emails) {
        let emailsList = emails.split(',');
        let asyncFuncs = [];
        for (let email of emailsList) {
            asyncFuncs.push(createUnsubscribeEmailFunc(email.trim()));
        }
        return (dispatch) => {
            async.series(asyncFuncs, (err, results) => {
                if (err) {
                    dispatch(adminActions.unsubscribeEmailFailed(err));
                } else {
                    dispatch(adminActions.unsubscribeEmailSuccess(results));
                }
            });
        }
    },

    unsubscribeEmailSuccess(results) {
        return { type: ADMIN.UNSUBSCRIBE_EMAIL_SUCCESS, data: { results } };
    },

    unsubscribeEmailFailed(err) {
        return { type: ADMIN.UNSUBSCRIBE_EMAIL_FAILED, data: { err } };
    },

    findUnsubscribeEmails(opts: { term: string, pagingOpts: IPagingOptions }) {
        return (dispatch) => {
            dispatch(commonActions.toggleLoading(true));
            var paging = opts.pagingOpts;
            var data = {
                term: opts.term,
                start: paging.pageIndex * paging.pageSize,
                size: paging.pageSize,
                order_by: paging.orderBy,
                asc: paging.asc
            };

            AdminService.singleton().searchUnsubscribeEmails(data).then((resp: any) => {
                console.log('+++++ searchUnsubscribeEmail resp = ' + JSON.stringify(resp));
                dispatch(commonActions.toggleLoading(false));
                if (resp.rc === 1) {
                    var emails = resp.emails.map((u) => {
                        return {
                            createdTime: u.created_ts,
                            email: u.email
                        };
                    });

                    dispatch(adminActions.findUnsubscribeEmailsSuccess(emails, opts.term,
                        {
                            pageIndex: paging.pageIndex, pageSize: paging.pageSize,
                            total: resp.total_emails, orderBy: paging.orderBy, asc: paging.asc
                        }));
                } else {
                    dispatch(adminActions.findUnsubscribeEmailsFailed());
                }
            })
        }
    },

    findUnsubscribeEmailsSuccess(emails, searchText: string, paging: IPagingOptions): { type: string, data: any } {
        return { type: ADMIN.FIND_UNSUBSCRIBE_EMAILS_SUCCESS, data: { emails, searchText, paging } };
    },

    findUnsubscribeEmailsFailed() {
        return { type: ADMIN.FIND_UNSUBSCRIBE_EMAILS_FAILED };
    },
};

function createUnsubscribeEmailFunc(email: string) {
    return function (callback) {
        AdminService.singleton().unsubscribeEmail({ email }).then((resp: any) => {
            console.log('+++++ unsubscribeEmail resp = ' + JSON.stringify(resp));
            if (resp.rc == "1") {
                callback(null, resp.data.unsubscribed_email);
            } else {
                callback(resp, null);
            }
        });
    }
}
export default adminActions;