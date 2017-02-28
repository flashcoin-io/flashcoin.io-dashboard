import {tsx, registerReact} from "../../../core/tsx-react";
import * as React from "react";

export default class WalletConfig extends React.Component<any, any> {
    state = {};

    componentDidMount(){}

    render() {
        return (
            <div id="page-wrap">
                <div className="col-sm-9 col-lg-9">
                    Wallet Configuration
                </div>
            </div>
        );
    }
}