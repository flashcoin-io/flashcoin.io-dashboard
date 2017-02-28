import { store, bind } from './refs';

import {tsx, registerReact} from "../../core/tsx-react";
import * as React from "react";
import userActions from '../../model/users/actions';

class Header extends React.Component<any, any> {
    state = {user: store.getState().userData.user};

    @bind
    onLogoutButtonClick(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();

        store.dispatch(userActions.logout());
    }

    render() {
        return (
            <nav className="main-header uk-navbar uk-margin-large-bottom uk-navbar-attached">
                <div className="uk-container uk-container-center">
                    <div className="uk-navbar-brand uk-hidden-small">
                        <img className="logo-img" src="assets/img/logo.png" title="Safe Cash" alt="Safe Cash"/>
                    </div>
                    <div className="uk-navbar-flip">
                        <ul className="uk-subnav uk-subnav-line">
                            <li className="uk-disabled"><div className="profile-greeting">Hello <span className="uk-text-bold">{this.state.user.email}</span></div></li>
                            <li><a onClick={this.onLogoutButtonClick}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

registerReact('main-header', Header);