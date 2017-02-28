import * as redux from 'redux';

import userReducer from './users/reducer';
import statisticsReducer from './statistics/stats-reducer'
import adminReducer from './admin/admin-reducer'
import commonReducer from './common/common-reducer';

function lastAction(state = null, action) {
    console.log(action);
    return action;
}

const reducers = redux.combineReducers({
    lastAction: lastAction,
    userData: userReducer,
    statisticsData: statisticsReducer,
    adminData: adminReducer,
    commonData: commonReducer
});

export default reducers;
