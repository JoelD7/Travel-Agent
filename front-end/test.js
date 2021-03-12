const { differenceInHours, parseISO, format } = require("date-fns");

let date = new Date();
let date2 = new Date(2021, 2, 2, 14);
console.log(differenceInHours(date2, date));
console.log(format(parseISO("2021-03-13T18:17:38.819Z"), "yyyy-MM-dd"));
