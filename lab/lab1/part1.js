/* =====================
# Lab 1, Part 1 — Function Review
===================== */

/* =====================
Instructions: "Write a function that adds one to the number provided"
Example: "plusOne(2) should return 3"
===================== */

var plusOne = function(num) {
  /* Replace this with code */
  var numPlusOne = num + 1;
  return numPlusOne;
};

console.log('plusOne success:', plusOne(99) === 100);

/* =====================
Instructions: "Write a function, age, that takes a birth year and returns an age in years."
Example: "age(2000) should return 16"
===================== */

var age = function(birth) {
  var ageInYears = 2016 - birth;
  return ageInYears
};

console.log('age success:', age(1971) === 45);

/* =====================
Instructions: "Write a function that returns true for numbers over 9000 and false otherwise"
Example: "over9000(22) should return false"
===================== */

var over9000 = function(num) {
    if (num > 9000){
      return true;
    } else{
      return false;
    }
};

console.log('over9000 success:', over9000(9001) === true && over9000(12) === false);

/* =====================
Instructions: "Write a function that returns the value of an object at a specified key"
Example: "valueAtKey({'name': 'Nathan'}, 'name') should return 'Nathan'"
===================== */

var valueAtKey = function(object,key){
  var value = [];
  for (key in object) {
    value = object[key];
  }
  return value;
};

console.log('valueAtKey success:', valueAtKey({'foo': 'bar'}, 'foo') === 'bar');

/* =====================
Instructions: "Write a function which returns the y coordinate of a line given m, x, and b"
Example: "y(0, 0, 0) should return 0; y(1, 1, 1) should return 2"
===================== */

var y = function(m,x,b) {
  y = m * x + b;
  return y;
};
console.log('y success:', y(12, 1, 12) === 24);

/* =====================
Instructions: "Write a function which counts the number of times a value occurs in an array "
Example: "countItem(['a', 'b', 'a'], 'a') should return 2"
===================== */

var countItem = function(array, a) {
  var y = 0;
  for (var x in array) {
    if (array[x] === a) {y = y + 1;}
  }
  return y;
};
console.log('countItem success:', countItem([1, 2, 3, 4, 5, 4, 4], 4) === 3);
