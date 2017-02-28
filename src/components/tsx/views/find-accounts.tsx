import { bind, bus } from '../refs';

import { tsx, registerReact } from "../../../core/tsx-react";
import * as React from "react";
import store from '../../../model/store';
import adminActions from '../../../model/admin/admin-actions';
import { IAccount } from '../../../model/types';
import { hashHistory } from "react-router";

export default class FindAccounts extends React.Component<any, any> {
    private removeStoreListener: () => void;
    private pageOpts = store.getState().adminData.findAccountData.paging;

    state = { accounts: [] as IAccount[], searchText: store.getState().adminData.findAccountData.searchText };

    componentDidMount() {
        this.state.searchText = store.getState().adminData.findAccountData.searchText;
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));

        if (store.getState().adminData.findAccountData.accounts.length == 0) {
            this.doLoadData();
        } else {
            this.displayData();
        }
    }

    componentWillUnmount() {
        this.removeStoreListener();
    }

    private displayData() {
        var state = store.getState();
        var adminData = state.adminData;
        this.pageOpts = adminData.findAccountData.paging;
        var accounts = adminData.findAccountData.accounts;
        var newState = Object.assign({}, this.state, { accounts });
        this.setState(newState);
    }

    private doLoadData() {
        var searchText = (this.state.searchText || '').toLowerCase();
        store.dispatch(adminActions.findAccounts({
            term: searchText, startDate: null, endDate: null,
            pagingOpts: this.pageOpts
        }));
    }

    @bind
    onPrevPage(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (this.pageOpts.pageIndex > 0) {
            this.pageOpts.pageIndex--;

            this.doLoadData();
        }
    }

    @bind
    onNextPage(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var count = Math.ceil(this.pageOpts.total / this.pageOpts.pageSize);
        if (this.pageOpts.pageIndex < count - 1) {
            this.pageOpts.pageIndex++;

            this.doLoadData();
        }
    }

    onApplicationStateChanged() {
        this.displayData();
    }

    @bind
    onSearchButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.pageOpts = { pageIndex: 0, pageSize: 20, total: 0 };
        this.state.searchText = $('.key-word').val();
        console.log('searchText', this.state.searchText);
        var searchText = (this.state.searchText || '');
        store.dispatch(adminActions.findAccounts({
            term: searchText, startDate: null, endDate: null,
            pagingOpts: this.pageOpts
        }));
    }

    @bind
    handleChange(event) {
        this.setState({ searchText: event.target.value });
    }

    render() {
        let searchText = this.state.searchText;
        return (
            <div id="page-wrap">
                <div className="col-sm-12 col-lg-12 find-account">
                    <div className="uk-panel uk-panel-box uk-panel-header uk-overflow-container">
                        <nav className="uk-navbar">
                            <div className="uk-navbar-content">
                                <span className="uk-text-bold">Find Accounts</span>
                            </div>
                            <div className="uk-navbar-content uk-navbar-flip  uk-hidden-small">
                                <form className="uk-form uk-margin-remove uk-display-inline-block">
                                    <input type="text" placeholder="Search" onChange={this.handleChange} value={searchText} className="key-word" />
                                    <button className="uk-button uk-button-primary uk-margin-left" onClick={this.onSearchButtonClick}>Submit</button>
                                </form>
                            </div>
                        </nav>
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
                                    <th>Date Opened</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Balance</th>
                                    <th>History</th>
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
                                                <td className="uk-width-1-5" title={(new Date(user.createdTime)).toLocaleString('en')}>{(new Date(user.createdTime)).toLocaleDateString('en')}</td>
                                                <td className="uk-width-1-5 uk-text-truncate">{user.name}</td>
                                                <td className="uk-width-1-5 uk-text-truncate">{user.email}</td>
                                                <td>{(user.balance != null) ? Math.floor(user.balance / Math.pow(10, 7)).toLocaleString('en') : ''}</td>
                                                <td><TxnLinkButton user={user} /></td>
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