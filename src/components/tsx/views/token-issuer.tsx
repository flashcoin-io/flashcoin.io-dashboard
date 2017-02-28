import {bus, bind} from '../refs';

import {tsx, registerReact} from "../../../core/tsx-react";
import * as React from "react";
import {ITransaction, IAccount, IDateRange} from '../../../model/types';
import {DirectionType, ADMIN} from '../../../model/types';
import store from '../../../model/store';
import adminActions from '../../../model/admin/admin-actions';
import TransactionDetails from './transaction-details';
import numeral from 'numeraljs';
import moment from 'moment';

const $txnDetail = bus.cat('txn-detail');

export default class TokenIssuer extends React.Component<any, any> {
    private removeStoreListener: () => void;
    state = {user: null as IAccount, txns: [] as ITransaction[], range: {from: '', to: ''} as IDateRange};
    private pageOpts = store.getState().adminData.userDetails.pagingOpts;

    componentDidMount() {
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));
        var startDate = $('.start-date');
        $(startDate).datepicker({format: 'dd M yyyy'});

        var endDate = $('.end-date');
        $(endDate).datepicker({format: 'dd M yyyy'});
    }

    componentWillUnmount(){
        this.removeStoreListener();
    }

    onApplicationStateChanged() {
        if (store.getState().lastAction.type != ADMIN.GET_USER_TXNS_SUCCESS) {
            return;
        }
        var data = store.getState().adminData.userDetails;
        this.pageOpts = data.pagingOpts;
        console.log("new pageOpts", this.pageOpts);
        var newState = Object.assign({}, this.state, data);

        this.setState(newState);
    }

    @bind
    onLoadHistory(){
        // var newState = Object.assign({}, this.state, {user: {email: 'firstcoin@flashcoin.io'}});
        // this.setState(newState);
        this.doLoadDataWithinDates();
    }

    private displayData() {
    }

    @bind
    onShowButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.pageOpts = {pageIndex: 0, pageSize: 20, total: 0};
        this.doLoadDataWithinDates();
    }

    @bind
    onShowAllButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.pageOpts = {pageIndex: 0, pageSize: 20, total: 0};
        this.doLoadData('', '');
    }

    private doLoadDataWithinDates() {
        var startDateValue = $('.start-date').val();
        var startDate = startDateValue.length > 0 ? new Date(startDateValue): '';
        var endDateValue = $('.end-date').val();
        var endDate = endDateValue.length > 0 ? new Date(endDateValue): '';
        console.log("search for", startDate, endDate, this.pageOpts);
        
        this.doLoadData(startDate, endDate);
    }

    private doLoadData(startDate, endDate) {
        var opts = {
            account: {email: 'firstcoin@flashcoin.io'},
            from: startDate? moment(startDate).startOf('day').format() : null,
            to: endDate? moment(endDate).endOf('day').format(): null,
            paging: this.pageOpts
        };
        store.dispatch(adminActions.getTransactionsByUser(opts));
    }

    @bind
    onPrevPage(e:UIEvent){
        e.preventDefault();
        e.stopPropagation();

        if(this.pageOpts.pageIndex > 0){
            this.pageOpts.pageIndex--;

            this.doLoadData(this.state.range.from, this.state.range.to);
        }
    }

    @bind
    onNextPage(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();

        var count = Math.ceil(this.pageOpts.total/this.pageOpts.pageSize);
        if(this.pageOpts.pageIndex < count - 1){
            this.pageOpts.pageIndex++;

            this.doLoadData(this.state.range.from, this.state.range.to);
        }
    }

    @bind
    onDetailClick(transaction: ITransaction) {
        $txnDetail.emit('update-transaction', transaction);
    }
    
    render() {
        var user = this.state.user;
        var txns = this.state.txns;
        var range = this.state.range;
        var dateFrom = range.from ? new Date(range.from).toLocaleDateString() : '_';
        var dateTo = range.to ? new Date(range.to).toLocaleDateString(): '_';
        
        return (
            <div className="token-issuer">
                <div className="col-sm-12 col-lg-12">
                    <div className="uk-panel uk-panel-box uk-panel-header uk-overflow-container">
                        <div className="uk-panel-title">Token Issuer's Transactions</div>
                        <form className="uk-form uk-margin-remove uk-display-inline-block">
                            <fieldset>
                                <div className="uk-form-icon">
                                    <i className="uk-icon-calendar"></i>
                                    <input type="text" className="start-date" readOnly />
                                </div>
                                <label>To</label>
                                <div className="uk-form-icon">
                                    <i className="uk-icon-calendar"></i>
                                    <input type="text" className="end-date" readOnly />
                                </div>
                                <button className="uk-button uk-button-primary" onClick={this.onShowButtonClick}>Show</button>
                                <button className="uk-button show-all-activity uk-button-warning" onClick={this.onShowAllButtonClick}>Show All Activity</button>
                            </fieldset>
                        </form>
                        <div className="list-tokens">
                            <div className="uk-panel-title">All Transactions</div>
                            <h3 className="uk-note-title uk-accordion-title">All Transactions from {dateFrom} to {dateFrom}</h3>

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

                            <div className="">
                                <table className="uk-table uk-table-hover uk-table-striped">
                                    <thead>
                                        <tr className="trans-head">
                                            <th className="activity_name  ">Name</th>
                                            <th className="activity_email  ">Email</th>
                                            <th className="activity_note">Transaction Note</th>
                                            <th className="activity_amount">Amount</th>
                                            <th className="activity_date">Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.txns.map((item) => {
                                                return (
                                                    <tr key={item.txid} className="trans-lists" data-type="2">
                                                        <td className="">{item.name}</td>
                                                        <td className=""><span>{item.email}</span></td>
                                                        <td className="">{item.note}</td>
                                                        <td ><span className="green-color">{numeral(item.amount).format('0,0')}</span></td>
                                                        <td>{new Date(item.date).toLocaleString('en')}</td>
                                                        <td><TxnDetailButton transaction={item} onClick={this.onDetailClick} /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>

                                <TransactionDetails />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class TxnDetailButton extends React.Component<any, any> {
    @bind
    onDetailClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var transaction = this.props.transaction;

        var onClick = this.props.onClick;
        onClick(transaction);
    }

    render() {
        return (
            <a onClick={this.onDetailClick}>Detail</a>
        );
    }
}