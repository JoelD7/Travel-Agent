//Import functions like this to prevent 'SyntaxError: Cannot use import statement outside a module'
const { parseISO } = require("date-fns");

let date = new Date(1604846775676);
console.log(date.toUTCString());
