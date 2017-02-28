import * as redux from 'redux';
import thunk from 'redux-thunk';
import {ApplicationState} from './types';
import reducers from './reducers';

var createStoreWithMiddleware = redux.compose(
    redux.applyMiddleware(thunk)
)(redux.createStore);

var store = createStoreWithMiddleware(reducers) as redux.Store<ApplicationState>;

export default store;
