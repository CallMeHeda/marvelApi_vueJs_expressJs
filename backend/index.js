const express = require("express");
const app = express();
const port = 3000;

const md5 = require("md5");
const qs = require("qs");
const axios = require("axios");
const { nextTick } = require("vue");

const APIURL = "http://gateway.marvel.com/v1/public/";
const MY_PRIVATE_API_KEY = "7d3c7cca34eb3769f7104f717f218109f567f14b";
const MY_PUBLIC_API_KEY = "ecbb763a0d20c20f43df93bb845fd8dd";
const HASH = md5(`1${MY_PRIVATE_API_KEY}${MY_PUBLIC_API_KEY}`);

let hero = "";

app.get("/characters", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  let query = request.query;
  query.apikey = MY_PUBLIC_API_KEY;
  query.hash = HASH;
  query.limit = 100;
  let queryString = qs.stringify(query);

  let promise = [];

  for (let i = 0; i < 1600; i += 100) {
    let res = await axios(
      `${APIURL}characters?&ts=1&${queryString}&offset=${i}`
    );
    promise.push(res.data);
  }
  response.send(promise);
});

app.get("/characters/:q", async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  let query = request.query;
  let q = request.params.q;
  query.apikey = MY_PUBLIC_API_KEY;
  query.hash = HASH;

  let queryString = qs.stringify(query);
  let params = new URLSearchParams([["nameStartsWith", q]]);

  let promise = [];

  let res = await axios(`${APIURL}characters?${params}&ts=1&${queryString}`);
  promise.push(res.data);
  response.send(res.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
