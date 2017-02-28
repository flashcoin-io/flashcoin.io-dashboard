import {StoreBase} from './store-base';

interface State{
    loggedIn: boolean
}

const AuthStore = new StoreBase<State>();

export { AuthStore };