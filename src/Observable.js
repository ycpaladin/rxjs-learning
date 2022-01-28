
// const isSubscriber = (value) => {
//     return value && value
// }

class Subscription {
    constructor(unsubscribe) {
        this._unsubscribe = unsubscribe;
    }
    unsubscribe() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }
}

class Observable {

    // _subscriber

    /**
     * xxx
     * @param {(observer:{ next(value: any): void, error(err: any): void, complete(): void }) => () => void} subscriber 
     */
    constructor(subscriber) {
        this._subscriber = subscriber;
        this._hasError = false;
        this._completed = false;
        /**
         * @type {Observable}
         */
        this.source = null;
        /**
         * @type {{ call(subscriber:{ }, source: Observable): any }} 
         */
        this.operator = null;
    }

    /**
     * 
     * @param {{ call(subscriber:any, source: any): void}} operator 
     * @returns {Observable}
     */
    life(operator) {
        const observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }

    /**
     * 
     * @param {(value, error) => void} observerOrNext 
     */
    subscribe(observerOrNext) {
        const { source, operator } = this; // 如果有source 说明pipe被调用过


        // const value = operator ? operator.call(this, source) : source ?  ;
        const unsubscribe = operator ?
            operator.call({ next: observerOrNext }, source) : // 如果有operator（操作符），那么在此调用操作符
            source ?
                source.subscribe(observerOrNext) : // 订阅source
                this._subscriber({                  // 
                    next: (value) => {
                        if (this._completed) {
                            return;
                        }
                        observerOrNext(value);
                    },
                    error: (err) => {
                        this._hasError = true;
                        observerOrNext(null, err);
                    },
                    complete: () => {
                        this._completed = true;
                    }
                });

        return new Subscription(unsubscribe);
    }

    pipe(...operatorFuns) {
        if (!operatorFuns.length) {
            return this;
        }

        if (operatorFuns.length === 1) {
            // return (input) => operatorFuns[0](input);
            return operatorFuns[0](this);
        }

        // return (input) => {
        //     return operatorFuns.reduce((prev, fn) => fn(prev), input);
        // };
        return operatorFuns.reduce((prev, fn) => fn(prev), this)
    }
}


module.exports = {
    Observable,
    Subscription
};