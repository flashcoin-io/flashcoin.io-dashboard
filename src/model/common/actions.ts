import {COMMONS} from '../types';

const commonActions = {
    toggleLoading(isLoading){
        return {type: COMMONS.TOGGLE_LOADING, data: isLoading};
    }
};

export default commonActions;