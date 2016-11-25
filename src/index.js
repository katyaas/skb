import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/task2a', async(req, res) => {
  try {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const sum =
      (req.query.a && !isNaN(a) ? a : 0) +
      (req.query.b && !isNaN(b) ? b : 0);
    res.send(`${sum}`);
  } catch (err) {
    console.log(err);
    return res.json({
      err
    });
  }
});
function capitalize(txt) {
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}

app.get('/task2b', async(req, res) => {
  try {
    const fullname = req.query.fullname || '';
    const re = new RegExp('^ *([^ 0-9_\/]*)?( *)?([^ 0-9_\/]*)?( *)?([^ 0-9_\/]*)?$', 'im');
    const parsed = fullname.match(re);
    console.log(fullname);
    console.log(parsed);
    if (!parsed) {
      return res.send('Invalid fullname');
    }
    if (parsed[1] && parsed[3] && parsed[5]) {
      return res.send(`${capitalize(parsed[5])} ${parsed[1].charAt(0).toUpperCase()}. ${parsed[3].charAt(0).toUpperCase()}.`);
    }
    if (parsed[1] && parsed[3]) {
      return res.send(`${capitalize(parsed[3])} ${parsed[1].charAt(0).toUpperCase()}.`);
    }
    if (parsed[1]) {
      return res.send(capitalize(parsed[1]));
    }
    res.send('Invalid fullname');
  } catch (err) {
    console.log(err);
    return res.json({
      err
    });
  }
});

import task2c from './task2c';
app.get('/task2c', async(req, res) => {
  try {
    const username = task2c(req.query.username);
    res.send(username);
  } catch (err) {
    console.log(err);
    return res.json({
      err
    });
  }
});

import {task2d, testTask2d} from './task2d';
app.get('/task2d', async(req, res) => {
  try {
    const color = task2d(req.query.color);
    res.send(color);
  } catch (err) {
    console.log(err);
    return res.json({
      err
    });
  }
});
app.get('/testTask2d', async(req, res) => {
  try {
    const testRes = testTask2d();
    res.send(testRes);
  } catch (err) {
    console.log(err);
    return res.json({
      err
    });
  }
});



import task3BRouter from './task3b';
app.use('/task3b', task3BRouter);


import task3CRoute from './task3c';
app.use('/task3c', task3CRoute);


import task3ARoute from './task3a';
app.use('/task3a', task3ARoute);


import task2XRoute from './task2x';
app.use('/task2x', task2XRoute);



app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
