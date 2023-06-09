# Lab2

Лабораторна робота №2 студентки групи ІП-04 Рекечинської(Квасової) Любові

В даній роботі було реалізовано найпростіший web-scrapper. Було обрано сайт з новинами kpi.ua для наступного функціоналу:

1. Раз в хв відправляється запит на головну сторінку та отримується відповідь.
2. Оброблюється отримана HTML відповідь - список новин.
3. Новини зберігаються в директорії news в окремих файлах txt.
4. Реалізований веб-сервер, шо віддає список файлів у директорії.
5. При кліку по елементу списка на сторінці - віддається текст новини.

## Відповіді на контрольні питання

1. **В чому різниця між setTimeout та setInterval?**

setTimeout використовується для виклику функції через певний період часу. 
setInterval використовується для багаторазового виклику функції через заданий проміжок часу. 

2. **Що таке блокуючий код?**

Блокування — це коли виконання додаткового JavaScript у процесі Node.js має чекати, доки завершиться операція, яка не є JavaScript. Це відбувається через те, що цикл подій не може продовжувати роботу JavaScript, поки виконується операція блокування.

Блокуючі методи виконуються синхронно , а неблокуючі - асинхронно .

Використовуючи модуль файлової системи як приклад, це синхронне читання файлу:

```javascript
const fs = require("fs");
const data = fs.readFileSync("/file.md"); // blocks here until file is read
```

А ось еквівалентний асинхронний приклад:

```javascript
const fs = require("fs");
fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
});
```

3. **Які переваги асинхронного читання з диску перед синхронним?**
Асинхронне читання з диску є кращою практикою, коли програма повинна обробляти багато запитів з диску та забезпечувати високу продуктивність та стійкість до помилок.

    1. Синхронне читання з диску блокує потік виконання, що означає, що інші процеси будуть чекати, доки завершиться операція читання з диску. У випадку асинхронного читання з диску запускається операція читання у фоновому режимі, тоді як програма продовжує виконуватися. Це зменшує час очікування та забезпечує більш ефективне використання ресурсів комп'ютера.
    2. Асинхронне програмування дозволяє обробляти багато запитів одночасно та забезпечує швидкий відгук на запити користувачів.
    3. У випадку синхронного читання з диску, якщо виникає помилка, вона призводить до зупинки програми. У випадку асинхронного читання з диску, програма може продовжувати виконання і обробляти інші запити, тоді як помилка оброблюється окремо. Це дозволяє програмі бути більш стійкою до помилок та уникати зупинки всього процесу.
    4. Асинхронний код дає більш гнучкий контроль над тим, як і коли виконувати код, особливо у випадку, коли потрібно обробити декілька запитів з диску одночасно.

4. **Опишіть різницю між Callbacks API, Promise API та async/await.**

Callback functions можна передати іншій функції як параметр, і вона буде виконана після завершення першої функції.
Promise — це щось на кшталт твердження if-else. Але в Promise є ще багато характеристик. Javascript не чекає, доки блок асинхронного коду буде повністю виконано. Цю поведінку потрібно обробляти спеціально в таких сценаріях, як надсилання запитів API до серверів, оскільки ми не знаємо статус сервера чи час, який знадобиться для повернення відповіді. За допомогою Promises ми можемо легко впоратися з такими сценаріями. Promise дозволяє нам утримувати виконання блоку коду до завершення асинхронного запиту.
Promise мають 3 стани.
- Очікує: початковий стан перед початком операції
- Виконано: коли вказана операція завершена
- Відхилено: коли операція не завершена; зазвичай видається помилка

Проста асинхронна функція — це спосіб, за допомогою якого ми можемо легше написати Promise. Асинхронна функція завжди повертає Promise, і якщо функція повертає значення, це значення буде вирішено Promise, а якщо функція повертає помилку, її буде відхилено.

5. **Як обробляються помилки при використанні Promise API?**

catch

```javascript
fetch('https://exampleserver.com')
  .then(response => response.json())
  .catch(err => console.log(err)) 
```

використання функції then(), де її другий параметр представляє обробник помилки, який як параметр отримує передане з функції reject значення:

```javascript
promise
  .then(function(value){
  },
  function(error){
  });
```

try..catch

```javascript
const myPromise = new Promise(function(resolve, reject){
    try{
        console.log("Start");
        startWork();      // doesn't exist func
        resolve("Resolve");
    }
    catch(err){
        reject(`|Error: ${err.message}`);
    }
});
```

6. **Як створити директорію через модуль fs? За що відповідає параметр mode?**

Для створення нових папок можна скористатися методами fs.mkdir() і fs.mkdirSync():
Синтаксис для створення каталогу

```javascript
fs.mkdir(path[, mode], callback)
```

- path: цей параметр містить шлях до каталогу, який потрібно створити.
- mode: цей параметр містить права до папки у числовому вигляді. За замовчуванням це 0777.
- callback: цей параметр містить функцію зворотного виклику, яка містить помилку. Рекурсивний параметр, якщо встановлено значення true, не видасть повідомлення про помилку, якщо каталог, який буде створено, уже існує.