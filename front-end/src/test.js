//Import functions like this to prevent 'SyntaxError: Cannot use import statement outside a module'
const { parseISO } = require("date-fns");

let date = new Date();
let s =
  "https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Ftrips%2F2%2Fdubai.jpg?alt=media&token=5cb9cdfa-3ee7-4306-8c80-44fb221b977e";
console.log(s.length);
