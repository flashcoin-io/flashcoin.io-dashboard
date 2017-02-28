class StoreBase<State> {
    private onchange = [];
    private state: State = {} as State;

    addChangeListener(fn) {
        this.onchange.push(fn);
    }

    removeChangeListener(fn) {
        this.onchange.splice(this.onchange.indexOf(fn), 1);
    }

    getState(): State {
        return this.state;
    }
    
    setState(state: State) {
        this.state = state;
        this.notifyChanges();
    }

    notifyChanges(){
        this.onchange.forEach(f => f(this.state));
    }
};

export { StoreBase };