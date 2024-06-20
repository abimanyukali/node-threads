const express = require('express');

const { Worker } = require('worker_threads');
const app = express();
const port = process.env.PORT || 5000;
const THREAD_COUNT = 6;

app.get('/non-blocking', (req, res) => {
  res.status(200).send('This page is non-blocking>>>>>>>');
});

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./six-workers.js', {
      workerData: { thread_count: THREAD_COUNT },
    });
    worker.on('message', (data) => {
      resolve(data);
    });

    worker.on('error', (error) => {
      reject(`An error occurred ${error}`);
    });
  });
}

app.get('/blocking', async (req, res) => {
  const workerPromise = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromise.push(createWorker());
  }
  const thread_result = await Promise.all(workerPromise);
  const total =
    thread_result[0] +
    thread_result[1] +
    thread_result[2] +
    thread_result[3] +
    thread_result[4] +
    thread_result[5] 
   
  res.status(200).send(`result  is ${total}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
