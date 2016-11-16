import express from 'express';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

const task3ARouter = express.Router();

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async(res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });


task3ARouter.get('/', function (req, res) {
  console.log(pc);
  res.status(200).json(pc);
});

task3ARouter.get('/volumes', function (req, res) {
  let discSpace = {};
  _.map(pc.hdd, function (disc) {
    discSpace[disc.volume] =
      (discSpace[disc.volume] == undefined ? 0 : discSpace[disc.volume]) + disc.size;
  });
  for (let disc in discSpace) {
    if (discSpace.hasOwnProperty(disc)) {
      discSpace[disc] = discSpace[disc] + 'B';
    }
  }
  res.status(200).json(discSpace);
});

task3ARouter.get('/*', function (req, res) {
  const path = req.params[0].split('/');
  let result = pc;
  let status = 200;
  console.log(path);
  path.forEach(function (part) {
    if (part === '') {
      return;
    }
    if(result[part] === undefined || typeof result != 'object' || (Array.isArray(result) && part === 'length')) {
      status = 404;
      return;
    }
    result = result[part];
  });
  if (status === 404) {
    return res.status(status).send('Not Found');
  }
  return res.status(status).json(result);
});


export default task3ARouter;
