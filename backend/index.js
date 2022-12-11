require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;

const md5 = require("md5");
const qs = require("qs");
const axios = require("axios");

const APIURL = process.env.APIURL;
const MY_PRIVATE_API_KEY = process.env.PRIVATE_API_KEY;
const MY_PUBLIC_API_KEY = process.env.PUBLIC_API_KEY;
const HASH = md5(`1${MY_PRIVATE_API_KEY}${MY_PUBLIC_API_KEY}`);

app.get("/characters", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  let query = request.query;
  query.apikey = MY_PUBLIC_API_KEY;
  query.hash = HASH;
  query.limit = 100;
  let queryString = qs.stringify(query);

  let promise = [];
  let randomIMG = Math.round(Math.random() * 100);
  let randomIMGLastLine = Math.round(Math.random() * 58);

  for (let i = 0; i < 1600; i += 100) {
    let res = await axios(`${APIURL}characters?&ts=1&${queryString}&offset=${i}`)

    promise.push(res.data);
  }
  let promiseRandom = [];
  for (let j = 0; j < promise.length - 1; j++) {
    promiseRandom.push(promise[j].data.results[randomIMG]);
  }
  promiseRandom.push(promise[15].data.results[randomIMGLastLine]);
  response.send(promiseRandom);
});

app.get("/characters/:querySearch", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  let query = request.query;
  let querySearch = request.params.querySearch;
  query.apikey = MY_PUBLIC_API_KEY;
  query.hash = HASH;
  query.limit = 100

  let queryString = qs.stringify(query);
  let params = new URLSearchParams([["nameStartsWith", querySearch]]);

  let res = await axios(`${APIURL}characters?${params}&ts=1&${queryString}`);
  response.send(res.data.data.results);
});

app.get("/characters/details/:heroName", async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
  
    let query = request.query;
    let q = request.params.heroName;
    query.apikey = MY_PUBLIC_API_KEY;
    query.hash = HASH;
  
    let queryString = qs.stringify(query);
    let params = new URLSearchParams([["name", q]]);
    
    let res = await axios(`${APIURL}characters?${params}&ts=1&${queryString}`);
    response.send(res.data);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
