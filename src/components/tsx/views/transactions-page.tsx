import {bind, bus } from '../refs';

import {tsx, registerReact} from "../../../core/tsx-react";
import * as React from "react";
import store from '../../../model/store';
import adminActions from '../../../model/admin/admin-actions';
import { IAccount, ITransaction, IFullTransaction, IDateRange, DirectionType, ITransactionsData, IPagingOptions } from '../../../model/types';
import moment from 'moment';

import TransactionDetails from './transaction-details';
import FullTransactionDetails from './full-transaction-details';

const $txnDetail = bus.cat('txn-detail');

export default class TransactionsPage extends React.Component<any, any> {
    private removeStoreListener;

    pageOpts: IPagingOptions = { pageIndex: 0, pageSize: 10, total: 0};
    filterBy: 'all';
    transTypeOptionsMap = {
        'all': null,
        'like': 'like',
        'fountain': 'fountain'
    };

    state = { user: null as IAccount, txns: [] as IFullTransaction[], range: {from: '', to: ''} as IDateRange};

    componentDidMount() {
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));
        this.doLoadDataByToday();
        var startDate = $('.start-date');
        $(startDate).datepicker({format: 'dd M yyyy'});

        var endDate = $('.end-date');
        $(endDate).datepicker({format: 'dd M yyyy'});
    }

    onApplicationStateChanged() {
        //userDetails: user, txns, range, pageOpts
        var adminData = store.getState().adminData;
        var transactionsData: ITransactionsData = adminData.transactionsData;
        this.pageOpts = transactionsData.pagingOpts;
        console.log("new pageOpts", this.pageOpts);
        var newState = Object.assign({}, this.state, transactionsData);

        this.setState(newState);
    }

    componentWillUnmount() {
        this.removeStoreListener();
    }

    @bind
    onShowButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.pageOpts = {pageIndex: 0, pageSize: 10, total: 0};
        this.doLoadDataWithinDates();
    }

    private doLoadDataWithinDates() {
        var startDateValue = $('.start-date').val();
        var startDate = startDateValue.length > 0 ? new Date(startDateValue): '';
        var endDateValue = $('.end-date').val();
        var endDate = endDateValue.length > 0 ? new Date(endDateValue): '';
        console.log("search for", startDate, endDate, this.pageOpts);

        var optFilterByElem = $('.filter-by-option');
        console.log('$(optFilterByElem).val()', $(optFilterByElem).val());
        this.filterBy = $(optFilterByElem).val();
        console.log('this.filterBy', this.filterBy);
        
        this.doLoadDataByDateRange(startDate, endDate);
    }

    doLoadDataByDateRange(startDate, endDate) {
        var opts = {
            from: startDate? moment(startDate).startOf('day').format() : null,
            to: endDate? moment(endDate).endOf('day').format(): null,
            paging: this.pageOpts,
            transactionType: this.transTypeOptionsMap[this.filterBy]
        };
        store.dispatch(adminActions.getTransactions(opts));
    }

    doLoadDataByToday() {
        var opts = {
            from: moment().startOf('day').format(),
            to: moment().format(),
            paging: this.pageOpts,
            transactionType: null
        };
        store.dispatch(adminActions.getTransactions(opts));
    }

    @bind
    onPrevPage(e: UIEvent) {
        e.stopPropagation();
        e.preventDefault();

        if (this.pageOpts.pageIndex > 0) {
            this.pageOpts.pageIndex--;

            this.doLoadDataByDateRange(this.state.range.from, this.state.range.to);
        }
    }

    @bind
    onNextPage(e: UIEvent) {
        e.stopPropagation();
        e.preventDefault();

        var count = Math.ceil(this.pageOpts.total / this.pageOpts.pageSize);
        if (this.pageOpts.pageIndex < count - 1) {
            this.pageOpts.pageIndex++;

            this.doLoadDataByDateRange(this.state.range.from, this.state.range.to);
        }
    }

    @bind
    onDetailClick(transaction: IFullTransaction) {
        $txnDetail.emit('update-transaction', transaction);
    }

    render() {
        var range = this.state.range || {from: '', to: ''};
        var dateFrom = range.from ? new Date(range.from).toLocaleDateString() : '';
        var dateTo = range.to ? new Date(range.to).toLocaleDateString(): '';
        return (
            <div id="page-wrap">
                <div className="col-sm-12 col-lg-12">
                    <div className="uk-panel uk-panel-box uk-overflow-container">
                        <form className="uk-form uk-margin-remove uk-display-inline-block">
                            <fieldset>
                                <div className="uk-form-icon">
                                    <i className="uk-icon-calendar"></i>
                                    <input type="text" readOnly className="start-date" />
                                </div>
                                <label>To</label>
                                <div className="uk-form-icon">
                                    <i className="uk-icon-calendar"></i>
                                    <input type="text" readOnly className="end-date" />
                                </div>
                                <label>Filter by</label>
                                <select value={this.filterBy} className="filter-by-option">
                                    <option value="all">All</option>
                                    <option value="like">Like</option>
                                    <option value="fountain">Foutain</option>
                                </select>
                                <button className="uk-button uk-button-primary" onClick={this.onShowButtonClick}>Show</button>
                            </fieldset>
                        </form>
                        {(() => {
                                if (dateFrom && dateTo) {
                                    return <h3 className="uk-note-title">All Transactions from {dateFrom} to {dateTo} - Total: {this.pageOpts.total}</h3>
                                } else if (dateFrom) {
                                    return <h3 className="uk-note-title">All Transactions from {dateFrom} - Total: {this.pageOpts.total}</h3>
                                } else if (dateTo) {
                                    return <h3 className="uk-note-title">All Transactions up to {dateTo} - Total: {this.pageOpts.total}</h3>
                                } else {
                                    return <h3 className="uk-note-title">All Transactions - Total: {this.pageOpts.total}</h3>
                                }
                            })()
                        }

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
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Note</th>
                                    <th>Amount</th>
                                    <th>Time</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.txns.map((item) => {
                                        var amount = item.amount.toLocaleString('en');

                                        return (
                                            <tr key={item.txid}>
                                                <td>{item.from ? item.from: item.senderPublicAddress}</td>
                                                <td>{item.to}</td>
                                                <td>{item.note}</td>
                                                <td>{amount}</td>
                                                <td>{new Date(item.date).toLocaleString('en')}</td>
                                                <td><TxnDetailButton transaction={item} onClick={this.onDetailClick} /></td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>

                        <FullTransactionDetails />
                    </div>
                </div>
            </div>
        )
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