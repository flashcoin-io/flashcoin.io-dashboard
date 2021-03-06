/**
 * Created on 12/15/16.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

var getAllProperties = function (obj) {
    var props = {};
    while (obj && obj !== React.Component.prototype && obj !== Object.prototype) {
        var propNames = Object.getOwnPropertyNames(obj);
        for (var i = 0; i < propNames.length; i++) {
            props[propNames[i]] = null;
        }
        obj = Object.getPrototypeOf(obj);
    }
    delete props.constructor;
    return Object.keys(props);
};

let utils = {
    extend: function (extensible, extending) {
        var props = getAllProperties(extending);
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (!(prop in extensible)) {
                var val = extending[prop];
                extensible[prop] = val;
            }
        }
    },

    getProps: function (el) {
        var props = {};

        for (var i = 0; i < el.attributes.length; i++) {
            var attribute = el.attributes[i];
            var name = utils.attributeNameToPropertyName(attribute.name);
            props[name] = utils.parseAttributeValue(attribute.value);
        }

        props.container = el;

        return props;
    },

    getterSetter: function (variableParent, variableName, getterFunction, setterFunction) {
        if (Object.defineProperty) {
            Object.defineProperty(variableParent, variableName, {
                get: getterFunction,
                set: setterFunction
            });
        }
        else if (document.__defineGetter__) {
            variableParent.__defineGetter__(variableName, getterFunction);
            variableParent.__defineSetter__(variableName, setterFunction);
        }

        variableParent['get' + variableName] = getterFunction;
        variableParent['set' + variableName] = setterFunction;
    },

    attributeNameToPropertyName: function (attributeName) {
        return attributeName
            .replace(/^(x|data)[-_:]/i, '')
            .replace(/[-_:](.)/g, function (x, chr) {
                return chr.toUpperCase();
            });
    },

    parseAttributeValue: function (value) {
        if (!value) {
            return null;
        }

        // Support attribute values with newlines
        value = value.replace(/[\n\r]/g, '');

        var pointerRegexp = /^{.*?}$/i,
            jsonRegexp = /^{{2}.*}{2}$/,
            jsonArrayRegexp = /^{\[.*\]}$/;

        var pointerMatches = value.match(pointerRegexp),
            jsonMatches = value.match(jsonRegexp) || value.match(jsonArrayRegexp);

        if (jsonMatches) {
            value = JSON.parse(jsonMatches[0].replace(/^{|}$/g, ''));
        } else if (pointerMatches) {
            value = eval(pointerMatches[0].replace(/[{}]/g, ''));
        }

        return value;
    },

    getChildren: function (el) {
        var fragment = document.createDocumentFragment();
        while (el.childNodes.length) {
            fragment.appendChild(el.childNodes[0]);
        }
        return fragment;
    },

    shallowCopy: function (a, b) {
        for (var key in b) a[key] = b[key];
        return a;
    }
};

export {utils};