const p = new Promise((resolve, reject) => {
    let i = 0;
    let timer = setInterval(() => { 
        resolve(i++);
    }, 1000);
})

p.then(value => {
    console.log(value);
})