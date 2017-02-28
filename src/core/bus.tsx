function getNames(name: string){
    var kv = {tag: null, name: null};
    var names = name.split('|');
    if(names.length > 1) {
        kv.tag = names[0];
        kv.name = names[1];
    }
    else kv.name = name;

    return kv;
}

function raiseEvent(evts: Array<any>, args: Array<any>, ctx?): Promise<any>{
    if(evts){
        var promises = [];
        for(var i = 0; i < evts.length;){
            var h = evts[i];
            if(h.once) evts.splice(i, 1);
            else i++;

            var fn = h.fn;
            var result, promise;
            try{
                result = fn.apply(ctx, args || []);
                promise = (result instanceof Promise) ? result : Promise.resolve(result);
            }catch(err){
                console.error(err);
                promise = Promise.reject(err);
            }
            
            promises.push(promise);
        }
        return Promise.all(promises);
    }
    else return Promise.resolve();
}

export default class EventBus{
    private events = {};
    private cats = {};

    constructor(){
    }

    cat(name: string): EventBus{
        var bus = this.cats[name];
        if(!bus) bus = this.cats[name] = new EventBus();
        return bus;
    }

    raise(name: string, args: Array<any>, ctx?){
        return raiseEvent(this.events[name], args, ctx);
    }

    emit(name: string, ...params){
        var args = [].slice.call(arguments, 1);
        return this.raise(name, args);
    }

    once(name: string, fn: Function){
        this.on(name, fn, true);
        return this;
    }

    on(name: string, fn: Function, once?: boolean){
        if(typeof(fn) == 'undefined') {
            return this;
        }
        
        var kv = getNames(name);
        var _name = kv.name;
        var evts = this.events[_name];
        if(!evts) evts = this.events[_name] = [];

        evts.push({fn: fn, once: once, tag: kv.tag});
        return this;
    }

    off(name: string, fn?: Function){
        var kv = getNames(name);
        var _name = kv.name;
        var _tag = kv.tag;
        var no_tag = (name.indexOf('|') === -1);

        var evts = this.events[_name];
        if(evts){
            for(var i = 0; i < evts.length; i++){
                var h = evts[i];
                if((fn && h.fn === fn) || (!fn && (no_tag || h.tag === _tag)))
                    evts.splice(i, 1);
            }
        }

        return this;
    }

    private static _instance;
    static singleton(): EventBus{
        if(EventBus._instance) return EventBus._instance;
        EventBus._instance = new EventBus();
        return EventBus._instance;
    }
}