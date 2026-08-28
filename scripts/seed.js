var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// -----------------------------------------------------------------------
// tambah/ubah learning path & soal
// -----------------------------------------------------------------------
const LEARNING_PATHS = [
  // soal javascript
  {
    id: "javascript",
    title: "Javascript",
    description: "Lorem ipsum dolor sit amet",
    icon: "javascript.png",
    percent: 0,
    questions: [
      {
        order: 1,
        prompt: "Apa output dari kode berikut?",
        code: "console.log(typeof 'Hello');",
        options: [
          { id: "a", text: '"string"' },
          { id: "b", text: '"text"' },
          { id: "c", text: '"char"' },
          { id: "d", text: '"object"' },
        ],
        correctOptionId: "a",
        points: 5,
      },
      {
        order: 2,
        prompt: "Berapa hasil dari operasi ini?",
        code: "console.log(2 + '2');",
        options: [
          { id: "a", text: "4" },
          { id: "b", text: '"22"' },
          { id: "c", text: "NaN" },
          { id: "d", text: "Error" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 3,
        prompt: "Apa tipe data dari undefined?",
        code: "console.log(typeof undefined);",
        options: [
          { id: "a", text: '"null"' },
          { id: "b", text: '"object"' },
          { id: "c", text: '"undefined"' },
          { id: "d", text: "Error" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 4,
        prompt: "Apa output dari kode berikut?",
        code: "console.log(Boolean(0));",
        options: [
          { id: "a", text: "true" },
          { id: "b", text: "false" },
          { id: "c", text: "null" },
          { id: "d", text: "undefined" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 5,
        prompt: "Apakah hasil dari perbandingan ini?",
        code: "console.log(5 === '5');",
        options: [
          { id: "a", text: "true" },
          { id: "b", text: "false" },
          { id: "c", text: "TypeError" },
          { id: "d", text: "undefined" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 6,
        prompt: "Apa tipe data dari null di JavaScript?",
        code: "console.log(typeof null);",
        options: [
          { id: "a", text: '"null"' },
          { id: "b", text: '"undefined"' },
          { id: "c", text: '"object"' },
          { id: "d", text: '"string"' },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 7,
        prompt: "Apa output dari perbandingan array kosong dengan false?",
        code: "console.log([] == false);",
        options: [
          { id: "a", text: "true" },
          { id: "b", text: "false" },
          { id: "c", text: "TypeError" },
          { id: "d", text: "undefined" },
        ],
        correctOptionId: "a",
        points: 5,
      },
      {
        order: 8,
        prompt: "Berapa nilai dari array pada index 1?",
        code: "const arr = [10, 20, 30];\nconsole.log(arr[1]);",
        options: [
          { id: "a", text: "10" },
          { id: "b", text: "20" },
          { id: "c", text: "30" },
          { id: "d", text: "undefined" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 9,
        prompt: "Apa hasil pemanggilan Math.max tanpa argumen?",
        code: "console.log(Math.max());",
        options: [
          { id: "a", text: "0" },
          { id: "b", text: "NaN" },
          { id: "c", text: "-Infinity" },
          { id: "d", text: "Infinity" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 10,
        prompt: "Apa hasil penjumlahan dengan undefined?",
        code: "console.log(undefined + 5);",
        options: [
          { id: "a", text: "5" },
          { id: "b", text: '"undefined5"' },
          { id: "c", text: "NaN" },
          { id: "d", text: "Error" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 11,
        prompt: "Apa output dari isNaN?",
        code: "console.log(isNaN('100'));",
        options: [
          { id: "a", text: "true" },
          { id: "b", text: "false" },
          { id: "c", text: "TypeError" },
          { id: "d", text: "undefined" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 12,
        prompt: "Tebak hasil ekspresi string dan unary operator ini.",
        code: "console.log('b' + 'a' + + 'a' + 'a');",
        options: [
          { id: "a", text: '"baaa"' },
          { id: "b", text: '"baNaNa"' },
          { id: "c", text: '"baNaN"' },
          { id: "d", text: "Error" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 13,
        prompt: "Apa tipe data dari NaN?",
        code: "console.log(typeof NaN);",
        options: [
          { id: "a", text: '"NaN"' },
          { id: "b", text: '"number"' },
          { id: "c", text: '"string"' },
          { id: "d", text: '"undefined"' },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 14,
        prompt: "Apa return value dari method push()?",
        code: "const arr = [1, 2];\nconsole.log(arr.push(3));",
        options: [
          { id: "a", text: "[1, 2, 3]" },
          { id: "b", text: "3" },
          { id: "c", text: "2" },
          { id: "d", text: "true" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 15,
        prompt: "Method apa yang menghapus elemen PERTAMA dari array?",
        code: "// arr.methodName()",
        options: [
          { id: "a", text: "pop()" },
          { id: "b", text: "shift()" },
          { id: "c", text: "unshift()" },
          { id: "d", text: "slice()" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 16,
        prompt: "Apakah kode ini menyebabkan error?",
        code: "const obj = { a: 1 };\nobj.a = 2;\nconsole.log(obj.a);",
        options: [
          { id: "a", text: "Ya, TypeError" },
          { id: "b", text: "2" },
          { id: "c", text: "1" },
          { id: "d", text: "undefined" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 17,
        prompt: "Apa output akibat Temporal Dead Zone (TDZ)?",
        code: "console.log(x);\nlet x = 5;",
        options: [
          { id: "a", text: "undefined" },
          { id: "b", text: "null" },
          { id: "c", text: "ReferenceError" },
          { id: "d", text: "5" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 18,
        prompt: "Bagaimana konteks 'this' pada Arrow Function?",
        code: "const obj = { \n  val: 1, \n  getVal: () => this.val \n};",
        options: [
          { id: "a", text: "Mengacu pada obj (1)" },
          { id: "b", text: "Mengacu pada global/window object" },
          { id: "c", text: "undefined" },
          { id: "d", text: "SyntaxError" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 19,
        prompt: "Konsep apa yang terjadi pada kode ini?",
        code: "function out() {\n  let x = 1;\n  return () => x;\n}",
        options: [
          { id: "a", text: "Hoisting" },
          { id: "b", text: "Closure" },
          { id: "c", text: "Currying" },
          { id: "d", text: "Recursion" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 20,
        prompt: "Method iterasi mana yang me-return array baru?",
        code: "const newArr = arr.method(x => x);",
        options: [
          { id: "a", text: "forEach()" },
          { id: "b", text: "map()" },
          { id: "c", text: "find()" },
          { id: "d", text: "reduce()" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 21,
        prompt: "Berapa hasil akhir dari reduce ini?",
        code: "const sum = [1,2,3].reduce((a, b) => a + b, 0);",
        options: [
          { id: "a", text: "5" },
          { id: "b", text: "6" },
          { id: "c", text: "[1, 2, 3]" },
          { id: "d", text: "undefined" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 22,
        prompt: "Apa nilai dari variabel b?",
        code: "const [a, ...b] = [1, 2, 3];\nconsole.log(b);",
        options: [
          { id: "a", text: "2" },
          { id: "b", text: "3" },
          { id: "c", text: "[2, 3]" },
          { id: "d", text: "[1, 2, 3]" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 23,
        prompt: "Apa nilai dari obj1.a setelah kode ini berjalan?",
        code: "const obj1 = { a: 1 };\nconst obj2 = { ...obj1 };\nobj2.a = 2;\nconsole.log(obj1.a);",
        options: [
          { id: "a", text: "1" },
          { id: "b", text: "2" },
          { id: "c", text: "undefined" },
          { id: "d", text: "TypeError" },
        ],
        correctOptionId: "a",
        points: 15,
      },
      {
        order: 24,
        prompt: "Apa state awal dari sebuah Promise yang baru dibuat?",
        code: "new Promise((resolve, reject) => {});",
        options: [
          { id: "a", text: "fulfilled" },
          { id: "b", text: "rejected" },
          { id: "c", text: "pending" },
          { id: "d", text: "settled" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 25,
        prompt: "Bagaimana urutan output di console?",
        code: "setTimeout(() => console.log(1), 0);\nPromise.resolve().then(() => console.log(2));\nconsole.log(3);",
        options: [
          { id: "a", text: "1, 2, 3" },
          { id: "b", text: "3, 2, 1" },
          { id: "c", text: "3, 1, 2" },
          { id: "d", text: "2, 3, 1" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 26,
        prompt: "Apa output dari Hoisting dengan var?",
        code: "console.log(a);\nvar a = 10;",
        options: [
          { id: "a", text: "10" },
          { id: "b", text: "undefined" },
          { id: "c", text: "ReferenceError" },
          { id: "d", text: "null" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 27,
        prompt: "Apa output pemanggilan toString pada object ini?",
        code: "const obj = Object.create(null);\nconsole.log(obj.toString);",
        options: [
          { id: "a", text: "[object Object]" },
          { id: "b", text: "Function toString" },
          { id: "c", text: "undefined" },
          { id: "d", text: "Error" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 28,
        prompt: "Kemana __proto__ dari instance merujuk?",
        code: "function Car() {}\nconst car1 = new Car();\nconsole.log(car1.__proto__ === ?);",
        options: [
          { id: "a", text: "Car" },
          { id: "b", text: "Car.prototype" },
          { id: "c", text: "Object.prototype" },
          { id: "d", text: "Function.prototype" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 29,
        prompt:
          "Method apa yang meminjam fungsi namun TIDAK langsung mengeksekusinya?",
        code: "const boundFunc = func.method(context);",
        options: [
          { id: "a", text: "call()" },
          { id: "b", text: "apply()" },
          { id: "c", text: "bind()" },
          { id: "d", text: "assign()" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 30,
        prompt:
          "Apa nama parameter untuk menangkap akses properti di object Proxy?",
        code: "const proxy = new Proxy({}, {\n  ____(target, prop) {}\n});",
        options: [
          { id: "a", text: "set" },
          { id: "b", text: "get" },
          { id: "c", text: "has" },
          { id: "d", text: "apply" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 31,
        prompt: "Berapa banyak key yang terbaca oleh Reflect.ownKeys?",
        code: "const sym = Symbol('a');\nconst obj = { a: 1, [sym]: 2 };\nconsole.log(Reflect.ownKeys(obj).length);",
        options: [
          { id: "a", text: "1" },
          { id: "b", text: "2" },
          { id: "c", text: "0" },
          { id: "d", text: "undefined" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 32,
        prompt: "Karakter unik apa yang membedakan Generator function?",
        code: "function* generate() { yield 1; }",
        options: [
          { id: "a", text: "async" },
          { id: "b", text: "await" },
          { id: "c", text: "Asterisk (*)" },
          { id: "d", text: "Arrow (=>)" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 33,
        prompt: "Tipe data apa saja yang BISA menjadi key di WeakMap?",
        code: "const wm = new WeakMap();\nwm.set(?, 'value');",
        options: [
          { id: "a", text: "String" },
          { id: "b", text: "Number" },
          { id: "c", text: "Object" },
          { id: "d", text: "Symbol" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 34,
        prompt: "Tipe data ES2020 yang mampu menyimpan angka sangat besar?",
        code: "const bigNum = 9007199254740991n;",
        options: [
          { id: "a", text: "SuperNumber" },
          { id: "b", text: "BigInt" },
          { id: "c", text: "Long" },
          { id: "d", text: "Double" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 35,
        prompt: "Apa output dari key coercion object ini?",
        code: "const a = {}, b = {k:'1'}, c = {k:'2'};\na[b] = 1; a[c] = 2;\nconsole.log(a[b]);",
        options: [
          { id: "a", text: "1" },
          { id: "b", text: "2" },
          { id: "c", text: "undefined" },
          { id: "d", text: "SyntaxError" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 36,
        prompt: "Apa hasil konversi JSON.stringify untuk array ini?",
        code: "JSON.stringify([1, undefined, function(){}]);",
        options: [
          { id: "a", text: '"[1, null, null]"' },
          { id: "b", text: '"[1, undefined, function(){}]"' },
          { id: "c", text: '"[1]"' },
          { id: "d", text: "Error" },
        ],
        correctOptionId: "a",
        points: 25,
      },
      {
        order: 37,
        prompt: "Apa metode untuk menghentikan eksekusi event pada DOM?",
        code: "event.______();",
        options: [
          { id: "a", text: "preventDefault()" },
          { id: "b", text: "stopPropagation()" },
          { id: "c", text: "halt()" },
          { id: "d", text: "cancelBubble()" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 38,
        prompt: "Bagaimana cara mengecek properti asli pada object?",
        code: "obj.____('key');",
        options: [
          { id: "a", text: "includes()" },
          { id: "b", text: "contains()" },
          { id: "c", text: "hasOwnProperty()" },
          { id: "d", text: "keys()" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 39,
        prompt: "Pada floating-point math, apakah hasil ekpresi berikut?",
        code: "console.log(0.1 + 0.2 === 0.3);",
        options: [
          { id: "a", text: "true" },
          { id: "b", text: "false" },
          { id: "c", text: "undefined" },
          { id: "d", text: "NaN" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 40,
        prompt: "Fungsi bawaan yang mengeksekusi string sebagai kode?",
        code: "____('2 + 2'); // Returns 4",
        options: [
          { id: "a", text: "execute()" },
          { id: "b", text: "run()" },
          { id: "c", text: "eval()" },
          { id: "d", text: "parse()" },
        ],
        correctOptionId: "c",
        points: 30,
      },
    ],
  },

  // soal node js
  {
    id: "NodeJs",
    title: "Node.js Backend Development",
    description: "Lorem ipsum dolor sit amet",
    icon: "nodeJs.png",
    percent: 0,
    questions: [
      {
        order: 1,
        prompt: "Apa itu Node.js?",
        code: "",
        options: [
          { id: "a", text: "Framework JavaScript untuk Frontend" },
          {
            id: "b",
            text: "JavaScript runtime yang dibangun di atas engine V8 Google Chrome",
          },
          { id: "c", text: "Bahasa pemrograman baru berbasis C++" },
          { id: "d", text: "Database NoSQL" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 2,
        prompt:
          "Perintah apa yang digunakan untuk menjalankan file JavaScript di Node.js?",
        code: "$ ____ app.js",
        options: [
          { id: "a", text: "node" },
          { id: "b", text: "run" },
          { id: "c", text: "start" },
          { id: "d", text: "js" },
        ],
        correctOptionId: "a",
        points: 5,
      },
      {
        order: 3,
        prompt:
          "Objek global apa yang digunakan di Node.js sebagai pengganti 'window' di browser?",
        code: "console.log(____);",
        options: [
          { id: "a", text: "document" },
          { id: "b", text: "global" },
          { id: "c", text: "environment" },
          { id: "d", text: "process" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 4,
        prompt: "Bagaimana cara mengimpor modul bawaan di lingkungan CommonJS?",
        code: "const fs = ____('fs');",
        options: [
          { id: "a", text: "import" },
          { id: "b", text: "load" },
          { id: "c", text: "require" },
          { id: "d", text: "include" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 5,
        prompt:
          "Variabel apa yang menyimpan path absolut dari direktori file saat ini?",
        code: "console.log(____);",
        options: [
          { id: "a", text: "__filename" },
          { id: "b", text: "__dirname" },
          { id: "c", text: "process.cwd()" },
          { id: "d", text: "path.dir()" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 6,
        prompt:
          "File apa yang menyimpan daftar dependencies dari sebuah project Node.js?",
        code: "",
        options: [
          { id: "a", text: "node_modules.json" },
          { id: "b", text: "config.js" },
          { id: "c", text: "manifest.json" },
          { id: "d", text: "package.json" },
        ],
        correctOptionId: "d",
        points: 5,
      },
      {
        order: 7,
        prompt: "Bagaimana cara mengekspor fungsi di Node.js (CommonJS)?",
        code: "function sayHi() {}\n____ = sayHi;",
        options: [
          { id: "a", text: "export default" },
          { id: "b", text: "module.exports" },
          { id: "c", text: "exports.default" },
          { id: "d", text: "global.export" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 8,
        prompt:
          "Modul bawaan apa yang digunakan untuk membuat web server HTTP?",
        code: "const server = require('____').createServer();",
        options: [
          { id: "a", text: "web" },
          { id: "b", text: "tcp" },
          { id: "c", text: "http" },
          { id: "d", text: "url" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 9,
        prompt: "Karakteristik utama dari Node.js adalah?",
        code: "",
        options: [
          { id: "a", text: "Multi-threaded & Synchronous" },
          { id: "b", text: "Single-threaded & Non-blocking I/O" },
          { id: "c", text: "Multi-threaded & Blocking I/O" },
          { id: "d", text: "Single-threaded & Blocking I/O" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 10,
        prompt:
          "Modul bawaan apa yang digunakan untuk berinteraksi dengan file system?",
        code: "const fileSystem = require('____');",
        options: [
          { id: "a", text: "path" },
          { id: "b", text: "file" },
          { id: "c", text: "fs" },
          { id: "d", text: "os" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 11,
        prompt:
          "Metode mana yang membaca file secara synchronous (memblokir thread)?",
        code: "const data = fs.____('file.txt');",
        options: [
          { id: "a", text: "readFile()" },
          { id: "b", text: "read()" },
          { id: "c", text: "readFileSync()" },
          { id: "d", text: "readSync()" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 12,
        prompt: "Apa nama arsitektur callback standar di Node.js?",
        code: "fs.readFile('data.txt', (err, data) => {});",
        options: [
          { id: "a", text: "Data-first callback" },
          { id: "b", text: "Error-first callback" },
          { id: "c", text: "Promise-based callback" },
          { id: "d", text: "Event-driven callback" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 13,
        prompt:
          "Objek apa yang berisi argumen baris perintah (command line arguments)?",
        code: "console.log(____);",
        options: [
          { id: "a", text: "process.args" },
          { id: "b", text: "global.argv" },
          { id: "c", text: "process.argv" },
          { id: "d", text: "console.args" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 14,
        prompt:
          "Kelas apa yang digunakan untuk membuat, memicu, dan mendengarkan custom events?",
        code: "const EventEmitter = require('events');\nconst myEmitter = new ____();",
        options: [
          { id: "a", text: "EventTarget" },
          { id: "b", text: "EventEmitter" },
          { id: "c", text: "EventHandler" },
          { id: "d", text: "EventDispatcher" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 15,
        prompt:
          "Event apa yang dipicu ketika Readable Stream menerima potongan data baru?",
        code: "readStream.on('____', (chunk) => {});",
        options: [
          { id: "a", text: "chunk" },
          { id: "b", text: "read" },
          { id: "c", text: "data" },
          { id: "d", text: "stream" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 16,
        prompt:
          "Metode apa yang menyambungkan output dari Readable stream langsung ke Writable stream?",
        code: "readableStream.____(writableStream);",
        options: [
          { id: "a", text: "connect()" },
          { id: "b", text: "link()" },
          { id: "c", text: "pipe()" },
          { id: "d", text: "writeTo()" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 17,
        prompt:
          "Modul Node.js apa yang digunakan untuk menggabungkan dan memanipulasi string direktori?",
        code: "const fullPath = ____.join(__dirname, 'public');",
        options: [
          { id: "a", text: "url" },
          { id: "b", text: "fs" },
          { id: "c", text: "dir" },
          { id: "d", text: "path" },
        ],
        correctOptionId: "d",
        points: 15,
      },
      {
        order: 18,
        prompt:
          "Jika Anda menggunakan Express.js, bagaimana cara membuat route GET dasar?",
        code: "app.____('/api', (req, res) => {});",
        options: [
          { id: "a", text: "get" },
          { id: "b", text: "route" },
          { id: "c", text: "fetch" },
          { id: "d", text: "receive" },
        ],
        correctOptionId: "a",
        points: 15,
      },
      {
        order: 19,
        prompt:
          "Bagaimana cara terbaik untuk membaca environment variables di Node.js?",
        code: "const port = ____.PORT || 3000;",
        options: [
          { id: "a", text: "global.env" },
          { id: "b", text: "process.env" },
          { id: "c", text: "process.environment" },
          { id: "d", text: "window.env" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 20,
        prompt:
          "Apa tipe scope dari variabel var yang dideklarasikan di file utama modul Node.js?",
        code: "var myVar = 10;",
        options: [
          { id: "a", text: "Global Scope" },
          { id: "b", text: "Module Scope (Lokal ke file tersebut)" },
          { id: "c", text: "Block Scope" },
          { id: "d", text: "Window Scope" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 21,
        prompt:
          "Struktur data apa yang digunakan Node.js untuk merepresentasikan memori raw biner?",
        code: "const buf = ____.from('Hello');",
        options: [
          { id: "a", text: "ArrayBuffer" },
          { id: "b", text: "Binary" },
          { id: "c", text: "Buffer" },
          { id: "d", text: "Blob" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 22,
        prompt:
          "Apa nama perpustakaan C++ yang menangani Event Loop dan I/O Asynchronous di Node.js?",
        code: "",
        options: [
          { id: "a", text: "V8 Engine" },
          { id: "b", text: "libuv" },
          { id: "c", text: "c-ares" },
          { id: "d", text: "OpenSSL" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 23,
        prompt:
          "Modul bawaan apa yang menyediakan fungsionalitas hashing dan enkripsi?",
        code: "const hash = ____.createHash('sha256');",
        options: [
          { id: "a", text: "bcrypt" },
          { id: "b", text: "security" },
          { id: "c", text: "crypto" },
          { id: "d", text: "hash" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 24,
        prompt:
          "Modul apa yang digunakan untuk mengeksekusi proses sistem operasi lain dari dalam Node.js?",
        code: "const { exec } = require('____');",
        options: [
          { id: "a", text: "os" },
          { id: "b", text: "sys" },
          { id: "c", text: "process" },
          { id: "d", text: "child_process" },
        ],
        correctOptionId: "d",
        points: 15,
      },
      {
        order: 25,
        prompt:
          "Fase mana dari Event Loop yang mengeksekusi callback setTimeout() dan setInterval()?",
        code: "setTimeout(() => console.log('Hi'), 100);",
        options: [
          { id: "a", text: "Poll phase" },
          { id: "b", text: "Timers phase" },
          { id: "c", text: "Check phase" },
          { id: "d", text: "Pending callbacks phase" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 26,
        prompt: "Mana yang dieksekusi lebih dulu oleh Event Loop?",
        code: "Promise.resolve().then(cb);\nprocess.nextTick(cb);",
        options: [
          { id: "a", text: "Keduanya bersamaan" },
          { id: "b", text: "Promise microtask" },
          { id: "c", text: "process.nextTick" },
          { id: "d", text: "Tergantung sistem operasi" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 27,
        prompt:
          "Event apa yang harus di-listen untuk menangkap error fatal yang membuat aplikasi crash?",
        code: "process.on('____', (err) => {});",
        options: [
          { id: "a", text: "fatalError" },
          { id: "b", text: "uncaughtException" },
          { id: "c", text: "unhandledRejection" },
          { id: "d", text: "exit" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 28,
        prompt:
          "Modul apa yang memberikan informasi tentang memori RAM dan jumlah core CPU server?",
        code: "const cpus = require('____').cpus();",
        options: [
          { id: "a", text: "os" },
          { id: "b", text: "hardware" },
          { id: "c", text: "system" },
          { id: "d", text: "v8" },
        ],
        correctOptionId: "a",
        points: 20,
      },
      {
        order: 29,
        prompt:
          "Tipe stream apa yang berfungsi sebagai Readable dan Writable sekaligus (contoh: socket TCP)?",
        code: "",
        options: [
          { id: "a", text: "Biplex Stream" },
          { id: "b", text: "Dual Stream" },
          { id: "c", text: "Duplex Stream" },
          { id: "d", text: "Parallel Stream" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 30,
        prompt: "Apa itu REPL di Node.js?",
        code: "",
        options: [
          { id: "a", text: "Read Eval Print Loop (Interactive Shell)" },
          { id: "b", text: "Runtime Engine Processing Language" },
          { id: "c", text: "Regular Expression Parser Logic" },
          { id: "d", text: "Request Event Pipeline Loop" },
        ],
        correctOptionId: "a",
        points: 20,
      },
      {
        order: 31,
        prompt:
          "Modul apa yang digunakan untuk melakukan forking proses Node.js guna memanfaatkan CPU multi-core?",
        code: "const ____ = require('____');\nif (____.isPrimary) { /* fork workers */ }",
        options: [
          { id: "a", text: "worker_threads" },
          { id: "b", text: "cluster" },
          { id: "c", text: "multiprocessing" },
          { id: "d", text: "threads" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 32,
        prompt:
          "Jika membutuhkan eksekusi multi-threading ringan dengan memori bersama, apa yang harus digunakan?",
        code: "const { Worker } = require('____');",
        options: [
          { id: "a", text: "cluster" },
          { id: "b", text: "child_process" },
          { id: "c", text: "worker_threads" },
          { id: "d", text: "web_workers" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 33,
        prompt:
          "Di dalam metrik process.memoryUsage(), apa yang dimaksud dengan 'rss'?",
        code: "console.log(process.memoryUsage().rss);",
        options: [
          { id: "a", text: "Real System Storage" },
          { id: "b", text: "Resident Set Size (Total RAM yang dialokasikan)" },
          { id: "c", text: "Random Stack Size" },
          { id: "d", text: "Runtime Script Space" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 34,
        prompt:
          "Bagaimana urutan eksekusi callback pada fase Check di Event Loop?",
        code: "____(() => console.log('Check Phase'));",
        options: [
          { id: "a", text: "setTimeout(cb, 0)" },
          { id: "b", text: "process.nextTick(cb)" },
          { id: "c", text: "setImmediate(cb)" },
          { id: "d", text: "setInterval(cb, 0)" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 35,
        prompt:
          "Pada stream, class apa yang Anda extend untuk memodifikasi data yang masuk sebelum mengeluarkannya?",
        code: "const { ____ } = require('stream');",
        options: [
          { id: "a", text: "Transform" },
          { id: "b", text: "Modifier" },
          { id: "c", text: "Duplex" },
          { id: "d", text: "Middleware" },
        ],
        correctOptionId: "a",
        points: 25,
      },
      {
        order: 36,
        prompt:
          "Peralatan (tool) apa yang digunakan untuk mengkompilasi Native Addons (C/C++) agar dapat berjalan di Node.js?",
        code: "",
        options: [
          { id: "a", text: "make" },
          { id: "b", text: "node-gyp" },
          { id: "c", text: "gcc" },
          { id: "d", text: "cmake" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 37,
        prompt: "Apa itu N-API (Node-API)?",
        code: "",
        options: [
          { id: "a", text: "API untuk memanggil modul Node.js dari browser" },
          {
            id: "b",
            text: "API stabil untuk membangun Native Addons lintas versi Node.js",
          },
          { id: "c", text: "Package manager alternatif untuk Node" },
          { id: "d", text: "Framework REST API bawaan Node" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 38,
        prompt:
          "Bagaimana cara menutup server HTTP dengan mulus (graceful shutdown) agar koneksi yang ada diselesaikan dulu?",
        code: "const server = http.createServer();\nserver.____();",
        options: [
          { id: "a", text: "stop()" },
          { id: "b", text: "kill()" },
          { id: "c", text: "close()" },
          { id: "d", text: "terminate()" },
        ],
        correctOptionId: "c",
        points: 30,
      },
      {
        order: 39,
        prompt:
          "Di V8 Engine Node.js, teknik utama yang digunakan untuk Garbage Collection adalah?",
        code: "",
        options: [
          { id: "a", text: "Reference Counting" },
          { id: "b", text: "Manual Deallocation" },
          {
            id: "c",
            text: "Generational Garbage Collection (Scavenger & Mark-Sweep)",
          },
          { id: "d", text: "Automatic Arc" },
        ],
        correctOptionId: "c",
        points: 30,
      },
      {
        order: 40,
        prompt:
          "Apa yang terjadi jika Anda menumpuk sinkronisasi file baca/tulis yang berat di dalam sebuah handler rute Express?",
        code: "app.get('/', (req, res) => {\n  fs.readFileSync('huge.zip');\n});",
        options: [
          {
            id: "a",
            text: "Event Loop akan terblokir, menghentikan seluruh request lain",
          },
          { id: "b", text: "Node.js otomatis mengalihkannya ke Worker Thread" },
          { id: "c", text: "Express akan mengabaikan fungsi tersebut" },
          { id: "d", text: "Libuv membaginya menjadi chunk asinkron" },
        ],
        correctOptionId: "a",
        points: 30,
      },
    ],
  },

  // soal react js
  {
    id: "reactjs",
    title: "React Js",
    description: "Lorem ipsum dolor sit amet",
    icon: "reactJs.png",
    percent: 0,
    questions: [
      {
        order: 1,
        prompt: "Apa itu React?",
        code: "",
        options: [
          { id: "a", text: "Framework MVC lengkap untuk JavaScript" },
          {
            id: "b",
            text: "Library JavaScript untuk membangun antarmuka pengguna (UI)",
          },
          { id: "c", text: "Database relasional berbasis web" },
          { id: "d", text: "Bahasa pemrograman baru pengganti JavaScript" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 2,
        prompt: "Siapa perusahaan teknologi yang membuat dan mengelola React?",
        code: "",
        options: [
          { id: "a", text: "Google" },
          { id: "b", text: "Microsoft" },
          { id: "c", text: "Meta (Facebook)" },
          { id: "d", text: "Twitter" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 3,
        prompt: "Apa kepanjangan dan fungsi dari JSX?",
        code: "const element = <h1>Hello, world!</h1>;",
        options: [
          {
            id: "a",
            text: "JavaScript XML; ekstensi sintaks untuk menulis HTML di dalam JavaScript",
          },
          { id: "b", text: "Java Syntax Extension; compiler untuk Java" },
          { id: "c", text: "JSON XML; format transfer data baru" },
          { id: "d", text: "JavaScript XHR; metode fetch data" },
        ],
        correctOptionId: "a",
        points: 5,
      },
      {
        order: 4,
        prompt:
          "Bagaimana cara merender sebuah daftar (list) array ke dalam elemen React?",
        code: "const items = ['A', 'B', 'C'];\n// {items.____(item => <li key={item}>{item}</li>)}",
        options: [
          { id: "a", text: "forEach()" },
          { id: "b", text: "reduce()" },
          { id: "c", text: "map()" },
          { id: "d", text: "filter()" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 5,
        prompt:
          "Mengapa kita perlu memberikan prop 'key' saat merender daftar elemen?",
        code: "<li key={item.id}>{item.name}</li>",
        options: [
          { id: "a", text: "Agar styling CSS bisa diterapkan" },
          {
            id: "b",
            text: "Membantu React mengidentifikasi item mana yang berubah, ditambah, atau dihapus",
          },
          { id: "c", text: "Untuk mengenkripsi data di dalam list" },
          { id: "d", text: "Syarat wajib dari HTML5" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 6,
        prompt: "Apa itu Props dalam React?",
        code: '<MyComponent title="Hello" />',
        options: [
          {
            id: "a",
            text: "Data internal yang bisa diubah oleh komponen itu sendiri",
          },
          { id: "b", text: "Fungsi bawaan untuk animasi" },
          {
            id: "c",
            text: "Data read-only yang dikirimkan dari parent ke child component",
          },
          { id: "d", text: "Sistem routing bawaan React" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 7,
        prompt:
          "Hook apa yang digunakan untuk menambahkan state lokal pada functional component?",
        code: "const [count, setCount] = ____(0);",
        options: [
          { id: "a", text: "useContext" },
          { id: "b", text: "useReducer" },
          { id: "c", text: "useEffect" },
          { id: "d", text: "useState" },
        ],
        correctOptionId: "d",
        points: 5,
      },
      {
        order: 8,
        prompt: "Apa perbedaan utama antara State dan Props?",
        code: "",
        options: [
          { id: "a", text: "State dikirim dari luar, Props dikelola internal" },
          {
            id: "b",
            text: "State adalah mutable (bisa diubah) dari dalam komponen, Props adalah immutable (read-only)",
          },
          {
            id: "c",
            text: "State hanya untuk class component, Props untuk functional component",
          },
          { id: "d", text: "Tidak ada perbedaan, keduanya sama" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 9,
        prompt:
          "Bagaimana cara penulisan atribut event handling yang benar di React?",
        code: "",
        options: [
          { id: "a", text: 'onclick="handleClick()"' },
          { id: "b", text: "onClick={handleClick()}" },
          { id: "c", text: "onClick={handleClick}" },
          { id: "d", text: "on-click={handleClick}" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 10,
        prompt:
          "Bagaimana cara mencegah perilaku default browser (seperti reload halaman saat submit form) di React?",
        code: "function handleSubmit(e) {\n  ____;\n}",
        options: [
          { id: "a", text: "e.preventReload()" },
          { id: "b", text: "e.stopPropagation()" },
          { id: "c", text: "e.preventDefault()" },
          { id: "d", text: "return false;" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 11,
        prompt: "Sebuah komponen React wajib mengembalikan (return) apa?",
        code: "return (\n  <div />\n  <div /> // Error\n);",
        options: [
          { id: "a", text: "Maksimal dua elemen HTML parent" },
          {
            id: "b",
            text: "Satu buah parent element (atau Fragment) yang membungkus semuanya",
          },
          { id: "c", text: "Sebuah array string" },
          { id: "d", text: "Fungsi render" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 12,
        prompt: "Sintaks '<> ... </>' di React adalah singkatan dari?",
        code: "return (\n  <>\n    <h1>Judul</h1>\n  </>\n);",
        options: [
          { id: "a", text: "React.Empty" },
          { id: "b", text: "React.Fragment" },
          { id: "c", text: "React.Container" },
          { id: "d", text: "React.Wrapper" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 13,
        prompt:
          "Hook apa yang digunakan untuk menangani side-effects seperti fetch API atau DOM manipulation?",
        code: "____(() => {\n  document.title = 'Hello';\n}, []);",
        options: [
          { id: "a", text: "useMutation" },
          { id: "b", text: "useEffect" },
          { id: "c", text: "useState" },
          { id: "d", text: "useMemo" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 14,
        prompt:
          "Apa cara terpendek untuk melakukan conditional rendering jika kondisinya true?",
        code: "{ isLoggedIn ____ <UserProfile /> }",
        options: [
          { id: "a", text: "&&" },
          { id: "b", text: "||" },
          { id: "c", text: "?" },
          { id: "d", text: "?? " },
        ],
        correctOptionId: "a",
        points: 10,
      },
      {
        order: 15,
        prompt: "Mana yang merupakan aturan mutlak dalam pemanggilan Hooks?",
        code: "",
        options: [
          { id: "a", text: "Boleh dipanggil di dalam statement 'if'" },
          {
            id: "b",
            text: "Hanya boleh dipanggil di top-level dari functional component atau custom hook",
          },
          { id: "c", text: "Boleh dipanggil di dalam class component" },
          { id: "d", text: "Harus dipanggil setelah statement return" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 16,
        prompt:
          "Bagaimana cara menambahkan item baru ke state array tanpa memutasi array lama?",
        code: "const [list, setList] = useState([1, 2]);\nsetList(____);",
        options: [
          { id: "a", text: "list.push(3)" },
          { id: "b", text: "list.append(3)" },
          { id: "c", text: "[...list, 3]" },
          { id: "d", text: "list + [3]" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 17,
        prompt: "Apa arti dari array dependensi kosong '[]' pada useEffect?",
        code: "useEffect(() => { ... }, []);",
        options: [
          {
            id: "a",
            text: "Effect dijalankan setiap kali ada state yang berubah",
          },
          {
            id: "b",
            text: "Effect hanya dijalankan sekali setelah render pertama (mount)",
          },
          { id: "c", text: "Effect tidak akan pernah dijalankan" },
          { id: "d", text: "Effect dijalankan sebelum komponen di-mount" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 18,
        prompt: "Masalah apa yang coba diselesaikan oleh React Context API?",
        code: "",
        options: [
          { id: "a", text: "Kecepatan render lambat" },
          { id: "b", text: "Memperbaiki SEO" },
          {
            id: "c",
            text: "Props Drilling (mengirim props melewati banyak layer komponen)",
          },
          { id: "d", text: "Routing antar halaman" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 19,
        prompt:
          "Hook apa yang digunakan bersamaan dengan Context API untuk mengonsumsi data?",
        code: "const theme = ____(ThemeContext);",
        options: [
          { id: "a", text: "useReducer" },
          { id: "b", text: "useContext" },
          { id: "c", text: "useProvider" },
          { id: "d", text: "useState" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 20,
        prompt:
          "Pola apa yang memindahkan state ke komponen parent terdekat agar bisa di-share ke beberapa child?",
        code: "",
        options: [
          { id: "a", text: "Lifting State Up" },
          { id: "b", text: "Prop Drilling" },
          { id: "c", text: "State Hoisting" },
          { id: "d", text: "Context Bounding" },
        ],
        correctOptionId: "a",
        points: 15,
      },
      {
        order: 21,
        prompt:
          "Hook apa yang cocok untuk mengelola state kompleks dengan pola dispatch dan action?",
        code: "const [state, dispatch] = ____(reducer, initialState);",
        options: [
          { id: "a", text: "useState" },
          { id: "b", text: "useReducer" },
          { id: "c", text: "useContext" },
          { id: "d", text: "useMemo" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 22,
        prompt:
          "Hook apa yang menyimpan nilai referensi mutable yang tidak memicu re-render saat nilainya berubah?",
        code: "const inputRef = ____(null);\ninputRef.current.focus();",
        options: [
          { id: "a", text: "useState" },
          { id: "b", text: "useMemo" },
          { id: "c", text: "useRef" },
          { id: "d", text: "useCallback" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 23,
        prompt:
          "Hook apa yang digunakan untuk me-memoize (caching) sebuah FUNGSI agar tidak dibuat ulang tiap re-render?",
        code: "const memoizedCallback = ____(() => doSomething(a, b), [a, b]);",
        options: [
          { id: "a", text: "useMemo" },
          { id: "b", text: "useRef" },
          { id: "c", text: "useCallback" },
          { id: "d", text: "useReducer" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 24,
        prompt:
          "Hook apa yang digunakan untuk me-memoize (caching) HASIL KOMPUTASI berat?",
        code: "const expensiveResult = ____(() => computeExpensiveValue(a, b), [a, b]);",
        options: [
          { id: "a", text: "useMemo" },
          { id: "b", text: "useEffect" },
          { id: "c", text: "useCallback" },
          { id: "d", text: "useCalculation" },
        ],
        correctOptionId: "a",
        points: 15,
      },
      {
        order: 25,
        prompt:
          "Dalam Class Component, metode lifecycle mana yang dipanggil sesaat sebelum komponen dihancurkan?",
        code: "class MyComp extends React.Component {\n  ____() {\n    // cleanup\n  }\n}",
        options: [
          { id: "a", text: "componentDidMount" },
          { id: "b", text: "componentDidUpdate" },
          { id: "c", text: "componentWillUnmount" },
          { id: "d", text: "shouldComponentUpdate" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 26,
        prompt: "Apa itu Custom Hook di React?",
        code: "function useFetch(url) { ... }",
        options: [
          { id: "a", text: "Fungsi bawaan React yang tersembunyi" },
          {
            id: "b",
            text: "Fungsi JavaScript biasa yang namanya diawali 'use' dan memanggil Hook lain",
          },
          { id: "c", text: "Hook yang ditulis dalam bahasa C++" },
          {
            id: "d",
            text: "Class component yang tidak memiliki fungsi render",
          },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 27,
        prompt:
          'Teknik apa yang digunakan oleh komponen `<Route path="/" render={(props) => <Home {...props}/>} />`?',
        code: "",
        options: [
          { id: "a", text: "Higher-Order Component (HOC)" },
          { id: "b", text: "Render Props" },
          { id: "c", text: "Custom Hooks" },
          { id: "d", text: "Context API" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 28,
        prompt:
          "Sebuah fungsi yang menerima komponen dan mengembalikan komponen baru disebut?",
        code: "const EnhancedComponent = withRouter(MyComponent);",
        options: [
          { id: "a", text: "Render Props" },
          { id: "b", text: "Higher-Order Component (HOC)" },
          { id: "c", text: "Pure Component" },
          { id: "d", text: "Wrapper Hook" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 29,
        prompt:
          "Bagaimana cara mencegah functional component agar tidak re-render jika props-nya tidak berubah?",
        code: "const MyComp = ____(function MyComp(props) { ... });",
        options: [
          { id: "a", text: "React.Fragment" },
          { id: "b", text: "React.memo" },
          { id: "c", text: "React.Pure" },
          { id: "d", text: "React.lazy" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 30,
        prompt:
          "Fungsi apa yang digunakan bersama React.lazy untuk menampilkan UI fallback (seperti spinner) saat komponen diunduh?",
        code: "<____ fallback={<Spinner />}>\n  <LazyComponent />\n</____>",
        options: [
          { id: "a", text: "React.Fallback" },
          { id: "b", text: "React.Suspense" },
          { id: "c", text: "React.Await" },
          { id: "d", text: "React.Async" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 31,
        prompt:
          "Bagaimana cara paling aman mengupdate state yang bergantung pada state sebelumnya?",
        code: "const [count, setCount] = useState(0);",
        options: [
          { id: "a", text: "setCount(count + 1)" },
          { id: "b", text: "count = count + 1" },
          { id: "c", text: "setCount(prev => prev + 1)" },
          { id: "d", text: "setCount(this.state.count + 1)" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 32,
        prompt: "Apa kegunaan dari StrictMode di React?",
        code: "<React.StrictMode>\n  <App />\n</React.StrictMode>",
        options: [
          { id: "a", text: "Meningkatkan performa aplikasi di production" },
          {
            id: "b",
            text: "Highlight potensi masalah dengan merender komponen dua kali secara sengaja di mode development",
          },
          { id: "c", text: "Mencegah penggunaan library pihak ketiga" },
          { id: "d", text: "Mengubah kode JavaScript menjadi TypeScript" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 33,
        prompt: "Apa itu Virtual DOM di React?",
        code: "",
        options: [
          { id: "a", text: "Browser plugin untuk merender elemen" },
          { id: "b", text: "Representasi in-memory yang ringan dari Real DOM" },
          { id: "c", text: "Server yang menyimpan elemen HTML" },
          { id: "d", text: "Metode untuk bypass CSS" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 34,
        prompt:
          "Apa nama proses di mana React membandingkan Virtual DOM lama dengan yang baru untuk mencari perubahan?",
        code: "",
        options: [
          { id: "a", text: "Diffing / Reconciliation" },
          { id: "b", text: "Transpilation" },
          { id: "c", text: "Hydration" },
          { id: "d", text: "Memoization" },
        ],
        correctOptionId: "a",
        points: 25,
      },
      {
        order: 35,
        prompt:
          "Apa nama arsitektur core engine React yang diperkenalkan di React 16 untuk memecah rendering menjadi chunk yang bisa diinterupsi?",
        code: "",
        options: [
          { id: "a", text: "React Flux" },
          { id: "b", text: "React Fiber" },
          { id: "c", text: "React DOM" },
          { id: "d", text: "React Concurrent" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 36,
        prompt:
          "Hook apa yang mirip dengan useEffect, namun dipanggil secara sinkron setelah semua mutasi DOM tetapi SEBELUM browser melakukan painting?",
        code: "",
        options: [
          { id: "a", text: "useMutationEffect" },
          { id: "b", text: "useLayoutEffect" },
          { id: "c", text: "useSyncEffect" },
          { id: "d", text: "useDOMEffect" },
        ],
        correctOptionId: "b",
        points: 30,
      },
      {
        order: 37,
        prompt: "Dalam konteks React 18+, apa fungsi dari metode createRoot()?",
        code: "import { createRoot } from 'react-dom/client';\nconst root = ____(document.getElementById('root'));",
        options: [
          { id: "a", text: "Membaca state Redux" },
          {
            id: "b",
            text: "Mengaktifkan fitur Concurrent Mode (seperti batching otomatis) pada entry point aplikasi",
          },
          {
            id: "c",
            text: "Mengganti fungsi ReactDOM.renderToString untuk SSR",
          },
          { id: "d", text: "Membuat komponen root virtual" },
        ],
        correctOptionId: "b",
        points: 30,
      },
      {
        order: 38,
        prompt:
          "Hook apa yang digunakan di React 18 untuk menandai update state sebagai prioritas rendah (non-urgent) agar UI tetap responsif?",
        code: "const [isPending, startTransition] = ____();",
        options: [
          { id: "a", text: "useTransition" },
          { id: "b", text: "useDeferredValue" },
          { id: "c", text: "useAsyncState" },
          { id: "d", text: "usePriority" },
        ],
        correctOptionId: "a",
        points: 30,
      },
      {
        order: 39,
        prompt: "Apa itu Hydration di ekosistem React (seperti Next.js)?",
        code: "",
        options: [
          { id: "a", text: "Menghapus event listener yang tidak terpakai" },
          {
            id: "b",
            text: "Proses menempelkan event handler JavaScript ke struktur HTML statis hasil render server (SSR)",
          },
          { id: "c", text: "Menerjemahkan JSX ke JavaScript murni" },
          { id: "d", text: "Menyimpan state lokal ke localStorage" },
        ],
        correctOptionId: "b",
        points: 30,
      },
      {
        order: 40,
        prompt:
          "Apa keuntungan utama dari React Server Components (RSC) yang baru diperkenalkan?",
        code: "",
        options: [
          {
            id: "a",
            text: "Kode dirender hanya di server dan bundle JavaScript komponen tersebut TIDAK dikirim ke client",
          },
          { id: "b", text: "Bisa menggunakan useReducer di server" },
          { id: "c", text: "Mematikan fungsi backend Node.js selamanya" },
          {
            id: "d",
            text: "Komponen secara otomatis tersimpan di Redis cache",
          },
        ],
        correctOptionId: "a",
        points: 30,
      },
    ],
  },

  // soal react Native
  {
    id: "reactNative",
    title: "React Native",
    description: "Lorem ipsum dolor sit amet",
    icon: "reactNative.png",
    percent: 0,
    questions: [
      {
        order: 1,
        prompt: "Apa perbedaan utama antara React.js dan React Native?",
        code: "",
        options: [
          {
            id: "a",
            text: "React Native menggunakan bahasa C++ untuk logika UI",
          },
          {
            id: "b",
            text: "React Native merender komponen native (seperti iOS UIView) alih-alih elemen HTML DOM",
          },
          {
            id: "c",
            text: "React Native tidak menggunakan komponen berbasis function",
          },
          {
            id: "d",
            text: "React.js hanya untuk Android, React Native untuk iOS",
          },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 2,
        prompt:
          "Komponen inti apa di React Native yang setara dengan tag <div> di HTML?",
        code: "import { ____ } from 'react-native';",
        options: [
          { id: "a", text: "Container" },
          { id: "b", text: "Section" },
          { id: "c", text: "View" },
          { id: "d", text: "Box" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 3,
        prompt:
          "Komponen apa yang wajib digunakan untuk menampilkan teks di React Native?",
        code: "return <____>Hello World</____>;",
        options: [
          { id: "a", text: "Span" },
          { id: "b", text: "String" },
          { id: "c", text: "Text" },
          { id: "d", text: "Paragraph" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 4,
        prompt:
          "Bagaimana cara yang paling direkomendasikan untuk menerapkan styling di React Native?",
        code: "const styles = ____.create({ container: { flex: 1 } });",
        options: [
          { id: "a", text: "StyleSheet" },
          { id: "b", text: "CSSModule" },
          { id: "c", text: "StyledComponents" },
          { id: "d", text: "ThemeManager" },
        ],
        correctOptionId: "a",
        points: 5,
      },
      {
        order: 5,
        prompt:
          "Apa nilai default dari properti flexDirection di React Native?",
        code: "container: { flexDirection: '____' }",
        options: [
          { id: "a", text: "row" },
          { id: "b", text: "column" },
          { id: "c", text: "row-reverse" },
          { id: "d", text: "column-reverse" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 6,
        prompt:
          "Komponen apa yang digunakan untuk membuat area yang bisa di-scroll ketika konten melebihi ukuran layar?",
        code: "",
        options: [
          { id: "a", text: "ScrollArea" },
          { id: "b", text: "ListView" },
          { id: "c", text: "ScrollView" },
          { id: "d", text: "OverflowView" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 7,
        prompt:
          "Komponen dasar apa yang digunakan untuk menerima input teks dari pengguna?",
        code: "",
        options: [
          { id: "a", text: "Input" },
          { id: "b", text: "TextField" },
          { id: "c", text: "TextInput" },
          { id: "d", text: "FormInput" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 8,
        prompt:
          "Apa event handler yang dipanggil ketika nilai di dalam TextInput berubah?",
        code: "<TextInput ____={text => setText(text)} />",
        options: [
          { id: "a", text: "onChange" },
          { id: "b", text: "onUpdate" },
          { id: "c", text: "onChangeText" },
          { id: "d", text: "onInput" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 9,
        prompt:
          "Bagaimana cara memuat gambar dari URL eksternal menggunakan komponen Image?",
        code: "<Image ____={{ uri: 'https://...' }} />",
        options: [
          { id: "a", text: "src" },
          { id: "b", text: "source" },
          { id: "c", text: "href" },
          { id: "d", text: "url" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 10,
        prompt:
          "Komponen apa yang digunakan untuk merender daftar panjang (long list) secara efisien dengan teknik lazy loading?",
        code: "",
        options: [
          { id: "a", text: "ScrollView" },
          { id: "b", text: "FlatList" },
          { id: "c", text: "ListRender" },
          { id: "d", text: "RecyclerList" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 11,
        prompt:
          "Prop apa pada FlatList yang digunakan untuk mendefinisikan tampilan tiap item di dalam array?",
        code: "<FlatList data={data} ____={({item}) => <MyItem item={item} />} />",
        options: [
          { id: "a", text: "renderComponent" },
          { id: "b", text: "renderRow" },
          { id: "c", text: "renderItem" },
          { id: "d", text: "itemTemplate" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 12,
        prompt:
          "Prop apa pada FlatList yang bertugas memberikan ID unik untuk setiap item?",
        code: "<FlatList ____={(item) => item.id} />",
        options: [
          { id: "a", text: "keyExtractor" },
          { id: "b", text: "idProvider" },
          { id: "c", text: "itemKey" },
          { id: "d", text: "extractId" },
        ],
        correctOptionId: "a",
        points: 10,
      },
      {
        order: 13,
        prompt:
          "Apa nama tombol dasar di React Native yang memberikan efek redup (opacity turun) saat ditekan?",
        code: "",
        options: [
          { id: "a", text: "Button" },
          { id: "b", text: "Pressable" },
          { id: "c", text: "TouchableOpacity" },
          { id: "d", text: "TouchableHighlight" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 14,
        prompt:
          "API apa yang disediakan React Native untuk mengeksekusi kode yang berbeda tergantung pada OS (iOS/Android)?",
        code: "import { ____ } from 'react-native';\nconst isIOS = ____.OS === 'ios';",
        options: [
          { id: "a", text: "System" },
          { id: "b", text: "Device" },
          { id: "c", text: "Platform" },
          { id: "d", text: "Environment" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 15,
        prompt:
          "Komponen apa yang digunakan untuk memastikan konten UI tidak tertutup oleh poni (notch) atau area status bar di iOS?",
        code: "",
        options: [
          { id: "a", text: "NotchView" },
          { id: "b", text: "SafeAreaView" },
          { id: "c", text: "PaddingView" },
          { id: "d", text: "WindowView" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 16,
        prompt:
          "Komponen apa yang mencegah virtual keyboard menutupi TextInput yang sedang difokuskan?",
        code: "",
        options: [
          { id: "a", text: "KeyboardAwareScrollView" },
          { id: "b", text: "KeyboardAvoidingView" },
          { id: "c", text: "SafeAreaInput" },
          { id: "d", text: "ScrollIntoView" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 17,
        prompt:
          "Library standar apa yang paling sering direkomendasikan untuk sistem navigasi di React Native?",
        code: "",
        options: [
          { id: "a", text: "React Router Native" },
          { id: "b", text: "React Native Navigation (Wix)" },
          { id: "c", text: "React Navigation" },
          { id: "d", text: "Expo Router" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 18,
        prompt:
          "Pada React Navigation, hook apa yang digunakan untuk mendapatkan objek navigasi di dalam komponen?",
        code: "const navigation = ____();",
        options: [
          { id: "a", text: "useRoute" },
          { id: "b", text: "useRouter" },
          { id: "c", text: "useNavigator" },
          { id: "d", text: "useNavigation" },
        ],
        correctOptionId: "d",
        points: 15,
      },
      {
        order: 19,
        prompt:
          "Bagaimana cara mengambil parameter yang dikirim antar layar menggunakan React Navigation?",
        code: "const route = useRoute();\nconst { itemId } = route.____;",
        options: [
          { id: "a", text: "data" },
          { id: "b", text: "params" },
          { id: "c", text: "args" },
          { id: "d", text: "payload" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 20,
        prompt: "Apa itu Expo dalam ekosistem React Native?",
        code: "",
        options: [
          { id: "a", text: "Bahasa pemrograman alternatif untuk RN" },
          { id: "b", text: "Database lokal untuk React Native" },
          {
            id: "c",
            text: "Framework dan platform untuk mempermudah pengembangan dan build aplikasi React Native",
          },
          { id: "d", text: "Library khusus untuk animasi 3D" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 21,
        prompt: "Apa fungsi dari React Native Fast Refresh?",
        code: "",
        options: [
          { id: "a", text: "Membersihkan cache aplikasi" },
          {
            id: "b",
            text: "Memperbarui UI di simulator/device secara instan tanpa kehilangan state saat kode disimpan",
          },
          { id: "c", text: "Meningkatkan FPS aplikasi hingga 60fps" },
          { id: "d", text: "Mereset ulang navigasi ke layar awal" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 22,
        prompt:
          "API apa yang digunakan untuk menampilkan dialog pop-up konfirmasi bawaan OS?",
        code: "____.alert('Judul', 'Pesan');",
        options: [
          { id: "a", text: "Dialog" },
          { id: "b", text: "Popup" },
          { id: "c", text: "Alert" },
          { id: "d", text: "Modal" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 23,
        prompt:
          "Bagaimana cara mengetahui apakah aplikasi sedang berjalan di background atau foreground?",
        code: "import { ____ } from 'react-native';\n____.addEventListener('change', ...);",
        options: [
          { id: "a", text: "AppStatus" },
          { id: "b", text: "AppState" },
          { id: "c", text: "SystemState" },
          { id: "d", text: "Process" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 24,
        prompt:
          "Hook apa yang bisa digunakan untuk mendapatkan lebar dan tinggi layar secara responsif?",
        code: "const { width, height } = ____();",
        options: [
          { id: "a", text: "useScreenSize" },
          { id: "b", text: "useDimensions" },
          { id: "c", text: "useWindowDimensions" },
          { id: "d", text: "useViewport" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 25,
        prompt:
          "Apa nama JavaScript Engine yang dioptimalkan khusus oleh Meta untuk React Native agar start-up time lebih cepat?",
        code: "",
        options: [
          { id: "a", text: "V8" },
          { id: "b", text: "SpiderMonkey" },
          { id: "c", text: "JavaScriptCore (JSC)" },
          { id: "d", text: "Hermes" },
        ],
        correctOptionId: "d",
        points: 20,
      },
      {
        order: 26,
        prompt:
          "Apa nama bundler bawaan yang digunakan React Native untuk menyatukan (compile) file JavaScript?",
        code: "",
        options: [
          { id: "a", text: "Webpack" },
          { id: "b", text: "Rollup" },
          { id: "c", text: "Metro" },
          { id: "d", text: "Vite" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 27,
        prompt:
          "Library eksternal apa yang menjadi standar industri saat ini untuk membuat animasi yang berjalan mulus di UI thread (menghindari bridge)?",
        code: "import Animated from '____';",
        options: [
          { id: "a", text: "react-native-animatable" },
          { id: "b", text: "react-native-reanimated" },
          { id: "c", text: "react-spring" },
          { id: "d", text: "framer-motion" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 28,
        prompt:
          "Pada arsitektur lama React Native, bagaimana komunikasi antara JavaScript dan Native Modules terjadi?",
        code: "",
        options: [
          { id: "a", text: "Direct memory access" },
          { id: "b", text: "Synchronous function calls" },
          { id: "c", text: "Asynchronous JSON serialization lewat Bridge" },
          { id: "d", text: "Melalui WebAssembly" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 29,
        prompt:
          "Dalam Arsitektur Baru (New Architecture) React Native, apa kepanjangan dari JSI?",
        code: "",
        options: [
          { id: "a", text: "JavaScript Syntax Integration" },
          { id: "b", text: "JavaScript Interface" },
          { id: "c", text: "JSON Serialized Invocation" },
          { id: "d", text: "Java-Swift Interop" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 30,
        prompt:
          "Apa keuntungan utama menggunakan JSI dibandingkan The Bridge pada arsitektur lama?",
        code: "",
        options: [
          { id: "a", text: "Ukuran bundle lebih kecil" },
          {
            id: "b",
            text: "JavaScript memegang referensi ke objek C++ secara langsung, memungkinkan pemanggilan sinkron",
          },
          { id: "c", text: "Tidak perlu menulis kode native lagi" },
          { id: "d", text: "Otomatis mengkonversi UI menjadi HTML" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 31,
        prompt:
          "Apa nama sistem rendering UI C++ baru di React Native yang menggantikan sistem UI Manager lama?",
        code: "",
        options: [
          { id: "a", text: "Fabric" },
          { id: "b", text: "TurboUI" },
          { id: "c", text: "Canvas" },
          { id: "d", text: "Skia" },
        ],
        correctOptionId: "a",
        points: 25,
      },
      {
        order: 32,
        prompt: "Apa itu Turbo Modules di React Native?",
        code: "",
        options: [
          { id: "a", text: "Modul khusus untuk animasi 60fps" },
          { id: "b", text: "Modul untuk mempercepat download NPM" },
          {
            id: "c",
            text: "Evolusi dari Native Modules yang dimuat secara lazy (lazy-loaded) saat dibutuhkan saja",
          },
          { id: "d", text: "Framework backend untuk React Native" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 33,
        prompt:
          "Mengapa disarankan MENGHINDARI penggunaan arrow function anonim langsung pada prop 'renderItem' di FlatList?",
        code: "<FlatList renderItem={() => <MyItem />} />",
        options: [
          { id: "a", text: "Akan menyebabkan error syntax" },
          {
            id: "b",
            text: "Membuat fungsi baru setiap kali render, sehingga mencegah optimasi re-rendering (PureComponent/memo)",
          },
          { id: "c", text: "Arrow function tidak memiliki akses ke 'this'" },
          { id: "d", text: "Ukuran file aplikasi akan membengkak" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 34,
        prompt:
          "Apa library penyimpanan lokal berbasis C++ (via JSI) yang sangat cepat dan sering digunakan sebagai pengganti AsyncStorage?",
        code: "",
        options: [
          { id: "a", text: "react-native-sqlite" },
          { id: "b", text: "react-native-mmkv" },
          { id: "c", text: "realm-react" },
          { id: "d", text: "watermelondb" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 35,
        prompt:
          "Apa fitur Expo yang memungkinkan kamu memperbarui aplikasi di device pengguna tanpa melalui review Play Store/App Store?",
        code: "",
        options: [
          { id: "a", text: "Expo Build" },
          { id: "b", text: "Expo Push Notifications" },
          { id: "c", text: "Expo OTA (Over-The-Air) Updates" },
          { id: "d", text: "Expo Snack" },
        ],
        correctOptionId: "c",
        points: 30,
      },
      {
        order: 36,
        prompt:
          "Bagaimana cara menangani Deep Linking (membuka aplikasi dari URL web) di React Navigation?",
        code: "<NavigationContainer ____={linkingConfig}>",
        options: [
          { id: "a", text: "deepLink" },
          { id: "b", text: "linking" },
          { id: "c", text: "urls" },
          { id: "d", text: "routes" },
        ],
        correctOptionId: "b",
        points: 30,
      },
      {
        order: 37,
        prompt:
          "Jika ada proses JavaScript yang berat, apa metode terbaik untuk menghindari UI yang 'membeku' (freeze)?",
        code: "",
        options: [
          { id: "a", text: "Memindahkannya ke useEffect" },
          {
            id: "b",
            text: "Menjalankannya di background thread menggunakan library seperti react-native-multithreading atau memindahkannya ke native code",
          },
          { id: "c", text: "Menggunakan setTimeout dengan delay 0" },
          { id: "d", text: "Menggunakan useCallback" },
        ],
        correctOptionId: "b",
        points: 30,
      },
      {
        order: 38,
        prompt: "Apa peran 'Codegen' dalam New Architecture React Native?",
        code: "",
        options: [
          { id: "a", text: "Menerjemahkan JavaScript ke Java/Objective-C" },
          { id: "b", text: "Membuat boilerplate komponen React" },
          {
            id: "c",
            text: "Mengotomatiskan pembuatan antarmuka C++ yang menjamin type-safety antara JavaScript dan Native berdasarkan spesifikasi (Flow/TS)",
          },
          { id: "d", text: "Membuat file APK atau IPA secara otomatis" },
        ],
        correctOptionId: "c",
        points: 30,
      },
      {
        order: 39,
        prompt:
          "Tool profiling apa yang sangat disarankan oleh tim Meta untuk mendeteksi memory leak dan memonitor network di React Native?",
        code: "",
        options: [
          { id: "a", text: "Chrome DevTools" },
          { id: "b", text: "Flipper" },
          { id: "c", text: "Postman" },
          { id: "d", text: "Wireshark" },
        ],
        correctOptionId: "b",
        points: 30,
      },
      {
        order: 40,
        prompt:
          "Saat mengonfigurasi animasi menggunakan react-native-reanimated, hook apa yang digunakan untuk bereaksi terhadap perubahan gesture?",
        code: "const gestureHandler = ____({ onStart: () => {}, onActive: () => {} });",
        options: [
          { id: "a", text: "useAnimatedGestureHandler" },
          { id: "b", text: "useGesture" },
          { id: "c", text: "useAnimatedStyle" },
          { id: "d", text: "useSharedValue" },
        ],
        correctOptionId: "a",
        points: 30,
      },
    ],
  },

  // soal typescript
  {
    id: "typescript",
    title: "Typescript",
    description:
      "Tingkatkan keamanan dan keandalan kode JavaScript Anda dengan static typing menggunakan TypeScript.",
    icon: "typescript.png",
    percent: 0,
    questions: [
      {
        order: 1,
        prompt: "Apa itu TypeScript?",
        code: "",
        options: [
          { id: "a", text: "Framework untuk membuat UI" },
          {
            id: "b",
            text: "Superset dari JavaScript yang menambahkan static typing",
          },
          {
            id: "c",
            text: "Bahasa pemrograman yang menggantikan JavaScript sepenuhnya di browser",
          },
          { id: "d", text: "Database engine berbasis JavaScript" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 2,
        prompt:
          "Perintah apa yang digunakan untuk mengkompilasi file TypeScript (.ts) menjadi JavaScript (.js)?",
        code: "$ ____ app.ts",
        options: [
          { id: "a", text: "node" },
          { id: "b", text: "ts-node" },
          { id: "c", text: "tsc" },
          { id: "d", text: "compile" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 3,
        prompt:
          "Bagaimana cara mendeklarasikan variabel dengan tipe data string di TypeScript?",
        code: "let message____ = 'Hello';",
        options: [
          { id: "a", text: ":: string" },
          { id: "b", text: "-> string" },
          { id: "c", text: ": String" },
          { id: "d", text: ": string" },
        ],
        correctOptionId: "d",
        points: 5,
      },
      {
        order: 4,
        prompt:
          "Kemampuan TypeScript untuk menebak tipe data berdasarkan nilai yang diberikan disebut?",
        code: "let count = 10; // TypeScript tahu ini 'number'",
        options: [
          { id: "a", text: "Type Casting" },
          { id: "b", text: "Type Inference" },
          { id: "c", text: "Type Coercion" },
          { id: "d", text: "Type Assertion" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 5,
        prompt:
          "Tipe data apa yang mematikan pengecekan tipe (type checking) pada TypeScript?",
        code: "let value: ____ = 'hello';\nvalue = 42; // Tidak error",
        options: [
          { id: "a", text: "unknown" },
          { id: "b", text: "any" },
          { id: "c", text: "void" },
          { id: "d", text: "never" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 6,
        prompt:
          "Bagaimana cara mendefinisikan array yang berisi angka di TypeScript?",
        code: "let scores: ____ = [100, 90, 80];",
        options: [
          { id: "a", text: "Array" },
          { id: "b", text: "number[]" },
          { id: "c", text: "[]number" },
          { id: "d", text: "NumericArray" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 7,
        prompt:
          "Struktur data yang memungkinkan array dengan jumlah elemen dan tipe data yang sudah pasti disebut?",
        code: "let user: [number, string] = [1, 'John'];",
        options: [
          { id: "a", text: "Set" },
          { id: "b", text: "Enum" },
          { id: "c", text: "Tuple" },
          { id: "d", text: "Record" },
        ],
        correctOptionId: "c",
        points: 5,
      },
      {
        order: 8,
        prompt:
          "Bagaimana cara membuat sebuah properti menjadi opsional (tidak wajib) di dalam Interface?",
        code: "interface User {\n  name: string;\n  age____ number;\n}",
        options: [
          { id: "a", text: "age*: number" },
          { id: "b", text: "age?: number" },
          { id: "c", text: "age!: number" },
          { id: "d", text: "age: optional number" },
        ],
        correctOptionId: "b",
        points: 5,
      },
      {
        order: 9,
        prompt:
          "Tipe data yang digunakan untuk menyatakan fungsi yang tidak mengembalikan nilai adalah?",
        code: "function logMessage(msg: string): ____ { ... }",
        options: [
          { id: "a", text: "null" },
          { id: "b", text: "undefined" },
          { id: "c", text: "void" },
          { id: "d", text: "never" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 10,
        prompt:
          "Tipe data yang mewakili nilai yang tidak akan pernah terjadi (misalnya fungsi yang selalu melempar error) adalah?",
        code: "function throwError(): ____ {\n  throw new Error('Crash');\n}",
        options: [
          { id: "a", text: "void" },
          { id: "b", text: "never" },
          { id: "c", text: "error" },
          { id: "d", text: "unknown" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 11,
        prompt:
          "Bagaimana cara menyatakan bahwa sebuah variabel bisa bernilai string ATAU number?",
        code: "let id: ____;",
        options: [
          { id: "a", text: "string & number" },
          { id: "b", text: "string || number" },
          { id: "c", text: "string | number" },
          { id: "d", text: "string, number" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 12,
        prompt:
          "Apa nama tipe data yang menggabungkan beberapa tipe menjadi satu kesatuan (memiliki semua properti dari tipe yang digabung)?",
        code: "type AdminUser = User ____ Admin;",
        options: [
          { id: "a", text: "Union Type (|)" },
          { id: "b", text: "Intersection Type (&)" },
          { id: "c", text: "Combined Type (+)" },
          { id: "d", text: "Merged Type (&&)" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 13,
        prompt:
          "Keyword apa yang digunakan untuk membuat alias untuk sebuah tipe data?",
        code: "____ ID = string | number;",
        options: [
          { id: "a", text: "interface" },
          { id: "b", text: "type" },
          { id: "c", text: "alias" },
          { id: "d", text: "typedef" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 14,
        prompt:
          "Secara default, nilai numerik dari member pertama dalam sebuah Enum adalah?",
        code: "enum Direction { Up, Down, Left, Right }",
        options: [
          { id: "a", text: "1" },
          { id: "b", text: "0" },
          { id: "c", text: "undefined" },
          { id: "d", text: "-1" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 15,
        prompt:
          "Bagaimana cara meyakinkan compiler TypeScript tentang suatu tipe data, jika kita tahu lebih baik dari compiler? (Type Assertion)",
        code: "let myCanvas = document.getElementById('main') ____ HTMLCanvasElement;",
        options: [
          { id: "a", text: "is" },
          { id: "b", text: "like" },
          { id: "c", text: "as" },
          { id: "d", text: "to" },
        ],
        correctOptionId: "c",
        points: 10,
      },
      {
        order: 16,
        prompt:
          "Tanda apa yang digunakan sebagai Non-null Assertion Operator, untuk menjamin sebuah nilai tidak null atau undefined?",
        code: "const name = user.name____;",
        options: [
          { id: "a", text: "?" },
          { id: "b", text: "!" },
          { id: "c", text: "!!" },
          { id: "d", text: "??" },
        ],
        correctOptionId: "b",
        points: 10,
      },
      {
        order: 17,
        prompt: "Apa itu Generics di TypeScript?",
        code: "function identity<T>(arg: T): T { return arg; }",
        options: [
          { id: "a", text: "Fungsi bawaan untuk mengacak array" },
          {
            id: "b",
            text: "Tipe data khusus untuk object yang belum diinisialisasi",
          },
          {
            id: "c",
            text: "Cara membuat komponen/fungsi yang bisa bekerja dengan berbagai macam tipe data, dengan mempertahankan type-safety",
          },
          { id: "d", text: "Sintaks untuk mendeklarasikan kelas induk" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 18,
        prompt:
          "Access modifier apa yang membuat properti kelas hanya bisa diakses dari dalam kelas itu sendiri dan kelas turunannya (subclass)?",
        code: "class Animal { ____ name: string; }",
        options: [
          { id: "a", text: "public" },
          { id: "b", text: "private" },
          { id: "c", text: "protected" },
          { id: "d", text: "static" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 19,
        prompt:
          "Modifier apa yang membuat properti object tidak bisa diubah (immutable) setelah diinisialisasi?",
        code: "interface Point {\n  ____ x: number;\n}",
        options: [
          { id: "a", text: "const" },
          { id: "b", text: "readonly" },
          { id: "c", text: "static" },
          { id: "d", text: "final" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 20,
        prompt:
          "Class yang tidak bisa diinstansiasi secara langsung, melainkan harus di-extend oleh class lain disebut?",
        code: "____ class Base { }",
        options: [
          { id: "a", text: "virtual" },
          { id: "b", text: "interface" },
          { id: "c", text: "abstract" },
          { id: "d", text: "static" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 21,
        prompt:
          "Keyword apa yang digunakan oleh class untuk memenuhi kontrak dari sebuah Interface?",
        code: "class Car ____ Vehicle { }",
        options: [
          { id: "a", text: "extends" },
          { id: "b", text: "implements" },
          { id: "c", text: "uses" },
          { id: "d", text: "inherits" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 22,
        prompt:
          "Operator apa yang mengekstrak semua key dari sebuah tipe objek dan mengembalikannya sebagai Union Type dari string literal?",
        code: "type Keys = ____ User;",
        options: [
          { id: "a", text: "typeof" },
          { id: "b", text: "keyof" },
          { id: "c", text: "extract" },
          { id: "d", text: "keys" },
        ],
        correctOptionId: "b",
        points: 15,
      },
      {
        order: 23,
        prompt:
          "Operator apa yang digunakan untuk mendapatkan tipe data dari sebuah variabel yang sudah ada?",
        code: "let str = 'hello';\ntype StrType = ____ str;",
        options: [
          { id: "a", text: "typeof" },
          { id: "b", text: "keyof" },
          { id: "c", text: "type" },
          { id: "d", text: "instanceof" },
        ],
        correctOptionId: "a",
        points: 15,
      },
      {
        order: 24,
        prompt: "Dalam TypeScript, apa perbedaan utama 'unknown' dengan 'any'?",
        code: "let x: unknown;",
        options: [
          { id: "a", text: "Tidak ada perbedaan" },
          { id: "b", text: "'unknown' lebih tidak aman dari 'any'" },
          {
            id: "c",
            text: "Kita harus melakukan pengecekan tipe (type check) sebelum bisa menggunakan nilai dari variabel 'unknown'",
          },
          { id: "d", text: "'unknown' hanya digunakan untuk angka" },
        ],
        correctOptionId: "c",
        points: 15,
      },
      {
        order: 25,
        prompt:
          "Utility Type apa yang mengubah semua properti dari suatu tipe menjadi opsional?",
        code: "type OptionalUser = ____<User>;",
        options: [
          { id: "a", text: "Optional" },
          { id: "b", text: "Nullable" },
          { id: "c", text: "Partial" },
          { id: "d", text: "Pick" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 26,
        prompt:
          "Utility Type apa yang mengubah semua properti dari suatu tipe menjadi wajib (membuang operator '?')?",
        code: "type StrictUser = ____<User>;",
        options: [
          { id: "a", text: "Required" },
          { id: "b", text: "Mandatory" },
          { id: "c", text: "Strict" },
          { id: "d", text: "NonNullable" },
        ],
        correctOptionId: "a",
        points: 20,
      },
      {
        order: 27,
        prompt:
          "Utility Type apa yang digunakan untuk membuat objek dengan keys ber-tipe K dan values ber-tipe T?",
        code: "const map: ____<string, number> = { a: 1 };",
        options: [
          { id: "a", text: "Map" },
          { id: "b", text: "Dictionary" },
          { id: "c", text: "Record" },
          { id: "d", text: "Object" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 28,
        prompt:
          "Utility Type apa yang membuat tipe baru dengan MENGAMBIL properti tertentu saja dari suatu tipe?",
        code: "type NameOnly = ____<User, 'name'>;",
        options: [
          { id: "a", text: "Select" },
          { id: "b", text: "Extract" },
          { id: "c", text: "Omit" },
          { id: "d", text: "Pick" },
        ],
        correctOptionId: "d",
        points: 20,
      },
      {
        order: 29,
        prompt:
          "Utility Type apa yang membuat tipe baru dengan MEMBUANG properti tertentu dari suatu tipe?",
        code: "type WithoutPassword = ____<User, 'password'>;",
        options: [
          { id: "a", text: "Omit" },
          { id: "b", text: "Exclude" },
          { id: "c", text: "Drop" },
          { id: "d", text: "Remove" },
        ],
        correctOptionId: "a",
        points: 20,
      },
      {
        order: 30,
        prompt: "Apa perbedaan antara Exclude dan Omit?",
        code: "",
        options: [
          { id: "a", text: "Tidak ada perbedaan" },
          {
            id: "b",
            text: "Exclude bekerja pada Union Types, Omit bekerja pada Object Types",
          },
          {
            id: "c",
            text: "Exclude bekerja pada Object Types, Omit bekerja pada Union Types",
          },
          { id: "d", text: "Exclude adalah fitur ES6, Omit fitur TypeScript" },
        ],
        correctOptionId: "b",
        points: 20,
      },
      {
        order: 31,
        prompt:
          "Utility Type apa yang mengekstrak tipe kembalian (return type) dari sebuah fungsi?",
        code: "type Res = ____<typeof myFunc>;",
        options: [
          { id: "a", text: "FunctionType" },
          { id: "b", text: "Returns" },
          { id: "c", text: "ReturnType" },
          { id: "d", text: "ResultType" },
        ],
        correctOptionId: "c",
        points: 20,
      },
      {
        order: 32,
        prompt: "Bagaimana sintaks untuk Conditional Types di TypeScript?",
        code: "",
        options: [
          { id: "a", text: "T extends U ? X : Y" },
          { id: "b", text: "T if U then X else Y" },
          { id: "c", text: "T == U ? X : Y" },
          { id: "d", text: "if (T extends U) { X } else { Y }" },
        ],
        correctOptionId: "a",
        points: 20,
      },
      {
        order: 33,
        prompt:
          "Di dalam Conditional Types, keyword apa yang digunakan untuk mengekstrak dan menangkap tipe yang belum diketahui ke dalam sebuah variabel tipe?",
        code: "type Unpacked<T> = T extends (____ U)[] ? U : T;",
        options: [
          { id: "a", text: "extract" },
          { id: "b", text: "infer" },
          { id: "c", text: "assign" },
          { id: "d", text: "yield" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 34,
        prompt:
          "Sintaks `[P in keyof T]` merupakan ciri khas dari fitur lanjutan apa di TypeScript?",
        code: "type OptionsFlags<T> = {\n  [P in keyof T]: boolean;\n};",
        options: [
          { id: "a", text: "Mapped Types" },
          { id: "b", text: "Indexed Access Types" },
          { id: "c", text: "Conditional Types" },
          { id: "d", text: "Template Literal Types" },
        ],
        correctOptionId: "a",
        points: 25,
      },
      {
        order: 35,
        prompt:
          "Apa yang dilakukan oleh operator indeks `T[K]` (Indexed Access Type)?",
        code: "type Age = User['age'];",
        options: [
          { id: "a", text: "Mengubah nilai dari properti 'age'" },
          { id: "b", text: "Menghapus properti 'age' dari User" },
          {
            id: "c",
            text: "Mencari (lookup) tipe data dari properti tertentu pada suatu objek",
          },
          { id: "d", text: "Menginisialisasi array dengan ukuran K" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 36,
        prompt:
          "Teknik apa yang mengubah string/object literal menjadi tipe readonly paling ketat, mencegah pelebaran tipe (type widening)?",
        code: "const routes = { home: '/' } ____;",
        options: [
          { id: "a", text: "as readonly" },
          { id: "b", text: "as const" },
          { id: "c", text: "as strict" },
          { id: "d", text: "as literal" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 37,
        prompt:
          "Apa nama pola yang memungkinkan penyempitan tipe (type narrowing) secara otomatis di dalam scope percabangan?",
        code: "if (typeof val === 'string') {\n  // val dianggap string di sini\n}",
        options: [
          { id: "a", text: "Type Boxing" },
          { id: "b", text: "Type Guard" },
          { id: "c", text: "Type Casting" },
          { id: "d", text: "Type Safe" },
        ],
        correctOptionId: "b",
        points: 25,
      },
      {
        order: 38,
        prompt:
          "Fitur apa di TypeScript yang memungkinkan modifikasi perilaku class atau property saat deklarasi, ditandai dengan simbol '@'?",
        code: "____()\nclass MyClass {}",
        options: [
          { id: "a", text: "Annotations" },
          { id: "b", text: "Modifiers" },
          { id: "c", text: "Decorators" },
          { id: "d", text: "Mutators" },
        ],
        correctOptionId: "c",
        points: 25,
      },
      {
        order: 39,
        prompt:
          "Untuk membuat Custom Type Guard, tipe pengembalian (return type) fungsi apa yang digunakan?",
        code: "function isFish(pet: Fish | Bird): ____ {\n  return (pet as Fish).swim !== undefined;\n}",
        options: [
          { id: "a", text: "boolean" },
          { id: "b", text: "pet is Fish" },
          { id: "c", text: "asserts pet" },
          { id: "d", text: "type of Fish" },
        ],
        correctOptionId: "b",
        points: 30,
      },
      {
        order: 40,
        prompt:
          "Utility Type bawaan TypeScript `Parameters<T>` dibangun menggunakan fitur apa secara internal?",
        code: "type Parameters<T extends (...args: any) => any> = \n  T extends (...args: infer P) => any ? P : never;",
        options: [
          { id: "a", text: "Intersection Types" },
          { id: "b", text: "Mapped Types" },
          { id: "c", text: "Conditional Types dikombinasikan dengan 'infer'" },
          { id: "d", text: "Type Assertion" },
        ],
        correctOptionId: "c",
        points: 30,
      },
    ],
  },
];

async function seed() {
  for (const path of LEARNING_PATHS) {
    const { id, questions, ...pathData } = path;
    const pathRef = db.collection("learningPaths").doc(id);
    await pathRef.set(pathData);
    console.log(`learningPaths/${id} dibuat`);

    for (const q of questions) {
      const { order, ...qData } = q;
      await pathRef
        .collection("questions")
        .doc(`q${order}`)
        .set({ order, ...qData });
      console.log(`questions/q${order} dibuat`);
    }
  }

  console.log(
    "\nSelesai! Semua learning path & soal sudah masuk ke Firestore.",
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("Gagal seed data:", err);
  process.exit(1);
});
