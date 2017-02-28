import { bind, bus } from '../refs';

import { tsx, registerReact } from "../../../core/tsx-react";
import * as React from "react";
import store from '../../../model/store';
import { ADMIN } from '../../../model/types';
import adminActions from '../../../model/admin/admin-actions';
import { IAccount } from '../../../model/types';
import { hashHistory } from "react-router";

export default class UnsubscribeEmail extends React.Component<any, any> {
    private removeStoreListener: () => void;
    private pageOpts = store.getState().adminData.unsubscribeEmailData.paging;

    state = {
        emails: [] as IAccount[],
        searchText: store.getState().adminData.unsubscribeEmailData.searchText,
        emailsList: store.getState().adminData.unsubscribeEmailData.emailsList
    };

    componentDidMount() {
        this.state.searchText = store.getState().adminData.unsubscribeEmailData.searchText;
        this.state.emailsList = store.getState().adminData.unsubscribeEmailData.emailsList;
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));

        if (store.getState().adminData.unsubscribeEmailData.emails.length == 0) {
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
        this.pageOpts = adminData.unsubscribeEmailData.paging;
        var emails = adminData.unsubscribeEmailData.emails;
        var newState = Object.assign({}, this.state, { emails });
        this.setState(newState);
    }

    private doLoadData() {
        var searchText = (this.state.searchText || '').toLowerCase();
        store.dispatch(adminActions.findUnsubscribeEmails({
            term: searchText,
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
        if (store.getState().lastAction.type == ADMIN.UNSUBSCRIBE_EMAIL_SUCCESS) {
            $('.unsubscribed-emails-textarea').val("Has insert success " + store.getState().lastAction.data.results.length + " email(s)");
            this.doLoadData();
        }
        this.displayData();
    }

    @bind
    onSubmitButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.state.emailsList = $('.unsubscribed-emails-textarea').val();
        let emailsList = this.state.emailsList.trim();
        emailsList = (emailsList.replace(/ /gi, '') || '');
        console.log('unsubscribed-emailsList', this.state.emailsList);
        store.dispatch(adminActions.unsubscribeEmail(emailsList));
    }

    @bind
    onSearchButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.pageOpts = store.getState().adminData.unsubscribeEmailData.paging;
        this.state.searchText = $('.key-word').val();
        console.log('searchText', this.state.searchText);
        let searchText = (this.state.searchText || '');
        store.dispatch(adminActions.findUnsubscribeEmails({
            term: searchText,
            pagingOpts: this.pageOpts
        }));
    }

    @bind
    handleChange(event) {
        this.setState({ searchText: event.target.value });
    }

    render() {
        let searchText = this.state.searchText;
        let emailsList = this.state.emailsList;
        return (
            <div id="page-wrap">
                <div className="col-sm-12 col-lg-12 find-account">
                    <textarea className="col-sm-12 col-lg-12 unsubscribed-emails-textarea" rows="5" cols="50" name="comment"></textarea>
                    <button className="uk-button uk-button-primary unsubscribed-sumit-bt" onClick={this.onSubmitButtonClick}>Submit</button>
                    <div className="uk-panel uk-panel-box uk-panel-header uk-overflow-container">
                        <form className="uk-form uk-margin-remove uk-display-inline-block" id="search_form">
                            <input type="text" placeholder="Unsubscribed email" onChange={this.handleChange} value={searchText} className="key-word" />
                            <button className="uk-button uk-button-primary uk-margin-left" onClick={this.onSearchButtonClick}>Search</button>
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
                                    <th>Date</th>
                                    <th>Email</th>
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
                                    this.state.emails.map((user) => {
                                        return (
                                            <tr key={user.email}>
                                                <td className="uk-width-1-5" title={(new Date(user.createdTime)).toLocaleString('en')}>{(new Date(user.createdTime)).toLocaleDateString('en')}</td>
                                                <td className="uk-width-1-5 uk-text-truncate">{user.email}</td>
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
