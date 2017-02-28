import { bus, bind } from '../refs';
import { tsx, registerReact } from "../../../core/tsx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IAccount, ITransaction, IDateRange, DirectionType } from '../../../model/types';

const $txnDetail = bus.cat('txn-detail');

export default class TransactionDetails extends React.Component<any, any> {
    private modal: UIkit.ModalElement;
    private show: boolean;
    state = { txn: {} as ITransaction };

    componentDidMount() {
        $txnDetail.on('update-transaction', this.showDialog);
    }

    componentDidUpdate() {
        if (this.show) {
            var el = this.mydiv;
            this.modal = UIkit.modal(jQuery(el));
            this.modal.show();
            this.show = false;
        }
    }

    @bind
    showDialog(txn: ITransaction) {
        this.setState({ txn: txn });
        this.show = true;
    }

    hideDialog() {
        this.show = false;
        if (this.modal) this.modal.hide();
    }

    render() {
        var txn: ITransaction = this.state.txn;
        var clz = (txn.direction == DirectionType.Incomming) ? "uk-text-success" : "uk-text-danger";
        var sign = (txn.direction == DirectionType.Incomming) ? "+" : "-";
        return (
            <div className="uk-modal custom-table-modal" ref={(mydiv) => { this.mydiv = mydiv; } }>
                <div className="uk-modal-dialog">
                    <button type="button" className="uk-modal-close uk-close"></button>
                    <div className="uk-modal-header">
                        <h2>Transaction Detail</h2>
                    </div>
                    <div className="uk-modal-content">
                        <table className="uk-table">
                            <tbody>
                                <tr>
                                    <td className="uk-text-bold">Name</td>
                                    <td>{txn.name ? txn.name : 'anonymous(' + txn.publicAddress + ')'}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Email</td>
                                    <td>{txn.email}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Note</td>
                                    <td>{txn.note}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Amount</td>
                                    <td className={clz}>{sign}{txn.amount}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Date</td>
                                    <td>{txn.date}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Transaction ID</td>
                                    <td><p className="_value_attr form-control">{txn.txid}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="uk-modal-footer uk-text-right">
                        <button type="button" className="uk-button uk-modal-close">Close</button>
                    </div>
                </div>
            </div>
        )
    }
}