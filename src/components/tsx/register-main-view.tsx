import { bind, bus } from './refs';

import Dashboard from './views/dashboard';
import WalletConfig from './views/wallet-config';
import FindAccounts from './views/find-accounts';
import UserTxns from './views/user-txns';
import TransactionDetails from './views/user-txns';
import Logout from './views/logout';
import TokenIssuer from './views/token-issuer';
import SignupPage from './views/signup-page';
import SignupAccounts from './views/signup-accounts';
import TransactionsPage from './views/transactions-page';
import FountainTrackingPage from './views/fountain-tracking-page';
import UnsubscribeEmail from './views/unsubcribe-email';

import * as React from "react";
import { Router, Route } from "react-router";
import { tsx, registerReact } from "../../core/tsx-react";
import { hashHistory } from "react-router";
import { IndexRoute } from "react-router";

var $views = bus.cat('views');

class MainView extends React.Component<any, any>{
    render() {
        return (
            <Router history={hashHistory} >
                <Route path="/">
                    <IndexRoute component={Dashboard} />
                    <Route path="/kpi" component={Dashboard} />
                    <Route path="/find-accounts" component={FindAccounts} />
                    <Route path="/signup-page" component={SignupPage} />
                    <Route path="/signup-accounts" component={SignupAccounts} />
                    <Route path="/transactions-page" component={TransactionsPage} />
                    <Route path="/token-issuers" component={TokenIssuer} />
                    <Route path="/user-txns" component={UserTxns} />
                    <Route path="/fountain-tracking-page" component={FountainTrackingPage} />
                    <Route path="/unsubscribe-email" component={UnsubscribeEmail} />
                </Route>
            </Router>
            /*<Views view="kpi" onMounted={this.onViewsMounted}>
                <Dashboard name="kpi"/>
                <WalletConfig name='wallet-config'/>
                <FindAccounts name='find-accounts'/>
                <SignupPage name='signup-page'/>
                <SignupAccounts name='signup-accounts' />
                <TransactionsPage name='transactions-page' />
                <TokenIssuer name='token-issuers' />
                <UserTxns name='user-txns'/>
                <Logout name='logout'/>
                <FountainTrackingPage name='fountain-tracking-page' />
            </Views>*/
        );
    }
}

registerReact('main-view', MainView);