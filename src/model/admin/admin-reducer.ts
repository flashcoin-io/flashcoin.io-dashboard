/**
 * Created by sontt on 9/22/16.
 */
import { ADMIN, IAdminData, IFindAccountsData, ISignupAccountsData, IUserDetails, IAccount, ITransactionsData, IPagingOptions } from '../types';

const initialState: IAdminData = {
    findAccountData: {
        accounts: [],
        searchText: '',
        paging: { pageSize: 20, pageIndex: 0, total: 0 },
    },
    signupAccountData: {
        accounts: [],
        range: { from: '', to: '' },
        paging: { pageSize: 20, pageIndex: 0, total: 0 },
    },
    userDetails: {
        user: null,
        txns: [],
        range: null,
        pagingOpts: { pageSize: 20, pageIndex: 0, total: 0 }
    },
    transactionsData: {
        txns: [],
        range: null,
        pagingOpts: { pageSize: 20, pageIndex: 0, total: 0 }
    },
    listTrackingsData: {
        trackings: [],
        range: { from: '', to: '' }
    },
    unsubscribeEmailData: {
        emails: [],
        searchText: '',
        emailsList: '',
        paging: { pageSize: 20, pageIndex: 0, total: 0, orderBy: 'created_ts', asc: false },
        submitResult: { err: null, results: null }
    }
};

export default function adminReducer(state = initialState, action) {
    if (action.type === ADMIN.FIND_ACCOUNTS_SUCCESS) {
        let adminData: IFindAccountsData = action.data;
        let accounts = adminData.accounts;
        let searchText = adminData.searchText;
        let paging = adminData.paging;
        // pageOpts.total = action.data.total;

        // return Object.assign({}, state, {accounts, pageOpts, searchText});
        return newState(state, { findAccountData: { accounts, paging, searchText } });
    } else if (action.type === ADMIN.SIGNUP_ACCOUNTS_SUCCESS) {
        let signupData: ISignupAccountsData = action.data;
        let accounts = signupData.accounts;
        let range = signupData.range;
        let paging = signupData.paging;
        // pageOpts.total = action.data.total;

        // return Object.assign({}, state, {accounts, pageOpts, searchText});
        return newState(state, { signupAccountData: { accounts, paging, range } });
    } else if (action.type === ADMIN.GET_USER_TXNS_SUCCESS) {
        let userDetails: IUserDetails = action.data;
        let user = userDetails.user;
        let txns = userDetails.txns;
        let range = userDetails.range;
        // let pageOptsTxns = state.pageOpts;
        let pageOptsTxns = userDetails.pagingOpts;

        return newState(state, { userDetails: { user, txns, range: range, pagingOpts: pageOptsTxns } })
    } else if (action.type === ADMIN.GET_TXNS_SUCCESS) {
        let transactionsData: ITransactionsData = action.data;
        let txns1 = transactionsData.txns;
        let range1 = transactionsData.range;
        // let pageOptsTxns = state.pageOpts;
        let pageOptsTxns1 = transactionsData.pagingOpts;

        return newState(state, { transactionsData: { txns: txns1, range: range1, pagingOpts: pageOptsTxns1 } })
    } else if (action.type === ADMIN.GET_USER_WALLET_SUCCESS) {
        let walletData = action.data;
        return newState(state, { userWallet: walletData });
    } else if (action.type === ADMIN.GET_FTN_TRACKINGS_SUCCESS) {
        let {trackings, paging, range} = action.data;
        return newState(state, { listTrackingsData: { trackings, paging, range } });
    } else if (action.type === ADMIN.FIND_UNSUBSCRIBE_EMAILS_SUCCESS) {
        let unsubscribeEmailsData = action.data;
        let emails = unsubscribeEmailsData.emails;
        let searchText = unsubscribeEmailsData.searchText;
        let paging = unsubscribeEmailsData.paging;
        return newState(state, { unsubscribeEmailData: { emails, paging, searchText } });
    } else if (action.type === ADMIN.UNSUBSCRIBE_EMAIL_SUCCESS) {
        let submitResult = { err: null, results: action.data };
        let newUnsubscribeEmailData = Object.assign({}, state.unsubscribeEmailData, {submitResult});
        return newState(state, { unsubscribeEmailData: newUnsubscribeEmailData })
    } else {
        return state;
    }
}

function newState(state, adminData: IAdminData) {
    return Object.assign({}, state, adminData);
}