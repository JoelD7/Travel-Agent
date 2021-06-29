//Quoka
let s =
  "https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Fprofile%2F0%2Fcarlos.jpg?alt=media&token=df647f23-7717-4b2e-9a85-a77a41acb606";

let value = "mi";
let compareTo = "Miami International Airport".toLowerCase();

let compareToSize = compareTo.length;
let valueSize = value.length;
console.log(compareTo.indexOf(value));
console.log(compareTo.substring(0, valueSize) === value);
