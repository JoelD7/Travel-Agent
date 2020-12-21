const { differenceInHours } = require("date-fns")

let t =1608469224
let date = new Date(t)
let cur = Date.now()
console.log(date);
console.log(differenceInHours(cur, t))