//Import functions like this to prevent 'SyntaxError: Cannot use import statement outside a module'
const { parseISO } = require("date-fns");

let s = "http://localhost:3000/Travel-Agent/trips/10/album/7";
let i = s.indexOf("/album/");
console.log(s.substring(0, i));
