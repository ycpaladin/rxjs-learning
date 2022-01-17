const { Observable } = require('./Observable');
const map = require('./operators/map')

const sub$ = new Observable((observer) => {
    setTimeout(() => {
        observer.next('1111')
    }, 1000);
    return () => {
        console.log('DONE....')
    }
})


const sub = sub$.pipe(
    map(v => v + 'map')
).subscribe(v => {
    console.log(v);
    Promise.resolve().then(() => sub.unsubscribe());
})

