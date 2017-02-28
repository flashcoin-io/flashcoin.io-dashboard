import EventBus from '../../core/bus';
import {bind} from '../../core/decko';
import store from '../../model/store';

var bus: EventBus = EventBus.singleton();

export {
    bus,
    bind,
    store
};