import express from 'express';

const task2XRouter = express.Router();

const data = [
  1,
  18,
  243,
  3240,
  43254,
  577368,
  7706988,
  102876480,
  1373243544,
  18330699168,
  244686773808,
  3266193870720,
  43598688377184,
  581975750199168,
  7768485393179328,
  103697388221736960,
  1384201395738071424,
  18476969736848122368,
  246639261965462754048,
  3292256598848819251200,
  43946585901564160587264
];

task2XRouter.get('/', async(req, res) => {
  console.log('get all');
  console.log(req.params);
  console.log(req.query);
  if (req.query.i && req.query.i >= 0  && req.query.i < 21) {
    return res.send(`${data[req.query.i]}`);
  }
  res.send("Something unexpected");
});

export default task2XRouter;
