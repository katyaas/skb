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


app.get('/task2b', async(req, res) => {
  try {
    const fullname = req.query.fullname || '';
    const re = new RegExp('^(.[^ 0-9]*)?( )?(.[^ 0-9]*)?( )?(.[^ 0-9]*)?$', 'im');
    const parsed = fullname.match(re);
    console.log(fullname);
    console.log(parsed);
    if (!parsed) {
      return res.send('Invalid fullname');
    }
    if (parsed[1] && parsed[3] && parsed[5]) {
      return res.send(`${parsed[5]} ${parsed[1].charAt(0)}. ${parsed[3].charAt(0)}.`);
    }
    if (parsed[1] && parsed[3]) {
      return res.send(`${parsed[3]} ${parsed[1].charAt(0)}.`);
    }
    if (parsed[1]) {
      return res.send(parsed[1]);
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


app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
