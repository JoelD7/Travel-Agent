//Import functions like this to prevent 'SyntaxError: Cannot use import statement outside a module'
const { parseISO } = require("date-fns");

let at = "2021-05-27 23:54:00";
let date = parseISO(at);
console.log(date);
