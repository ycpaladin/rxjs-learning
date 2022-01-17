const { Subject, BehaviorSubject } = require('./Subject');

const subject = new Subject();

const sub1 = subject.subscribe(v => {
    console.log('from sub1 ', v);
})

const sub2 = subject.subscribe(v => {
    console.log('from sub2 ', v);
})

subject.next('hhhhhhh')

setTimeout(() => {
    console.log('sub1 unsubscribe')
    sub1.unsubscribe();
}, 1000);

setTimeout(() => {
    subject.next('HHHHHH')
}, 2000);

setTimeout(() => {
    console.log('sub2 unsubscribe')
    sub2.unsubscribe();
}, 3000);