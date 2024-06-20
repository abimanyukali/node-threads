const { parentPort } = require('worker_threads');

let counter = 0;
for (let i = 0; i < 999999999999; i++) {
  counter++;
}
parentPort.postMessage(counter);
