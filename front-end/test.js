const { formatISO, format, parseISO } = require("date-fns");
console.log(format(parseISO("2021-02-15T17:10:00"), "d/MMM, hh:mm aaa"));
