// import { iataCodes } from "./utils";

const { iataCodes } = require("./utils");

//Quoka
let date = new Date("2021-07-07T14:41:00");
let array1 = [1, 2, 3, 5, 4, 9, 8, 6, 66];
let array2 = [5, 4, 9, 1, 26, 74, 33];
const filteredArray = iataCodes.filter((code) => code.city === "New York");
console.log(filteredArray);
