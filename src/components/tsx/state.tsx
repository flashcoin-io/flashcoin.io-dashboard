import {StoreBase} from '../../model/store-base';

interface IState{
    sidebar: {selectedItem: any},
    transactions: {selectedTxn: any},
    views: {selectedView: {name: string, data: any}}
}

const ComponentState = new StoreBase<IState>();
ComponentState.setState({
    sidebar: {selectedItem: null},
    transactions: {selectedTxn: null},
    views: {selectedView: null}
});

export default ComponentState;