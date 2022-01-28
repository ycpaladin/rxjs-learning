
const { Observable } = require('rxjs');

const observable$ = new Observable(subscribe => {
    let i = 0;
    let timer = setInterval(() => {
        subscribe.next(i++);
        if (i === 5) {
            subscribe.error('发生错误了');
        }
    }, 1000);

    return () => {
        clearInterval(timer)
    }
})

observable$.subscribe({
    next(value) {
        console.log(value)
    },
    // error(err) {
    //     console.log(err)
    // }
})

