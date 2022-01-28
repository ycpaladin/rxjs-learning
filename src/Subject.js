const { Observable, Subscription } = require('./Observable');


class Subject extends Observable {
    constructor() {
        super();
        this.observers = [];
    }

    life(operator) {
        const subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    }

    /**
     * 订阅
     * @param  {(value, error) => void} observerOrNext 
     * @returns {Subscription}
     */
    subscribe(observerOrNext) {
        // super.subscribe(observerOrNext);
        this.observers.push(observer);
        return new Subscription(() => {
            const index = this.observers.findIndex(i => i === observer);
            this.observers.splice(index, 1);
        })
    }

    next(value) {
        if (this._completed) {
            return;
        }
        for (let index = 0, len = this.observers.length; index < len; index++) {
            const observer = this.observers[index];
            observer(value)
        }
    }

    error(err) {
        for (let index = 0, len = this.observers.length; index < len; index++) {
            const observer = this.observers[index];
            observer(null, err)
        }
        this._hasError = true;
    }

    complete() {
        // for (let index = 0, len = this.observers.length; index < len; index++) {
        //     const observer = this.observers[index];
        //     observer(null, err)
        // }
        this._completed = true;
    }
}

class AnonymousSubject extends Subject {
    /**
     * 
     * @param {{ next(value: any): void, error(err: any): void, complete(): void }} destination 
     * @param {*} source 
     */
    constructor(destination, source) {
        this.source = source;
        this.destination = destination;
    }

    next(value) {
        this.destination.next(value)
    }

    error(err) {
        this.destination.error(err)
    }

    complete() {
        this.destination.complete(value)
    }
}

class BehaviorSubject extends Subject {
    constructor(initValue) {
        super();
        this.value = initValue;
    }

    subscribe(observer) {
        observer(this.value);
        super.subscribe(observer);
    }

    next(value) {
        super.next(this.value = value)
    }
}

module.exports = {
    Subject,
    BehaviorSubject,
    AnonymousSubject
}