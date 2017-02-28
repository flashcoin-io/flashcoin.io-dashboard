import { bind, bus } from './refs';

import { tsx, registerReact } from "../../core/tsx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { hashHistory } from "react-router";

enum SideBarItemType {
    Command,
    Header,
    Divider
}

type SideBarDataItem = {
    title?: string;
    divider?: boolean;
    header?: boolean;
    id?: string;
    default?: boolean;
}

class SideBarItem extends React.Component<any, any> {
    static LastActiveSideBarItem: SideBarItem;
    state = { active: false };

    componentDidMount() {
        if (this.props.item.default) {
            this.setState({ active: true });
            SideBarItem.LastActiveSideBarItem = this;
        }
    }

    @bind
    onClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        let id = this.props.item.id;
        hashHistory.push(id);

        this.setState({ active: true });
        if (SideBarItem.LastActiveSideBarItem != this) {
            SideBarItem.LastActiveSideBarItem.setState({ active: false });
        }
        SideBarItem.LastActiveSideBarItem = this;

        /*var $views = bus.cat('views');
        $views.emit('change', this.props.item.id, {clearStack: true});

        this.setState({active: true});

        if(SideBarItem.LastActiveSideBarItem != this){
            SideBarItem.LastActiveSideBarItem.setState({active: false});
        }

        SideBarItem.LastActiveSideBarItem = this;*/
    }

    render() {
        let item = this.props.item;
        var li = null;
        if (item.header) {
            li = <li className="uk-margin-top"><a className="uk-nav-header">{item.title}</a></li>
        }
        else if (item.divider) {
            li = <li><a className="uk-nav-divider"></a></li>
        }
        else {
            li = (this.state.active) ? <li className="uk-active"><a onClick={this.onClick}>{item.title}</a></li>
                : <li><a onClick={this.onClick}>{item.title}</a></li>
        }

        return li;
    }
}

class SideBar extends React.Component<any, any> {
    private items: SideBarDataItem[] = [
        { title: "KPI's", id: 'kpi', default: true },
        { title: 'Find Accounts', id: 'find-accounts' },
        { title: 'Signups', id: 'signup-page' },
        { title: 'Transactions', id: 'transactions-page' },
        { title: 'Ads', id: 'fountain-tracking-page' },
        { title: 'divider', id: 'divider-1', divider: true },
        { title: 'Token Issuers', id: 'token-issuers' },
        { title: 'Reports', id: 'reports-header', header: true },
        { title: 'Daily Report (N/A)', id: 'daily-report' },
        { title: 'Unsubscribe email', id: 'unsubscribe-email' }
    ];

    mounted() {

    }

    render() {
        return (
            <div className="uk-panel uk-panel-box">
                <h3 className="uk-panel-title">Dashboard</h3>
                <hr />
                <ul className="uk-nav uk-nav-side">
                    {
                        this.items.map((item) => {
                            return <SideBarItem key={item.id} item={item} />
                        })
                    }
                </ul>
            </div>
        );
    }
}

registerReact('main-sidebar', SideBar);