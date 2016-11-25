import express from 'express';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import User from './user';
import Pet from './pet';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/task3b');

const task3BRouter = express.Router();

function isNum(n) {
  return !isNaN(parseInt(n)) && isFinite(n);
}

task3BRouter.get('/loadData', async(req, res) => {
  const petsUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';
  await User.remove({});
  await Pet.remove({});
  const result = await fetch(petsUrl);
  const data = await result.json();
  for (var index in data.users) {
    if (data.users.hasOwnProperty(index)) {
      const user = data.users[index];
      user.id = Number(user.id);
      user._id = user.id;
      console.log(user);
      const userDb = new User(user);
      await userDb.save();
    }
  }
  for (var petIdx in data.pets) {
    if (data.pets.hasOwnProperty(petIdx)) {
      const pet = data.pets[petIdx];
      pet.userId = Number(pet.userId);
      pet.user = Number(pet.userId);
      pet.id = Number(pet.id);
      pet._id = pet.id;
      const userPet = await User.findOne({id: pet.userId});
      userPet.pets.push(pet.id);
      await userPet.save();
      //const petData = Object.assign({}, pet, {owner: userPet._id});
      const petDb = new Pet(pet);
      await petDb.save();
    }
  }
  res.json({ok: "ok"})
});

task3BRouter.get('/', async(req, res) => {
  console.log('get all');
  const users = await User.find({}, 'id username fullname password values.money values.origin', {sort: {id: 1}});
  const pets = await Pet.find({}, 'id userId type color age', {sort: {id: 1}});
  res.status(200).json({users: users, pets: pets});
});

task3BRouter.get('/users/populate', async(req, res) => {
  console.log('users populate', req.query.havePet);
  let params = {}
  if (req.query.havePet) {
    let pets = await Pet.find({type: req.query.havePet}, 'userId');
    if (pets.size === 0) {
      return res.status(404).send("Not Found");
    }
    let users = [];
    for (var index in pets) {
      if (pets.hasOwnProperty(index)) {
        const pet = pets[index];
        users.push(pet.userId);
      }
    }
    params.id = {$in: users};
  }
  const users = await User.find(params).sort({id: 1}).populate({path: "pets", select: 'id userId type color age'});
  return res.json(users);
});


task3BRouter.get('/users', async(req, res) => {
  console.log('users', req.query.havePet);
  let params = {};
  if (req.query.havePet) {
    let pets = await Pet.find({type: req.query.havePet}, 'userId');
    if (pets.size === 0) {
      return res.status(404).send("Not Found");
    }
    let users = [];
    for (var index in pets) {
      if (pets.hasOwnProperty(index)) {
        const pet = pets[index];
        users.push(pet.userId);
      }
    }
    params.id = {$in: users};
  }

  const users = await User.find(params, 'id username fullname password values', {sort: {id: 1}});
  return res.json(users);
});

task3BRouter.get('/users/:id/pets', async(req, res) => {
  console.log('users pets', req.param.id);
  let pets;
  if (!isNum(req.params.id)) {
    pets = await Pet.find({userId: req.params.id}, 'id userId type color age', {sort: {id: 1}});
    if (pets.length > 0) {
      return res.json(pets);
    }
  }
  pets = await Pet.find({username: req.params.id}, 'id userId type color age', {sort: {id: 1}});
  if (pets.length > 0) {
    return res.json(pets);
  }
  res.status(404).send("Not Found");
});

task3BRouter.get('/users/:id/populate', async(req, res) => {
  console.log("user by id populate", req.params.id);
  let user;
  if (isNum(req.params.id)) {
    user = await User.findOne({id: req.params.id}, '', {sort: {id: 1}}).populate({
      path: "pets",
      select: 'id userId type color age'
    });
  }
  if (!user) {
    user = await User.findOne({username: req.params.id}, '', {sort: {id: 1}}).populate({
      path: "pets",
      select: 'id userId type color age'
    });
  }
  if (!user) {
    return res.status(404).send("Not Found");
  }
  res.json(user);
});

task3BRouter.get('/users/:id', async(req, res) => {
  console.log("user by id", req.params.id);
  let users;
  if (isNum(req.params.id)) {
    users = await User.find({id: req.params.id}, 'id username fullname password values', {sort: {id: 1}});
    if (users.length > 0) {
      return res.json(users[0]);
    }
  }
  users = await User.find({username: req.params.id}, 'id username fullname password values', {sort: {id: 1}});
  if (users.length > 0) {
    return res.json(users[0]);
  }
  res.status(404).send("Not Found");
});

task3BRouter.get('/pets/populate', async(req, res) => {
  try {
    console.log('pets populate');
    let params = {};
    if (req.query.type) {
      params.type = req.query.type;
    }

    if (req.query.age_gt) {
      if (!params.age) {
        params.age = {};
      }
      params.age.$gt = req.query.age_gt;
    }
    if (req.query.age_lt) {
      if (!params.age) {
        params.age = {};
      }
      params.age.$lt = req.query.age_lt;
    }

    let pets = await Pet.find(params, 'id userId type color age user', {sort: {id: 1}}).populate({
      path: "user",
      options: {sort: {id: 1}},
      select: 'id username fullname password values'
    });
    res.json(pets);

  } catch (err) {
    console.error(err);
    res.json({err});
  }
});

task3BRouter.get('/pets/:id/populate', async(req, res) => {
  console.log("pet by id populate", req.params);
  if (!isNum(req.params.id)) {
    return res.status(404).send("Not Found");
  }
  let pets = await Pet.find({id: req.params.id}, 'id userId type color age user', {sort: {id: 1}}).populate({
    path: "user",
    select: 'id username fullname password values',
    options: {sort: {id: 1}}
  });
  if (pets.length > 0) {
    return res.json(pets[0]);
  }
  res.status(404).send("Not Found");
});


task3BRouter.get('/pets/:id', async(req, res) => {
  console.log("pet by id", req.params);
  if (!isNum(req.params.id)) {
    return res.status(404).send("Not Found");
  }
  let pets = await Pet.find({id: req.params.id}, 'id userId type color age', {sort: {id: 1}});
  if (pets.length > 0) {
    return res.json(pets[0]);
  }
  res.status(404).send("Not Found");
});

task3BRouter.get('/pets', async(req, res) => {
  console.log('pets');
  let params = {};
  if (req.query.type) {
    params.type = req.query.type;
  }
  if (req.query.age_gt) {
    if (!params.age) {
      params.age = {};
    }
    params.age.$gt = req.query.age_gt;
  }
  if (req.query.age_lt) {
    if (!params.age) {
      params.age = {};
    }
    params.age.$lt = req.query.age_lt;
  }
  let pets = await Pet.find(params, 'id userId type color age', {sort: {id: 1}});
  return res.json(pets);
});

export default task3BRouter;
