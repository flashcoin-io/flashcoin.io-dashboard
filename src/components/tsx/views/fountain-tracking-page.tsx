import {bind, bus } from '../refs';

import {tsx} from "../../../core/tsx-react";
import * as React from "react";
import { IFountainTracking, ADMIN, IPagingOptions, IDateRange, STATISTICS, IFountainTrackingDaily } from '../../../model/types';
import moment from 'moment';
import store from '../../../model/store';
import adminActions from '../../../model/admin/admin-actions';
import statisticsActions from '../../../model/statistics/stats-actions';

export default class FountainTrackingPage extends React.Component<any, any> {
    state = {
        trackings: [] as IFountainTracking[], range: { from: '', to: '' } as IDateRange,
        statsRange: { from: '', to: '' } as IDateRange, trackingsDaily: [] as IFountainTrackingDaily[]
    };
    pageOpts: IPagingOptions = { pageIndex: 0, pageSize: 10, total: 0 };
    removeStoreListener;

    componentDidMount() {
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));
        this.doLoadDataByToday();
    }

    componentWillUnmount() {
        this.removeStoreListener();
    }

    doLoadDataByToday() {
        var opts = {
            from: moment().startOf('day').format(),
            to: moment().format(),
            paging: this.pageOpts
        };
        store.dispatch(adminActions.getFountainTrackings(opts));

        var startDate = moment().subtract(7, 'days').startOf('day');
        this.state.statsRange.from = startDate.format('YYYY-MM-DD');
        var endDate = moment().endOf('day');
        this.state.statsRange.to = endDate.format('YYYY-MM-DD');
        store.dispatch(statisticsActions.getFountainTrackingDaily({ startDate: startDate, endDate: endDate }));
    }

    doLoadDataByDateRange(startDate, endDate) {
        var opts = {
            from: startDate ? moment(startDate).startOf('day').format() : null,
            to: endDate ? moment(endDate).endOf('day').format() : null,
            paging: this.pageOpts
        };
        store.dispatch(adminActions.getFountainTrackings(opts));
    }

    onApplicationStateChanged() {
        console.log('store.getState().lastAction.type', store.getState().lastAction.type);
        if (store.getState().lastAction.type !== ADMIN.GET_FTN_TRACKINGS_SUCCESS &&
            store.getState().lastAction.type !== STATISTICS.FTN_TRACKING_DAILY_SUCCESS) {
            return;
        }
        if (store.getState().lastAction.type === ADMIN.GET_FTN_TRACKINGS_SUCCESS) {
            var adminData = store.getState().adminData;
            let listTrackingsData = adminData.listTrackingsData;
            this.pageOpts = listTrackingsData.paging;
            var newState = Object.assign({}, this.state, {
                trackings: listTrackingsData.trackings,
                range: listTrackingsData.range
            });
            this.setState(newState);
        }

        if (store.getState().lastAction.type === STATISTICS.FTN_TRACKING_DAILY_SUCCESS) {
            console.log('vaoday');
            let statsData = store.getState().statisticsData;
            let trackingsDaily = statsData.ftnTrackingDaily;
            var newState = Object.assign({}, this.state, {
                trackingsDaily: trackingsDaily
            });
            this.setState(newState);
        }
    }

    @bind
    onPrevPage(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (this.pageOpts.pageIndex > 0) {
            this.pageOpts.pageIndex--;

            this.doLoadDataByDateRange(this.state.range.from, this.state.range.to);
        }
    }

    @bind
    onNextPage(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var count = Math.ceil(this.pageOpts.total / this.pageOpts.pageSize);
        if (this.pageOpts.pageIndex < count - 1) {
            this.pageOpts.pageIndex++;

            this.doLoadDataByDateRange(this.state.range.from, this.state.range.to);
        }
    }

    render() {
        let trackingsDaily = this.state.trackingsDaily;
        let statsRange = this.state.statsRange;
        return (
            <div id="page-wrap">
                <div className="col-sm-12 col-lg-12">
                    <div className="uk-panel uk-panel-box uk-overflow-container">
                        <div className="uk-panel-title"><p>Ads Tracking from {statsRange.from + ' '}to {statsRange.to}</p></div>
                        <table className="uk-table uk-table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Skip Ads</th>
                                    <th>View Ads</th>
                                    <th>Got Reward</th>
                                    <th>Signup </th>
                                    <th>All </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    trackingsDaily.map(function (item) {
                                        return (
                                            <tr key={item.stats_date}>
                                                <td>{moment(item.stats_date).format('L')}</td>
                                                <td>{item.skip_ads_count}</td>
                                                <td>{item.view_ads_count}</td>
                                                <td>{item.got_reward_count}</td>
                                                <td>{item.signup_count}</td>
                                                <td>{item.total_count}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td>Total</td>
                                    <td>{trackingsDaily.map(item => item.skip_ads_count).reduce(function(previous, current) {return previous + current}, 0)}</td>
                                    <td>{trackingsDaily.map(item => item.view_ads_count).reduce(function(previous, current) {return previous + current}, 0)}</td>
                                    <td>{trackingsDaily.map(item => item.got_reward_count).reduce(function(previous, current) {return previous + current}, 0)}</td>
                                    <td>{trackingsDaily.map(item => item.signup_count).reduce(function(previous, current) {return previous + current}, 0)}</td>
                                    <td>{trackingsDaily.map(item => item.total_count).reduce(function(previous, current) {return previous + current}, 0)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="uk-panel-title"><p>Ads Tracking by today</p></div>

                        <ul className="uk-pagination">
                            <li className="uk-pagination-previous uk-width-1-3"><a href="#" onClick={this.onPrevPage}><i className="uk-icon-angle-double-left"></i> Previous</a></li>
                            {(() => {
                                if (this.pageOpts.total) {
                                    return <li className="uk-width-1-3 uk-text-center">Page {this.pageOpts.pageIndex + 1 + ' '}of {Math.ceil(this.pageOpts.total / this.pageOpts.pageSize)} </li>;
                                } else {
                                    return <li className="uk-width-1-3 uk-text-center">Page 0 </li>;
                                }
                            })()}
                            <li className="uk-width-1-3 uk-pagination-next"><a href="#" onClick={this.onNextPage}>Next <i className="uk-icon-angle-double-right"></i></a></li>
                        </ul>
                        <table className="uk-table uk-table-hover uk-table-striped">
                            <thead>
                                <tr>
                                    <th>Track ID</th>
                                    <th>Client IP</th>
                                    <th>Time</th>
                                    <th>Skip Ads</th>
                                    <th>View Ads</th>
                                    <th>Got Reward</th>
                                    <th>Signup</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.trackings.map((item) => {
                                        return (
                                            <tr key={item.track_id}>
                                                <td>{item.track_id}</td>
                                                <td>{item.client_ip}</td>
                                                <td>{moment(item.created_ts).format('L LTS')}</td>
                                                <td>{item.skip_ads}</td>
                                                <td>{item.view_ads}</td>
                                                <td>{item.got_reward}</td>
                                                <td>{item.signup}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}