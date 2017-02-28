import {riot, template, Element} from '../riot-ts';
import store from '../../../model/store';
import {ApplicationState, USERS} from '../../../model/types';

import utils from '../utils';

import userActions from '../../../model/users/actions';
import * as templates from '../../templates/templates';

@template(templates.landingPage.LandingPageTemplate)
export default class LandingPage extends Element{
}

@template(templates.landingPage.LaningPageHeaderTemplate)
class LandingPageHeader extends Element{

}

@template(templates.landingPage.LaningPageFooterTemplate)
class LandingPageFooter extends Element{

}

@template(templates.landingPage.LaningPageLoginFormTemplate)
class LandingPageLoginForm extends Element{
    mounted(){
        store.subscribe(this.onApplicationStateChange.bind(this));
    }

    onApplicationStateChange(){
        var state = store.getState();
        if(state.lastAction.type == USERS.LOGIN_FAILED){
            UIkit.modal.alert(utils.getErrMsg(state.lastAction.data));
        }
    }

    onLoginButtonClick(e: UIEvent){
        var $email = $(this.root.querySelector('.login-form-email'));
        var $password = $(this.root.querySelector('.login-form-password'));

        store.dispatch(userActions.login($email.val(), $password.val()));
    }
}