import {bind, bus } from '../refs';

import { tsx, registerReact } from "../../../core/tsx-react";
import * as React from "react";
import store from '../../../model/store';
import statisticsActions from '../../../model/statistics/stats-actions';
import { ISignupDailyDaily, ISignupPeriodStats, IDateRange, STATISTICS } from '../../../model/types';
import moment from 'moment';
import { hashHistory } from "react-router";

export default class SignupPage extends React.Component<any, any> {
    removeStoreListener;
    state = {
        periodStats: {} as ISignupPeriodStats,
        dailyStats: [] as ISignupDailyDaily[],
        range: { from: '', to: '' } as IDateRange
    }

    componentDidMount() {
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));

        var startDateElem = $('.start-date');
        $(startDateElem).datepicker({ format: 'dd M yyyy' });

        var endDateElem = $('.end-date');
        $(endDateElem).datepicker({ format: 'dd M yyyy' });

        var startDate = moment().subtract(7, 'days').startOf('day');
        this.state.range.from = startDate.format('YYYY-MM-DD');
        var endDate = moment().endOf('day');
        this.state.range.to = endDate.format('YYYY-MM-DD');

        store.dispatch(statisticsActions.getSignupDaily({ startDate: startDate, endDate: endDate }));
    }

    componentWillUnmount() {
        this.removeStoreListener();
        // $(this.base.querySelector('.start-date')).datepicker('hide');
        $('.start-date').datepicker('hide');
        $('.end-date').datepicker('hide');
        // $(this.base.querySelector('.end-date')).datepicker('hide');
    }

    onApplicationStateChanged() {
        if (store.getState().lastAction.type === STATISTICS.SIGNUP_DAILY_SUCCESS) {
            this.displayData();
        }
    }

    displayData() {
        var signupDaily = store.getState().statisticsData.signupDaily;
        var states = {
            periodStats: signupDaily.period_stats,
            dailyStats: signupDaily.daily_stats
        }
        var newState = Object.assign({}, this.state, states);

        this.setState(newState);
    }

    @bind
    onShowButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var startDateValue = $('.start-date').val();
        var startDate = startDateValue.length > 0 ? moment(new Date(startDateValue)).startOf('day') : null;
        var endDateValue = $('.end-date').val();
        var endDate = endDateValue.length > 0 ? moment(new Date(endDateValue)).endOf('day') : null;

        console.log("search for", startDate, endDate);
        this.state.range.from = startDate ? startDate.format('YYYY-MM-DD') : '';
        this.state.range.to = endDate ? endDate.format('YYYY-MM-DD') : '';

        // this.doLoadData(startDate, endDate);
        store.dispatch(statisticsActions.getSignupDaily({ startDate: startDate, endDate: endDate }));
    }

    render() {
        var periodStats = this.state.periodStats;
        var dailyStats = this.state.dailyStats.sort(this.sortByDateDesc);
        var dateRange = this.state.range;
        console.log("daily_stats", dailyStats);
        return (
            <div id="page-wrap">
                <div className="form-group col-sm-12 col-lg-12">
                    <div className="uk-panel uk-panel-box">
                        <form className="uk-form uk-margin-remove uk-display-inline-block">
                            <fieldset>
                                <div className="uk-form-icon">
                                    <i className="uk-icon-calendar"></i>
                                    <input type="text" className="start-date" placeholder="" readOnly />
                                </div>
                                <label>To</label>
                                <div className="uk-form-icon">
                                    <i className="uk-icon-calendar"></i>
                                    <input type="text" className="end-date" placeholder="" readOnly />
                                </div>
                                <button className="uk-button uk-button-primary" onClick={this.onShowButtonClick}>Show</button>
                            </fieldset>
                        </form>
                        <div className="uk-panel-title"><p>New Account Sign-ups from {dateRange.from} to {dateRange.to}</p></div>
                        <table className="uk-table uk-table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Sign-ups via BIN</th>
                                    <th>Sign-ups via Flashcoin</th>
                                    <th>Sign-ups via Seen.Life</th>
                                    <th>Sign-ups via Cakecodes</th>
                                    <th>Total Sign-ups</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Sign-ups in the Date Range</td>
                                    <td>{periodStats.signup_bin_count}</td>
                                    <td>{periodStats.signup_safecash_count}</td>
                                    <td>{periodStats.signup_seen_count}</td>
                                    <td>{periodStats.signup_cakecodes_count}</td>
                                    <td>{periodStats.signup_bin_count + periodStats.signup_safecash_count
                                        + periodStats.signup_seen_count + periodStats.signup_cakecodes_count}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="uk-panel uk-panel-box">
                        <table className="uk-table uk-table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Sign-ups via BIN</th>
                                    <th>Sign-ups via Flashcoin</th>
                                    <th>Sign-ups via Seen.Life</th>
                                    <th>Sign-ups via Cakecodes</th>
                                    <th>Total Sign-ups</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dailyStats.map((item) => {
                                        return (
                                            <tr key={item.date}>
                                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                                <td>{item.signup_bin_count}</td>
                                                <td>{item.signup_safecash_count}</td>
                                                <td>{item.signup_seen_count}</td>
                                                <td>{item.signup_cakecodes_count}</td>
                                                <td>{item.signup_total_count}</td>
                                                <td><TxnLinkButton date={item.date} /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    sortByDateDesc(left, right) {
        return (right.date != undefined && left.date != undefined) ? new Date(right.date).getTime() - new Date(left.date).getTime() : 0;
    }
}

class TxnLinkButton extends React.Component<any, any> {
    @bind
    handleClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        let date = this.props.date;
        let query = 'date=' + encodeURIComponent(date);
        hashHistory.push('signup-accounts' + '?' + query);

        /*var $views = bus.cat('views');
        $views.emit('change', 'signup-accounts').then(() => {
            var date = this.props.date;
            var $signupAccounts = bus.cat('signup-accounts');
            $signupAccounts.emit('load-accounts', date);
        });*/
    }

    render() {
        return (
            <a onClick={this.handleClick}>Details</a>
        );
    }
}