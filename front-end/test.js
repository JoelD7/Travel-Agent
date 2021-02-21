let a = [1, 2, 3, 4, 4];
let b = {
  array: ["a", "b", "v"],
};
console.log(JSON.stringify(b));
b = { ...b, new: a };
a = [];
console.log(JSON.stringify(b));
