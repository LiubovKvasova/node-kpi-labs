'use strict';

function accum(s) {
	let result = '';
  
  for (let i = 0; i < s.length; i++) {
    if (i !== 0) {
      result += '-';
    }

    const letter = s[i].toLowerCase();
    const capitalLetter = letter.toUpperCase();
    
    result += capitalLetter + letter.repeat(i);
  }

  return result;
}

console.log(accum('Hello'));

function hello (){
  const word = 'Hello';
  function write () {
    console.log(word);
  }
  return write;
}

const write = hello();
write();