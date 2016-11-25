import express from 'express';
import _ from 'lodash';
const __DEV__ = true;
const task3CRouter = express.Router();
const baseUrl = 'https://pokeapi.co/api/v2';
const fields = ["id", "name", "weight", "height"];

async function getAllPokemons(url, i = 0) {
  console.log('getPokemons ', url, i);
  const response = await fetch(url);
  const page = await response.json();
  const pokemons = page.results;
  if (__DEV__ && i > 3) {
    return pokemons;
  }
  if (page.next) {
    const pokemonsNext = await getAllPokemons(page.next, i + 1);
    return [...pokemons, ...pokemonsNext];
  }
  return pokemons;
}

async function getPokemon(url) {
  console.log("getPokemon", url);
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon;
}

function pickPokemons(p, offset = 0, limit = 20) {
  return _.slice(p, offset, parseFloat(offset) + parseFloat(limit)).map(pokemon=>{
    return pokemon.name;
  });
}

import pokemons from './pokemonsOld.json';
task3CRouter.get('/', async(req, res) => {
  try {
    return res.json(
      pickPokemons(_.orderBy(pokemons, 'name'), req.query.offset, req.query.limit)
    );
  } catch(err) {
    console.log(err);
    return res.json({
      err
    });
  }
});

task3CRouter.get('/huge', async(req, res) => {
  try {
    const hugePokemons = _.sortBy(pokemons, [pokemon => -parseFloat(pokemon.height), 'name'], ['desc', 'asc']);
    return res.json(
      pickPokemons(hugePokemons, req.query.offset, req.query.limit)
    );
  } catch(err) {
    console.log(err);
    return res.json({
      err
    });
  }
});

task3CRouter.get('/micro', async(req, res) => {
  try {
    const mircoPokemons = _.sortBy(pokemons, [pokemon => parseFloat(pokemon.height), 'name'], ['desc', 'asc']);
    return res.json(
      pickPokemons(mircoPokemons, req.query.offset, req.query.limit)
    );
  } catch(err) {
    console.log(err);
    return res.json({
      err
    });
  }
});

task3CRouter.get('/heavy', async(req, res) => {
  try {
    const heavyPokemons = _.sortBy(pokemons, [pokemon => -parseFloat(pokemon.weight), 'name'], ['desc', 'asc']);
    return res.json(
      pickPokemons(heavyPokemons, req.query.offset, req.query.limit)
    );
  } catch(err) {
    console.log(err);
    return res.json({
      err
    });
  }
});

task3CRouter.get('/light', async(req, res) => {
  try {
    const heavyPokemons = _.sortBy(pokemons, [pokemon => parseFloat(pokemon.weight), 'name'], ['desc', 'asc']);
    return res.json(
      pickPokemons(heavyPokemons, req.query.offset, req.query.limit)
    );
  } catch(err) {
    console.log(err);
    return res.json({
      err
    });
  }
});


task3CRouter.get('/fat', async(req, res) => {
  try {
    const fatPokemons = _.sortBy(pokemons, [pokemon => -pokemon.weight/pokemon.height, 'name'], ["desc", "asc"]);
    return res.json(
      pickPokemons(fatPokemons, req.query.offset, req.query.limit)
    );
  } catch(err) {
    console.log(err);
    return res.json({
      err
    });
  }
});

task3CRouter.get('/angular', async(req, res) => {
  try {
    const angularPokemons = _.sortBy(pokemons, [pokemon => pokemon.weight/pokemon.height, 'name'], ["desc", "asc"]);
    return res.json(
      pickPokemons(angularPokemons, req.query.offset, req.query.limit)
    );
  } catch(err) {
    console.log(err);
    return res.json({
      err
    });
  }
});


export default task3CRouter;
/*const pokemonsInfo = await getAllPokemons(`${baseUrl}/pokemon`);
 const pokemonsPromises = pokemonsInfo.map(info=> {
 return getPokemon(info.url)
 });
 const pokemonsFull = await Promise.all(pokemonsPromises);
 const pokemons = pokemonsFull.map(pokemon => {
 return _.pick(pokemon, fields);
 });*/
