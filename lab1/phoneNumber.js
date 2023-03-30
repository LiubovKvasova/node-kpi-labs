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