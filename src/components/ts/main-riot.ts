import {riot} from './riot-ts';
import {USERS} from '../../model/types';
import store from '../../model/store';

import * as components from './components';

import userActions from '../../model/users/actions';
import UserService from '../../model/users/user-service';

import statisticsActions from '../../model/statistics/stats-actions';
import adminActions from '../../model/admin/admin-actions'

components.initialize();

riot.route((action) => {
    if(action == 'login'){
        return riot.mount('#main', 'landing-page');
    }

    var state = store.getState();
    if(!state.userData.user || state.userData.user.role !== 'ADMIN'){
        return riot.route('login');
    }

    switch(action){
        case '':
        case 'home':
            return riot.mount('#main', 'home-page');
    }
});

store.subscribe(() => {
    var state = store.getState();
    if(state.lastAction.type == USERS.GET_PROFILE_SUCCESS){
        riot.route('');
    }
    else if(!state.userData.user){
        riot.route('login');
    }
});

riot.route.start(true);

store.dispatch(userActions.ssoLogin());

//for test only
window.store = store;
window.userActions = userActions;
window.statisticsActions = statisticsActions;
window.adminActions = adminActions;
