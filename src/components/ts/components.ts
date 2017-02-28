import {riot, template, Element} from './riot-ts';

import LandingPage from './landing-page/index';
import HomePage from './home-page/index';
import LoadingIndicator from './loading-indicator';
import App from './app';

import * as templates from '../templates/templates';

export {LoadingIndicator, LandingPage, HomePage, App};

export function initialize(){
    riot.mount('*');
}





