import {createElement} from 'react';

import * as React from "react";
import * as ReactDOM from "react-dom";
import {utils} from "./utils";

let tsx = {
    createElement: createElement
};

function registerReact(elementName, ReactComponent) {
    var elementPrototype = Object.create(HTMLElement.prototype);
    var reactElement;

    function create(parent, props) {
        var element = React.createElement(ReactComponent, props);
        parent.reactiveElement = element;
        return ReactDOM.render(element, parent, props.onRender);
    }

    elementPrototype.createdCallback = function () {
        var props = utils.getProps(this);
        props.children = utils.getChildren(this);
        reactElement = create(this, props);
        exposeMethods(reactElement, reactElement.props.container);
        exposeDefaultMethods(reactElement, reactElement.props.container);

        utils.getterSetter(this, 'props', function () {
            return reactElement.props;
        }, function (props) {
            reactElement = create(this, props);
        });
    };

    elementPrototype.detachedCallback = function () {
        ReactDOM.unmountComponentAtNode(this);
    };

    elementPrototype.attributeChangedCallback = function (name, oldValue, newValue) {
        var props = utils.getProps(this);
        reactElement = create(this, props);
    };

    function exposeDefaultMethods (reactComponent, customElement) {
        customElement.forceUpdate = reactComponent.forceUpdate.bind(reactComponent);
    }

    function exposeMethods (reactComponent, customElement) {
        utils.extend(customElement, reactComponent);
    }

    document.registerElement(elementName, {prototype: elementPrototype});
}

export {tsx, registerReact};