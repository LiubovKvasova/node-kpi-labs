# Lab 1
Виконала студентка групи ІП-04 Рекечинська (Квасова) Любов

## Setup
1. Install Node JS
2. Clone the repository with the following command:
```bash
git clone https://github.com/LiubovKvasova/node-kpi-labs
```

## Create phone number
Write a function that accepts an array of 10 integers
(between 0 and 9), that returns a string of those numbers in the form of a phone number.

Example
```javascript
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
```
The returned format must be correct in order to complete this challenge.

Don't forget the space after the closing parentheses!

## Mumbling
This time no story, no theory. The examples below show you how to write function accum:

Examples:
```javascript
accum("abcd") -> "A-Bb-Ccc-Dddd"
accum("RqaEzty") -> "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
accum("cwAt") -> "C-Ww-Aaa-Tttt"
```
The parameter of accum is a string which includes only letters from a..z and A..Z.

## Array.diff
Your goal in this kata is to implement a difference function, which subtracts one list from another and returns the result.

It should remove all values from list a, which are present in list b keeping their order.
```javascript
arrayDiff([1,2],[1]) == [2]
```
If a value is present in b, all of its occurrences must be removed from the other:
```javascript
arrayDiff([1,2,2,2,3],[2]) == [1,3]
```

## Контрольні запитання 
*1. Чи є різниця між виконанням JavaScript в браузері та в середовищі Node.js?*

Так, є різниця. Вона полягає в тому, що JavaScript у браузері має доступ до 
DOM (модель об'єктів сторінки), а Node.js має доступ до імпорту файлів через 
require та стандартну бібліотеку для роботи із системними ресурсами, наприклад, файлами.

*2. Назвіть основні типи в JavaScript*
Всього є 8 типів даних:

Undefined - невідоме значення (наприклад існує змінна number, якій ми не надали значення, тоді при виведенні змінної у консоль нам виведе undefined);

Boolean - логічне значення типу правда/неправда, має значення лише true або false;

Number - числове значення (наприклад 43);

String - текстове значення, пишеться завжди в лапках (наприклад 'Слава Україні');

BigInt - числове значення, яке може бути більшим ніж 9007199254740992 (2 в 53 степені). Дані числа пишуться з додаванням у кінці латинської літери "n" (наприклад 9007199254740993n);

Symbol - символьний тип, який є унікальним і його неможливо змінити;

Null - це вказівник на порожній об'єкт;

Object - це структура даних, яка має набір ключ/значення.

*3. Як працює замикання (closure) в JavaScript?*
Замикання - це доступ з внутрішньої функції до області видимості зовнішньої функції.
Наприклад:
```javascript
function kpi() {
    const name = "ІП-04"; // name - локальна змінна, створена в kpi
    function groupName() { // groupName() - внутрішня функція, замикання
        alert (name); // groupName() використовує змінну, оголошену в батьківській функції
    }
    groupName();
}
kpi();
```

*4. Назвіть основні стандартні бібліотеки Node.js*

http - включає класи, методи та події для створення http-сервера Node.js

https - те саме, що й http, але з підтримкою HTTPS протоколу

url - включає методи для аналізу URL

path - відповідає за роботу зі шляхами до файлів

fs - включає класи, методи та події для роботи з файловою системою

assert - надає набір функцій для юніт-тестів через припущення (assertions)

*5. Які є способи імпортувати модулі в Node.js?*

За допомогою require та import 

Наприклад:
```javascript
const myModule = require('myModule');
import {myFunction} from 'myModule';
```

*6. Як пов'язані Google Chrome / Chrominium та Node.js?*

V8 - це назва механізму JavaScript, який працює в Google Chrome. Це те, що
використовує наш JavaScript і виконує його під час перегляду в Chrome.
V8 — це двигун JavaScript, тобто він аналізує та виконує код JavaScript.

*7. Як можна дозволити імпортувати змінні з поточного модуля?*

За допомогою export

Іменнованого:
```javascript
export { cube, foo };
```
Тоді в іншому скрипту:
```javascript
import { cube, foo } from 'my-module';
```

Дефолтний:
```javascript
export default function cube(x) {
  return x * x * x;
}
```
Тоді в іншому скрипту:
```javascript
import cube from 'my-module';
```
