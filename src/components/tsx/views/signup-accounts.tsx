import {bus, bind } from '../refs';

import {tsx, registerReact} from "../../../core/tsx-react";
import * as React from "react";
import store from '../../../model/store';
import adminActions from '../../../model/admin/admin-actions';
import { IAccount, ITransaction, IDateRange, DirectionType, IPagingOptions } from '../../../model/types';
import moment from 'moment';
import {hashHistory} from "react-router";

const $signupAccounts = bus.cat('signup-accounts');
export default class SignupAccounts extends React.Component<any, any> {
    private removeStoreListener;
    pageOpts: IPagingOptions = store.getState().adminData.signupAccountData.paging;
    signupDate: string;
    filterBy = 'all';

    createdByOptionsMap = {
        'all': null,
        'flashcoin': 'SC_WEB_CLIENT',
        'bin': 'BIN',
        'seen': 'SEEN'
    };

    state = {
        accounts: [] as IAccount[],
    };

    componentDidMount() {
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));
        // $signupAccounts.on('load-accounts', this.onLoadHistory);
        let query = this.props.location.query;
        let date = query && query.date ? query.date : new Date();
        this.onLoadHistory(date);
        // this.displayData();
    }

    onApplicationStateChanged() {
        this.displayData();
    }

    componentWillUnmount() {
        $signupAccounts.off('load-accounts', this.onLoadHistory);
        this.removeStoreListener();
    }

    @bind
    onLoadHistory(date: string) {
        console.log('accounts for date: ', date);
        var dateStr = moment(date).format('YYYY-MM-DD');
        this.signupDate = dateStr;
        console.log('dateStr: ', dateStr);
        this.pageOpts = {pageIndex: 0, pageSize: 20, total: 0, orderBy: 'created_ts', asc: false};
        let createdVia = this.createdByOptionsMap[this.filterBy];
        var opts = {
            term: null,
            startDate: this.signupDate,
            endDate: this.signupDate,
            createdVia: createdVia,
            pagingOpts: this.pageOpts
        }
        store.dispatch(adminActions.signupAccounts(opts));
    }

    private displayData() {
        var state = store.getState();
        var adminData = state.adminData;
        this.signupDate = adminData.signupAccountData.range.from;
        this.pageOpts = adminData.signupAccountData.paging;
        var accounts = adminData.signupAccountData.accounts;
        var newState = Object.assign({}, this.state, { accounts });
        this.setState(newState);
    }

    @bind
    onRefreshButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        console.log('dateStr: ', this.signupDate);
        var optCreatedByElem = $('.order-by-option');
        console.log($(optCreatedByElem).val());
        var optOrderAscElem = $('.order-asc');

        this.pageOpts.orderBy = $(optCreatedByElem).val();
        this.pageOpts.asc = $(optOrderAscElem).val() == 'asc' ? true : false;

        var optFilterByElem = $('.filter-by-option');
        console.log('$(optFilterByElem).val()', $(optFilterByElem).val());
        this.filterBy = $(optFilterByElem).val() == 'all' ? null: $(optFilterByElem).val();
        console.log('this.filterBy', this.filterBy);
        var createdVia = this.createdByOptionsMap[this.filterBy];

        var opts = {
            startDate: this.signupDate,
            endDate: this.signupDate,
            pagingOpts: this.pageOpts,
            createdVia: createdVia
        }
        store.dispatch(adminActions.signupAccounts(opts));
    }

    @bind
    onPrevPage(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (this.pageOpts.pageIndex > 0) {
            this.pageOpts.pageIndex--;

            var createdVia = this.createdByOptionsMap[this.filterBy];
            store.dispatch(adminActions.signupAccounts({
                startDate: this.signupDate, endDate: this.signupDate,
                createdVia: createdVia,pagingOpts: this.pageOpts
            }));
        }
    }

    @bind
    onNextPage(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var count = Math.ceil(this.pageOpts.total / this.pageOpts.pageSize);
        if (this.pageOpts.pageIndex < count - 1) {
            this.pageOpts.pageIndex++;

            var createdVia = this.createdByOptionsMap[this.filterBy];
            store.dispatch(adminActions.signupAccounts({
                startDate: this.signupDate, endDate: this.signupDate,
                createdVia: createdVia, pagingOpts: this.pageOpts
            }));
        }
    }

    @bind
    onGoBack(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var views = bus.cat('views');
        views.emit('back');
    }

    render() {
        return (
            <div id="page-wrap">
                <div className="col-sm-12 col-lg-12">
                    <div className="uk-panel uk-panel-box uk-overflow-container">
                        <h3>Signup accounts at {new Date(this.signupDate).toLocaleDateString()} - Total {this.pageOpts.total}</h3>
                        <form className="uk-form uk-margin-remove uk-display-inline-block">
                            <fieldset>
                                <label>Order by</label>
                                <select defaultValue={this.pageOpts.orderBy} className="order-by-option m5rl">
                                    <option value="created_ts">Created Time</option>
                                    <option value="username">Username</option>
                                </select>
                                <select defaultValue={this.pageOpts.asc? 'asc': 'desc'} className="order-asc m5rl">
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                                <button className="uk-button uk-button-primary m5rl" onClick={this.onRefreshButtonClick}>Refresh</button>
                            </fieldset>
                            <fieldset>
                                <label>Created via</label>
                                <select defaultValue={this.filterBy} className="filter-by-option m5rl">
                                    <option value="all">All</option>
                                    <option value="flashcoin">Flashcoin.io</option>
                                    <option value="bin">BIN</option>
                                    <option value="seen">SEEN</option>
                                </select>
                            </fieldset>
                        </form>
                        <ul className="uk-pagination">
                            <li className="uk-pagination-previous uk-width-1-3"><a href="#" onClick={this.onPrevPage}><i className="uk-icon-angle-double-left"></i> Previous</a></li>
                            {(() => {
                                if (this.pageOpts.total) {
                                    return <li className="uk-width-1-3 uk-text-center">Page {this.pageOpts.pageIndex + 1} of {Math.ceil(this.pageOpts.total / this.pageOpts.pageSize)} </li>;
                                } else {
                                    return <li className="uk-width-1-3 uk-text-center">Page 0 </li>;
                                }
                            })()}
                            <li className="uk-width-1-3 uk-pagination-next"><a href="#" onClick={this.onNextPage}>Next <i className="uk-icon-angle-double-right"></i></a></li>
                        </ul>
                        <table className="uk-table uk-table-hover uk-table-striped">
                            <thead>
                                <tr>
                                    <th>Time Opened</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Balance</th>
                                    <th>Created via</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <tbody>
                                {
                                    this.state.accounts.map((user) => {
                                        return (
                                            <tr key={user.email}>
                                                <td className="uk-text-truncate" title={(new Date(user.createdTime)).toLocaleString('en')}>{(new Date(user.createdTime)).toLocaleString('en')}</td>
                                                <td className="uk-text-truncate">{user.name}</td>
                                                <td className="uk-text-truncate">{user.email}</td>
                                                <td>{(user.balance != null) ? Math.floor(user.balance / Math.pow(10, 7)).toLocaleString('en') : ''}</td>
                                                <td>{user.createdBy}</td>
                                                <td><TxnLinkButton user={user}/></td>
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

class TxnLinkButton extends React.Component<any, any> {
    @bind
    handleClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        let user: IAccount = this.props.user;
        let query = 'createdTime=' + encodeURIComponent(user.createdTime);
        if (user.email) query = query + '&email=' + encodeURIComponent(user.email);
        if (user.name) query = query + '&name=' + encodeURIComponent(user.name);
        hashHistory.push('user-txns' + '?' + query);

        /*var $views = bus.cat('views');
        $views.emit('change', 'user-txns').then(() => {
            var user = this.props.user;
            var $txnDetail = bus.cat('user-txns');
            $txnDetail.emit('load-history', user);
        });*/
    }

    render() {
        return (
            <a onClick={this.handleClick}>Details</a>
        );
    }
}