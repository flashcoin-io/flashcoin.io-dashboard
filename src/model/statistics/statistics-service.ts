/**
 * Created by sontt on 9/21/16.
 */
import AndamanService from '../andaman-service';
import store from '../store';
import * as actions from './actions';

export default class StatisticsService {
    constructor() { }

    getWalletSnapshot() {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                andaman.admin_get_balance_snapshot_stats(pipe, {}, function (resp) {
                    resolve(resp);
                })
            })
        });
    }

    getWalletDaily(criteria: any) {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                andaman.admin_get_wallet_daily_stats(pipe, {
                    start_date: criteria.startDate, end_date: criteria.endDate
                }, function (resp) {
                    resolve(resp);
                })
            })
        })
    }

    getSignupDaily(criteria: any) {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                andaman.admin_get_signup_daily_stats(pipe, {
                    start_date: criteria.startDate, end_date: criteria.endDate
                }, function (resp) {
                    resolve(resp);
                })
            })
        })
    }

    getTransactionDaily(criteria: any) {
        return new Promise<any>((resolve) => {
            AndamanService.ready().then((opts) => {
                var andaman = opts.andaman;
                var pipe = opts.pipe;

                andaman.admin_get_tx_daily_stats(pipe, {
                    start_date: criteria.startDate, end_date: criteria.endDate
                }, function (resp) {
                    resolve(resp);
                })
            })
        })
    }

    getFountainTrackingDaily(criteria: { startDate: string, endDate: string }) {
        return new Promise<any>(function (resolve) {
            AndamanService.ready().then(function (opts) {
                let andaman = opts.andaman;
                let pipe = opts.pipe;

                andaman.admin_get_fountain_trackings_daily(pipe, {
                    start_date: criteria.startDate,
                    end_date: criteria.endDate
                }, function (resp) {
                    resolve(resp);
                })
            });
        })
    }

    private static _instance: StatisticsService;
    static singleton() {
        if (!StatisticsService._instance) {
            StatisticsService._instance = new StatisticsService();
        }

        return StatisticsService._instance;
    }
}