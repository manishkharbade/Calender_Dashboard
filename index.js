// map, filter and reduce method

// 1. Map

// const nums = [1, 2, 3, 4, 5];
// console.log("nums:", nums);

// const mutiplyThree = nums.map((num, index) => {
//   return num * 3;
// });

// console.log("mutiplyThree", mutiplyThree);

// 2.Filter

// const arr = [2, 3, 4, 5, 6, 7];

// const moreThanTwo = arr.filter((arr) => {
//   return arr > 2;
// });
// console.log("moreThanTwo:", moreThanTwo);

// 3.Reduce

// const red = [2, 3, 4, 5, 6, 7];

// const sum = red.reduce((acc, curr, i, arr) => {
//   return acc + curr;
// }, 0);
// console.log("sum:", sum);

// Difference of map and foreach method

const iter = [2, 3, 4, 5, 6, 7];

const Map = iter.map((item) => {
  return item;
});
console.log("Map:", Map);

const ForEach = iter.forEach((item) => {
  return item;
});
console.log("ForEach:", ForEach);
