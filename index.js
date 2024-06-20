// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'abimanyucseboy@gmail.com',
//     pass: 'ehmpireyhrdlyrpp'
//   }
// });

// var mailOptions = {
//   from: 'abimanyucseboy@gmail.com',
//   to: 'abiabimanyu350@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

const express = require('express');
const { Worker } = require('worker_threads');
const app = express();
const port = process.env.PORT || 5000;
app.get('/non-blocking', (req, res) => {
  res.status(200).send('This page is non-blocking>>>>>>>');
});

app.get('/blocking', (req, res) => {
  const worker = new Worker('./worker.js');
  worker.on('message', (data) => {
    res.status(200).send(`result is ${data}`);
  });

  worker.on('error', (error) => {
    res.send(404).send(`An error occurred ${error}`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
