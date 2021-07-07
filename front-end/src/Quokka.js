//Quoka
let date = new Date("2021-07-07T14:41:00");
let array1 = [1, 2, 3, 5, 4, 9, 8, 6, 66];
let array2 = [5, 4, 9, 1, 26, 74, 33];
const filteredArray = array2.filter((value) => array1.includes(value));

console.log(filteredArray);
