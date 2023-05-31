'use strict';

function createPhoneNumber(numbers){
  let phoneNumber = '(';
  
  for (let i = 0; i < 10; i++) {
    phoneNumber += numbers[i];
 
    if (i === 2) {
      phoneNumber += ') ';
    }
    if (i === 5) {
      phoneNumber += '-';
    }
  }
  
  return phoneNumber;
}

console.log(createPhoneNumber([1,2,3,4,5,6,7,8,9,0]));