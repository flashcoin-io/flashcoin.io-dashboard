/**
 * Created by sontt on 9/21/16.
 */
import AndamanService from '../andaman-service';
import store from '../store';
import * as actions from './actions';

export default class AdminService {
    constructor() {
    }

    searchUser(criteria: any) {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                console.log('search: ', {
                    term: criteria.term,
                    start: criteria.start,
                    size: criteria.size,
                    start_date: criteria.start_date,
                    end_date: criteria.end_date,
                    created_by: criteria.created_by
                });

                andaman.admin_search_users(pipe, {
                    term: criteria.term,
                    start: criteria.start,
                    size: criteria.size,
                    start_date: criteria.start_date,
                    end_date: criteria.end_date,
                    order_by: criteria.order_by,
                    asc: criteria.asc,
                    created_by: criteria.created_by,
                }, function(resp) {
                    resolve(resp);
                })
            })
        })
    }

    getWalletsByEmail(email, start, size) {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                var criteria = {
                    email: email,
                    start: start,
                    size: size
                }
                andaman.get_wallets_by_email(pipe, criteria, function(resp) {
                    resolve(resp);
                })
            })
        });
    }

    getTransactionsByUser({email, from, to, start, size}: {email: string, from: string, to: string, start: number, size: number}) {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                // email, date_from, date_to, start, size, type, order
                var data = {email: email, date_from: from, date_to: to, start: start, size: size};
                andaman.admin_get_txns_by_email(pipe, data, function(resp) {
                    resolve(resp);
                })
            })
        })
    }

    getTransactions({from, to, start, size, transactionType}) {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                var data = {date_from: from, date_to: to, 
                    start: start, size: size,
                    transaction_type: transactionType
                };
                andaman.admin_get_transactions(pipe, data, function(resp) {
                    resolve(resp);
                })
            })
        })
    }

    getTrackings({from, to, start, size}) {
        return new Promise<any>(function(resolve) {
            AndamanService.ready().then(function(opts) {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                var data = {date_from: from, date_to: to, 
                    start: start, size: size
                };
                andaman.admin_get_fountain_trackings(pipe, data, function(resp) {
                    resolve(resp);
                })
            });
        });
    }

    unsubscribeEmail(info) {
        return new Promise<any>(function (resolve) {
            AndamanService.ready().then(function (opts) {
                let andaman = opts.andaman;
                let pipe = opts.pipe;

                andaman.unsubscribe_email(pipe, info, function (resp) {
                    resolve(resp);
                })
            });
        })
    }

    searchUnsubscribeEmails(criteria: any) {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                console.log('search: ', {
                    term: criteria.term,
                    start: criteria.start,
                    size: criteria.size,
                    created_by: criteria.created_by
                });

                andaman.admin_search_unsubscribe_emails(pipe, {
                    term: criteria.term,
                    start: criteria.start,
                    size: criteria.size,
                    order_by: criteria.order_by,
                    asc: criteria.asc,
                    created_by: criteria.created_by,
                }, function(resp) {
                    resolve(resp);
                })
            })
        })
    }

    private static _instance: AdminService;
    static singleton(){
        if(!AdminService._instance) {
            AdminService._instance = new AdminService();
        }

        return AdminService._instance;
    }
}