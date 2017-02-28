import {tsx} from './refs';
import * as preact from 'preact';

interface PropsType{
    path: string;
    default?: boolean;
    component?: any;
    className?:string;
    onRoute?:(route: Route) => void
}

interface StateType{
    __tick__: number;
}

class Route extends preact.Component<PropsType, StateType>{
    constructor(props){
        super(props);

        var path = this.props.path;
        RouterUtils.addRoute(path, () => {
            if(this.props.onRoute) {
                this.props.onRoute(this);
            }

            this.setState({__tick__: Date.now()});
        });
    }

    componentDidMount(){
        if(this.props.default){
            RouterUtils.load(this.props.path);
        }
    }

    render(){
        var ComponentClass = this.props.component;
        if(ComponentClass){
            return <ComponentClass/>;
        }
        
        var childs = this.props.children;
        if(childs.length == 0) return null as JSX.Element;

        var className = this.props.className || '';
        var el = (childs.length > 1) ? <div className={className}>{childs}</div> : childs[0];
        return el as JSX.Element;
    }
}

interface RouterPropsType{

}

class Router extends preact.Component<RouterPropsType, any>{
    render(){
        var childs = this.props.children;
        var component = childs.filter((c) => {
            var path = c.attributes['path'];
            if(path != null && RouterUtils.isMatched(path)){
                return true;
            }

            return false;
        });

        return component[0];
    }
}

var RouterUtils = (function () {

    "use strict";

    var routes = [];

    function addRoute(route, handler) {
        routes.push({parts: route.split('/'), handler: handler});
    }

    function load(route) {
        window.location.hash = route;
    }

    function clear(){
        routes = [];
    }

    function isMatched(path: string){
        var urlPart = window.location.hash.substr(1),
            parts = urlPart.split('/'),
            partsLength = parts.length;
        
        var pathParts = path.split('/');

        if (pathParts.length === partsLength) {
            var params = [];
            for (var j = 0; j < partsLength; j++) {
                if (pathParts[j].substr(0, 1) === ':') {
                    params.push(parts[j]);
                } else if (pathParts[j] !== parts[j]) {
                    break;
                }
            }
            if (j === partsLength) {
                return true;
            }
        }

        return false;
    }

    function start() {

        var path = window.location.hash.substr(1),
            parts = path.split('/'),
            partsLength = parts.length;

        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route.parts.length === partsLength) {
                var params = [];
                for (var j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                    route.handler.apply(undefined, params);
                    return;
                }
            }
        }
    }

    $(window).on('hashchange', start);

    return {
        addRoute: addRoute,
        load: load,
        start: start,
        clear: clear,
        isMatched: isMatched
    };

}());

export {RouterUtils, Route, Router};