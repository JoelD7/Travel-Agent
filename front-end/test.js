console.log("4LUX".split("EST"));
let stars = 0;
for (const char of "4 STARS LUXURY") {
  if (char === " ") {
    continue;
  }
  if (Number.isFinite(Number(char))) {
    stars = Number(char);
    console.log(stars);
  }
}
