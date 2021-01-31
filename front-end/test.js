const { compareAsc, parseISO } = require("date-fns");

// console.log(compareAsc(new Date(1987, 1, 11, 12, 0, 0), new Date(1987, 1, 11, 12, 1, 0)));
console.log(compareAsc(new Date(Date.now()), parseISO("2021-01-30T21:30:34.677Z")));
