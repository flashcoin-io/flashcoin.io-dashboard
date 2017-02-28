import {bind } from '../refs';

import {tsx, registerReact} from "../../../core/tsx-react";
import * as React from "react";
import store from '../../../model/store';
import statisticsActions from '../../../model/statistics/stats-actions';
import numeral from 'numeraljs';
import moment from 'moment';
import {
    IWalletSnapshot, ITransactionDailyDailyStats, IWalletCurrentStats, IWalletBalanceStats,
    IWalletDailyStats, IServerTransaction
} from '../../../model/types';

interface IWalletItem {
    name: string;
    value?: string;
    header?: boolean;
}

var WalletInfo = ({items}: { items: IWalletItem[] }) => {
    return (
        <ul className="uk-list uk-list-space">
            {
                items.map((item) => {
                    if (item.header) {
                        return (
                            <li key={item.name}>
                                <div className="uk-panel-title">{item.name}</div>
                                <hr className="uk-margin-remove"></hr>
                            </li>
                        )
                    }

                    return (
                        <li key={item.name}>
                            <span>{item.name}</span>
                            <span className="uk-float-right">{item.value}</span>
                        </li>
                    );
                })
            }
        </ul>
    );
};

var TransactionList = (props: {
    items: TodaySoFarTransaction[], lastHour: TransactionDailySummaryStats,
    title: string, asOfToday: TransactionDailySummaryStats
}) => {
    var items: TodaySoFarTransaction[] = props.items;
    var lastHourSummary = props.lastHour;
    var title = props.title;
    var asOfTodaySummary = props.asOfToday;
    return (
        <div className="uk-panel uk-panel-box asof-today">
            <h3 className="uk-panel-title">{title}</h3>
            <table className="uk-table uk-table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th className="uk-text-right">Number</th>
                        <th className="uk-text-right">Total Value</th>
                        <th className="uk-text-right">Average Value	</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Last Hour</td>
                        <td className="uk-text-right">{numeral(lastHourSummary.count).format('0,0')}</td>
                        <td className="uk-text-right">{numeral(lastHourSummary.volume).format('0,0')}</td>
                        <td className="uk-text-right">{numeral(lastHourSummary.average || 0).format('0,0.00')}</td>
                    </tr>
                    <tr>
                        <td>As of Today</td>
                        <td className="uk-text-right">{numeral(asOfTodaySummary.count).format('0,0')}</td>
                        <td className="uk-text-right">{numeral(asOfTodaySummary.volume).format('0,0')}</td>
                        <td className="uk-text-right">{numeral(asOfTodaySummary.average || 0).format('0,0.00')}</td>
                    </tr>
                </tbody>
            </table>
            <div className="uk-accordion" data-uk-accordion >
                <h3 className="uk-accordion-title">As of Today Transactions <i className="uk-icon-caret-right uk-icon-right" style={{float: 'right'}}></i></h3>
                <div className="uk-accordion-content">
                    <table className="uk-table uk-table-striped">
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Recipient</th>
                                <th>Amount</th>
                                <th>Date/Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map((item) => {
                                    var amount: number = item.amount;
                                    return (
                                        <tr key={item.time.toString()}>
                                            <td>{item.sender}</td>
                                            <td>{item.recipient}</td>
                                            <td>{amount.toLocaleString('en')}</td>
                                            <td>{new Date(item.time).toLocaleString('en')}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
var TransactionSummaryList = (props: { items: TransactionDailySummaryStats[], title: string }) => {
    var items = props.items;
    var title = props.title;
    return (
        <div className="uk-panel uk-panel-box">
            <h3 className="uk-panel-title">{title}</h3>
            <table className="uk-table uk-table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Number</th>
                        <th>Total Value</th>
                        <th>Average Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item) => {
                            var date = new Date(item.date);
                            var tooltip = date.toLocaleString('en');
                            var dateString = date.toLocaleDateString('en');
                            var volume: number = item.volume;
                            var volumeString = numeral(volume).format('0,0');

                            var average: number = item.average;
                            var averageString = numeral(average).format('0,0.00');

                            return (
                                <tr key={item.date}>
                                    <td>{dateString}</td>
                                    <td>{item.count}</td>
                                    <td>{volumeString}</td>
                                    <td>{averageString}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

interface TodaySoFarTransaction {
    sender: string;
    recipient: string,
    amount: number,
    time: string;
}

interface TransactionDailySummaryStats {
    date: string;
    count: number;
    average: number;
    volume: number;
}

export default class Dashboard extends React.Component<any, any> {
    removeStoreListener;

    state = this.defaultState();

    defaultState() {
        return {
            walletSnapshot: [] as IWalletItem[],
            walletInfo: [] as IWalletItem[],
            affiliateSummary: [] as IWalletItem[],
            transactions: [],
            todaySoFarTransactions: [] as TodaySoFarTransaction[],
            past7DaysTransactions: [],
            lastHour: { average: 0 } as TransactionDailySummaryStats,
            asOfToday: {} as TransactionDailySummaryStats,
        }
    }

    componentDidMount() {
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));
        this.loadData();
    }

    componentWillUnmount() {
        this.removeStoreListener();
    }

    @bind
    onRefresh(e: UIEvent) {
        var states = this.defaultState();

        var newState = Object.assign({}, this.state, states);

        this.setState(newState);
        this.loadData();
    }

    loadData() {
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        store.dispatch(statisticsActions.getWalletDaily({ startDate: startDate, endDate: new Date() }));

        store.dispatch(statisticsActions.getTransactionDaily({ startDate: startDate, endDate: new Date() }));

        store.dispatch(statisticsActions.getSignupDaily({ startDate: moment().startOf('day'), 
        endDate: moment().endOf('day') }));
    }

    onApplicationStateChanged() {
        var walletSnapshot = store.getState().statisticsData.walletSnapshot || {} as IWalletSnapshot;
        var currentStats = walletSnapshot.current_stats || {} as IWalletCurrentStats;
        var balanceStats = walletSnapshot.balance_stats || {} as IWalletBalanceStats;
        var dailyStats = walletSnapshot.daily_stats || [] as IWalletDailyStats[];

        var todaySoFarTransactions = [] as TodaySoFarTransaction[];
        var past7DaysTransactions = [] as TransactionDailySummaryStats[];
        var transactionDaily = store.getState().statisticsData.transactionDaily;
        if (transactionDaily) {
            todaySoFarTransactions = transactionDaily.current_stats.today_so_far_tx_top.map(item => {
                return {
                    sender: item.sender_email,
                    recipient: item.receiver_email,
                    amount: item.amount,
                    time: item.created_ts
                }
            });

            var sortedTrans: ITransactionDailyDailyStats[] = transactionDaily.daily_stats.sort(this.sortByDateDesc);
            past7DaysTransactions = sortedTrans.map(item => {
                return {
                    date: new Date(item.date).toLocaleDateString(),
                    count: item.tx_count,
                    volume: item.tx_volume,
                    average: item.tx_count == 0 ? 0 : item.tx_volume / item.tx_count
                };
            })
        }

        var signupDaily = store.getState().statisticsData.signupDaily;

        var states = {
            walletSnapshot: [
                { name: 'Wallet Summary:', header: true },
                { name: 'Number of Wallets', value: numeral(currentStats.total_wallet_count).format('0,0') },
                { name: 'New Wallets Today', value: numeral(currentStats.today_added_wallet_count).format('0,0') },
                { name: 'Wallets with Balance > 0', value: numeral(balanceStats.greater_than_0_count).format('0,0') },
                { name: 'Wallets with Balance > 100', value: numeral(balanceStats.greater_than_100_count).format('0,0') },
                { name: 'Wallets with Zero Balance', value: numeral(balanceStats.equal_zero_count).format('0,0') },
                { name: 'Locked Wallets', value: 0 }
            ] as IWalletItem[],
            walletInfo: [
                { name: 'Wallets Added Past 7 Days', header: true, value: null }
            ] as IWalletItem[],
            affiliateSummary: signupDaily? [
                {name: 'Today’s Wallets and Affiliate Summary', header: true},
                {name: 'Flashcoin.io website', value: signupDaily.current_stats.today_so_far_safecash_count || 0},
                {name: 'BIN website', value: signupDaily.current_stats.today_so_far_bin_count || 0},
                {name: 'SEEN website', value: signupDaily.current_stats.today_so_far_seen_count || 0},
                {name: 'Cakecodes', value: signupDaily.current_stats.today_so_far_cakecodes_count || 0},
            ] : [
                {name: 'Today’s Wallets and Affiliate Summary', header: true}
            ] as IWalletItem[],
            todaySoFarTransactions: todaySoFarTransactions.sort(this.sortByTime),
            past7DaysTransactions: past7DaysTransactions,
            lastHour: {
                count: transactionDaily.current_stats.last_hour_tx_count,
                volume: transactionDaily.current_stats.last_hour_tx_volume,
                average: transactionDaily.current_stats.last_hour_tx_count == 0 ? 0 :
                    transactionDaily.current_stats.last_hour_tx_volume / transactionDaily.current_stats.last_hour_tx_count
            } as TransactionDailySummaryStats,
            asOfToday: {
                count: transactionDaily.current_stats.today_so_far_tx_count,
                volume: transactionDaily.current_stats.today_so_far_tx_volume,
                average: transactionDaily.current_stats.today_so_far_tx_count == 0 ? 0 :
                    transactionDaily.current_stats.today_so_far_tx_volume / transactionDaily.current_stats.today_so_far_tx_count
            } as TransactionDailySummaryStats
        };

        var sortedDailyStats: IWalletDailyStats[] = dailyStats.sort(this.sortByDateDesc);
        sortedDailyStats.forEach((item) => {
            states.walletInfo.push({ name: new Date(item.date).toLocaleDateString(), value: '' + item.wallet_add_count });
        });

        var newState = Object.assign({}, this.state, states);

        this.setState(newState);
    }

    sortByTime(tx1, tx2) {
        return (tx2.time != undefined && tx1.time != undefined) ? new Date(tx2.time).getTime() - new Date(tx1.time).getTime() : 0;
    }

    sortByDateDesc(left, right) {
        return (right.date != undefined && left.date != undefined) ? new Date(right.date).getTime() - new Date(left.date).getTime() : 0;
    }

    render() {
        return (
            <div id="page-wrap">
                <div className="col-sm-12 col-lg-12">
                    <div className="uk-grid uk-grid-divider uk-margin-bottom">
                        <div className="uk-width-medium-1-2" style={{minHeight: '100px'}}>
                            <WalletInfo items={this.state.walletSnapshot} />
                        </div>
                        <div className="uk-width-medium-1-2" style={{minHeight: '100px'}}>
                            <WalletInfo items={this.state.walletInfo} />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-12">
                    <div style={{minHeight: '100px'}}>
                        <WalletInfo items={this.state.affiliateSummary} />
                    </div>
                </div>
                <div className="form-group col-sm-12 col-lg-12">
                    <div className="button-refresh"><button onClick={this.onRefresh} className="uk-button"><i className="uk-icon-refresh"></i></button></div>
                    <TransactionList items={this.state.todaySoFarTransactions} lastHour={this.state.lastHour}
                        asOfToday={this.state.asOfToday} title={'TRANSACTIONS'} />
                    <TransactionSummaryList items={this.state.past7DaysTransactions} title={'TRANSACTIONS PAST 7 DAYS'} />
                </div>
            </div>
        );
    }
}