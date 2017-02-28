/**
 * Created by sontt on 9/21/16.
 */
import {
    STATISTICS, IWalletSnapshot, IWalletCurrentStats, ITransactionDaily, IWalletDailyStats,
    IWalletBalanceStats, ITransactionDailyDailyStats, ITransactionDailyCurrentStats, ISignupDaily,
    IFountainTrackingDaily
} from '../types';
import store from '../store';
import StatisticsService from './statistics-service';
import commonActions from '../common/actions';

interface GetWalletDailyResp {
    rc: number;
    daily_stats: IWalletDailyStats[];
    period_stats: any;
    current_stats: IWalletCurrentStats;
    balance_stats: IWalletBalanceStats;
}

interface GetTransactionDailyResp {
    rc: number;
    daily_stats: ITransactionDailyDailyStats[];
    period_stats: any;
    current_stats: ITransactionDailyCurrentStats
}

interface GetSignupDailyResp extends ISignupDaily {
    rc: number;
}

interface GetFountainTrackingDailyResp {
    rc: number;
    daily_stats: IFountainTrackingDaily[];
}

const statisticsActions = {
    getWalletSnapshot() {
        return (dispatch) => {
            StatisticsService.singleton().getWalletSnapshot().then((resp) => {
                console.log('+++++ getWalletSnapshot resp = ' + JSON.stringify(resp));
                if (resp.rc === 1) {
                    dispatch(statisticsActions.getWalletSnapshotSuccess(resp.wallet_snapshot));
                } else {
                    dispatch(statisticsActions.getWalletSnapshotFailed());
                }
            })
        }
    },

    getWalletDaily(opts) {
        return (dispatch) => {
            StatisticsService.singleton().getWalletDaily({
                startDate: opts.startDate, endDate: opts.endDate
            }).then((resp: GetWalletDailyResp) => {
                console.log('+++++ getWalletDaily resp = ' + JSON.stringify(resp));
                if (resp.rc === 1) {
                    dispatch(statisticsActions.getWalletSnapshotSuccess({
                        daily_stats: resp.daily_stats,
                        period_stats: resp.period_stats,
                        current_stats: resp.current_stats,
                        balance_stats: resp.balance_stats
                    }));
                } else {
                    dispatch(statisticsActions.getWalletSnapshotFailed());
                }
            })
        }
    },

    sortTnx(tx1, tx2) {
        return (tx2.date != undefined && tx1.date != undefined) ? new Date(tx2.date).getTime() - new Date(tx1.date).getTime() : 0;
    },

    getSignupDaily(opts) {
        return (dispatch) => {
            StatisticsService.singleton().getSignupDaily({
                startDate: opts.startDate, endDate: opts.endDate
            }).then((resp: GetSignupDailyResp) => {
                console.log('+++++ getSignupDaily resp = ' + JSON.stringify(resp));
                if (resp.rc === 1) {
                    dispatch(statisticsActions.getSignupDailySuccess({
                        daily_stats: resp.daily_stats,
                        period_stats: resp.period_stats,
                        current_stats: resp.current_stats
                    }));
                } else {
                    dispatch(statisticsActions.getSignupDailyFailed())
                }
            });
        }
    },

    getFountainTrackingDaily(opts) {
        return function (dispatch) {
            StatisticsService.singleton().getFountainTrackingDaily({
                startDate: opts.startDate, endDate: opts.endDate
            }).then(function (resp: GetFountainTrackingDailyResp) {
                console.log('+++++ getFountainTrackingDaily resp = ' + JSON.stringify(resp));
                if (resp.rc === 1) {
                    dispatch({
                        type: STATISTICS.FTN_TRACKING_DAILY_SUCCESS,
                        data: resp.daily_stats
                    })
                }
            })
        }
    },

    getTransactionDaily(opts) {
        return (dispatch) => {
            StatisticsService.singleton().getTransactionDaily({
                startDate: opts.startDate, endDate: opts.endDate
            }).then((resp: GetTransactionDailyResp) => {
                console.log('+++++ getTransactionDaily resp = ' + JSON.stringify(resp));
                if (resp.rc === 1) {
                    dispatch(statisticsActions.getTransactionDailySuccess({
                        daily_stats: resp.daily_stats,
                        period_stats: resp.period_stats,
                        current_stats: resp.current_stats
                    }));
                } else {
                    dispatch(statisticsActions.getTransactionDailyFailed())
                }
            });
        }
    },

    getTransactionDailySuccess(dailyStats: ITransactionDaily): { type: string, data: ITransactionDaily } {
        return { type: STATISTICS.TX_DAILY_SUCCESS, data: dailyStats };
    },

    getTransactionDailyFailed() {
        return { type: STATISTICS.TX_DAILY_FAILED };
    },

    getSignupDailySuccess(dailyStats: ISignupDaily): { type: string, data: ISignupDaily } {
        return { type: STATISTICS.SIGNUP_DAILY_SUCCESS, data: dailyStats };
    },

    getSignupDailyFailed() {
        return { type: STATISTICS.SIGNUP_DAILY_FAILED };
    },

    getWalletSnapshotSuccess(walletSnapshot: IWalletSnapshot): { type: string, data: IWalletSnapshot } {
        return { type: STATISTICS.WALLET_SNAPSHOT_SUCCESS, data: walletSnapshot };
    },
    getWalletSnapshotFailed() {
        return { type: STATISTICS.WALLET_SNAPSHOT_FAILED };
    }
};

export default statisticsActions;