// import { airports } from "./src/utils/constants/airports";
var fs = require("fs");

const { airports } = require("./airports");

let arr = [];

for (const key in airports) {
  if (Object.hasOwnProperty.call(airports, key)) {
    const element = airports[key];
    arr.push(element);
  }
}

console.log(airports["00AK"]);

var file = fs.createWriteStream("array.txt");
file.on("error", function (err) {
  console.log("error happened: ", err);
});

arr.forEach(function (v) {
  file.write(v + ",");
});

file.end();
