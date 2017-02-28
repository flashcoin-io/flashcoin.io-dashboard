import { bus, bind } from '../refs';
import { tsx, registerReact } from "../../../core/tsx-react";
import * as React from "react";
import store from '../../../model/store';
import adminActions from '../../../model/admin/admin-actions';
import { IAccount, ITransaction, IDateRange, DirectionType, IPagingOptions, COMMONS } from '../../../model/types';

import TransactionDetails from './transaction-details';

const $userTxns = bus.cat('user-txns');
const $txnDetail = bus.cat('txn-detail');

export default class UserTxns extends React.Component<any, any> {
    private removeStoreListener;
    state = { user: null as IAccount, txns: [] as ITransaction[], pagingOpts: {}, range: {} as IDateRange, wallet: {} };
    private pageOpts = store.getState().adminData.userDetails.pagingOpts;
    private currentTransaction = {} as ITransaction;

    componentDidMount() {
        this.removeStoreListener = store.subscribe(this.onApplicationStateChanged.bind(this));
        // $userTxns.on('load-history', this.onLoadHistory);
        let query = this.props.location.query || {};
        console.log("query", query);
        let user = { createdTime: query.createdTime, name: query.name, email: query.email };
        console.log("user", user);
        this.onLoadHistory(user);
    }

    componentWillUnmount() {
        $userTxns.off('load-history', this.onLoadHistory);
        this.removeStoreListener();
    }

    onApplicationStateChanged() {
        //userDetails: user, txns, range, pageOpts
        if (store.getState().lastAction.type === COMMONS.TOGGLE_LOADING) return;

        var adminData = store.getState().adminData;
        var userDetails = adminData.userDetails;
        this.pageOpts = userDetails.pagingOpts;
        console.log("new pageOpts", this.pageOpts);
        console.log("user", userDetails.user);
        console.log("wallet", adminData.userWallet);
        var newState = Object.assign({}, this.state, {
            user: userDetails.user,
            txns: userDetails.txns,
            pagingOpts: userDetails.pagingOpts,
            range: userDetails.range,
            wallet: adminData.userWallet
        });

        this.setState(newState);
    }

    @bind
    onLoadHistory(user: IAccount) {
        this.pageOpts = Object.assign(this.pageOpts, { pageIndex: 0 });
        console.log('user', user);
        var newState = Object.assign({}, this.state, { user: user });
        console.log('newState', newState);
        this.setState(newState);
        this.doLoadData(user);
    }

    @bind
    onGoBack(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var views = bus.cat('views');
        views.emit('back');
    }

    private doLoadData(user: IAccount) {
        var opts = {
            account: user,
            from: user.createdTime,
            to: (new Date()).toISOString(),
            paging: this.pageOpts
        };
        store.dispatch(adminActions.getTransactionsByUser(opts));

        console.log('user', user);
        store.dispatch(adminActions.getWalletsByEmail(user.email));
    }

    @bind
    onPrevPage(e: UIEvent) {
        e.stopPropagation();
        e.preventDefault();

        if (this.pageOpts.pageIndex > 0) {
            this.pageOpts.pageIndex--;

            this.doLoadData(this.state.user);
        }
    }

    @bind
    onNextPage(e: UIEvent) {
        e.stopPropagation();
        e.preventDefault();

        var count = Math.ceil(this.pageOpts.total / this.pageOpts.pageSize);
        if (this.pageOpts.pageIndex < count - 1) {
            this.pageOpts.pageIndex++;

            this.doLoadData(this.state.user);
        }
    }

    @bind
    onDetailClick(transaction: ITransaction) {
        $txnDetail.emit('update-transaction', transaction);
    }

    render() {
        let user: IAccount = this.state.user;
        let txns = this.state.txns;
        let pagingOpts = this.state.pagingOpts;
        let wallet: any = this.state.wallet;
        let range: IDateRange = this.state.range;

        if (!user) return <div>Loading...</div>;

        return (

            <div id="page-wrap">
                <div className="col-sm-12 col-lg-12">
                    <div className="uk-panel uk-panel-box uk-overflow-container">
                        <div className="uk-panel-title">
                            <p>Wallet Information of {user.name}({user.email})</p>
                        </div>
                        <table className="uk-table">
                            <tbody>
                                <tr>
                                    <td className="uk-text-bold">Wallet ID</td>
                                    <td>{wallet.id}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Wallet Address</td>
                                    <td>{wallet.address}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Wallet Balance</td>
                                    <td>{wallet.balance}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="uk-panel uk-panel-box">

                        <div className="uk-panel-title">
                            <p>Transaction History - total: {pagingOpts.total}</p>
                        </div>

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
                            <caption>Date range from <span className="uk-text-bold">{new Date(range.from).toLocaleDateString()}</span> to <span className="uk-text-bold">{new Date(range.to).toLocaleDateString()}</span></caption>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Note</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.txns.map((item) => {
                                        var amount = item.amount.toLocaleString('en');
                                        var clz = (item.direction == DirectionType.Incomming) ? "uk-text-success" : "uk-text-danger";
                                        var sign = (item.direction == DirectionType.Incomming) ? "+" : "-";

                                        return (
                                            <tr key={item.txid}>
                                                <td>{item.name ? item.name : 'anonymous(' + item.publicAddress + ')'}</td>
                                                <td>{item.email}</td>
                                                <td>{item.note}</td>
                                                <td className={clz}>{sign}{amount}</td>
                                                <td title={new Date(item.date).toLocaleString('en')}>{new Date(item.date).toLocaleDateString('en')}</td>
                                                <td><TxnDetailButton transaction={item} onClick={this.onDetailClick} /></td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>

                        <TransactionDetails />

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