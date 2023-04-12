//하

const scoreArr = [100, 70, 80, 90, 10];
scoreArr.sort((a, b) => a - b);
const newScoreArr = scoreArr.slice(1, 4);
const average =
  newScoreArr.reduce((acc, cur) => acc + cur) / newScoreArr.length;
console.log(average); //80

//중
