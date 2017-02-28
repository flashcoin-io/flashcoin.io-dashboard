import { store} from '../refs';

import {tsx, registerReact} from "../../../core/tsx-react";
import * as React from "react";
import userActions from '../../../model/users/actions';

export default class Logout extends React.Component<any, any> {
    state = {};

    componentDidMount(){
        store.dispatch(userActions.logout());
    }

    render() {
        return (
            <div id="page-wrap">
                <div className="col-sm-9 col-lg-9">Logging out...</div>
            </div>
        );
    }
}