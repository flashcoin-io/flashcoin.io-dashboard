/**
 * Created by sontt on 9/21/16.
 */
import {STATISTICS, IWalletSnapshot, ITransactionDaily, IStatisticsData, ISignupDaily} from '../types';

const initialState = {
    walletSnapshot: {} as IWalletSnapshot,
    transactionDaily: {
        current_stats: {today_so_far_tx_top: []},
        daily_stats: [],
        period_stats: []
    } as ITransactionDaily
};

export default function statisticsReducer(state = initialState, action){
    switch(action.type){
        case STATISTICS.WALLET_SNAPSHOT_SUCCESS:
            var walletSnapshot: IWalletSnapshot = action.data;
            return newState(state, {walletSnapshot: walletSnapshot});
        case STATISTICS.TX_DAILY_SUCCESS:
            var transactionDaily: ITransactionDaily = action.data;
            return newState(state, {transactionDaily: transactionDaily});
        case STATISTICS.SIGNUP_DAILY_SUCCESS:
            var signupDaily: ISignupDaily = action.data;
            return newState(state, {signupDaily: signupDaily});
        case STATISTICS.FTN_TRACKING_DAILY_SUCCESS:
            let ftnTrackingDaily = action.data;
            return newState(state, {ftnTrackingDaily: ftnTrackingDaily});
        default:
            return state
    }
}

function newState(state, statisticsData: IStatisticsData) {
    return Object.assign({}, state, statisticsData);
}