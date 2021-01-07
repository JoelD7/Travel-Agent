let a = new Date(2021, 0, 13, 14, 35);
let b = new Date(2021, 0, 13);
console.log();

let c = {
  12: {
    cal: ["klk", "como tu ta?"],
  },
  12: {
    cal: ["hey", "como??"],
  },
};
for (const key in c) {
  if (Object.hasOwnProperty.call(c, key)) {
    const element = c[key];
    console.log(typeof key);
  }
}
// console.log(c[12]);
