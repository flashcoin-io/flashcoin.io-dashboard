import { bus, bind } from '../refs';
import { tsx, registerReact } from "../../../core/tsx-react";
import * as React from "react";
import { IAccount, ITransaction, IFullTransaction, IDateRange, DirectionType } from '../../../model/types';
import moment from 'moment';

const $txnDetail = bus.cat('txn-detail');

export default class FullTransactionDetails extends React.Component<any, any> {
    private modal: UIkit.ModalElement;
    private show: boolean;
    state = { txn: {} as IFullTransaction };

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
    showDialog(txn: IFullTransaction) {
        this.setState({ txn: txn });
        this.show = true;
    }

    hideDialog() {
        this.show = false;
        if (this.modal) this.modal.hide();
    }

    render() {
        var txn: IFullTransaction = this.state.txn;
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
                                    <td className="uk-text-bold">From</td>
                                    <td>{txn.from ? txn.from : txn.senderPublicAddress}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">To</td>
                                    <td>{txn.to ? txn.to : txn.receiverPublicAddress}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Note</td>
                                    <td>{txn.note}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Amount</td>
                                    <td>{txn.amount}</td>
                                </tr>
                                <tr>
                                    <td className="uk-text-bold">Date</td>
                                    <td>{moment(txn.date).format('MM/DD/YYYY h:MM:ss A')}</td>
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