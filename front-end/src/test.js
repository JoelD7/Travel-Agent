const { iataCodes } = require("./utils/constants/iataCodesx");

const filteredArray = iataCodes.filter((code) => code.city === "New York");
console.log(filteredArray);
