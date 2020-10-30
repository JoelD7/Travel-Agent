let obj ={
    a: '23',
    b: 'baba'
}

let an ={
    a: '333'
}

obj = {...obj, ...an}
console.log(obj);