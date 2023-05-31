'use strict';

function arrayDiff(a, b) {
  return a.filter(el => !b.includes(el));
}

console.log(arrayDiff([1,3,4], [1,4]));