'use strict';

var B = require('bluebird');
var Nightmare = require('nightmare');
var _ = require('lodash');

/*var test = {
 "https://www.google.com/": [
 { "TYPE": ["#lst-ib", "Cattleya Concepcion"] },
 { "CLICK": "#tsf > div.tsf-p > div.jsb > center > input[type='submit']:nth-child(1)" },
 { "WAIT": "#rso" },
 { "RETURN": "#rso > div:nth-child(1) > div:nth-child(1) > div > h3 > a" }
 ]
 };*/

/*
 TYPE value INTO select
 PRESS key
 CLICK value
 WAITFOR select

 RETURN STRING value AS var
 RETURN ARRAY value AS var
 RETURN OBJECT value AS var

 {
 "https://www.google.com/": [
 ["TYPE", "Cattleya Concepcion", "INTO", "#lst-ib"],
 ["CLICK", "#tsf > div.tsf-p > div.jsb > center > input[type='submit']:nth-child(1)"],
 ["WAITFOR", "#rso"],
 ["RETURN", "STRING", "#rso > div:nth-child(1) > div:nth-child(1) > div > h3 > a", "AS", "firstHit"]
 ]
 }
 */

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var crypto = require('crypto');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
  console.log(req.body);
  var chain = new Nightmare({ show: false });
  var errors = [];
  var steps = chain;
  var state = {};

  _.each(req.body, function(url, key) {
    steps = chain.goto(key);
    _.each(url, function(step) {
      if(step[0] === "TYPE" && _.isString(step[1]) && step[2] === "INTO" && _.isString(step[3])) {
        steps = steps.type(step[3], step[1]);
      } else if(step[0] === "CLICK" && _.isString(step[1])) {
        steps = steps.click(step[1]);
      } else if(step[0] === "WAITFOR" && _.isString(step[1])) {
        steps = steps.wait(step[1]);
      } else if(step[0] === "RETURN" && step[1] === "STRING" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
        var selector = step[2];
        var varName = step[4];
        steps = steps.evaluate(function (selector, varName, state) {
          console.log('State right now:');
          console.log(state);
          state[varName] = document.querySelector(selector).innerText;
          return state;
        }, selector, varName, state)
      } else {
        errors.push(step);
      }
    })
  });

  if(errors.length > 0) {
    chain = chain.end();
    res.json({
      "Syntax Errors": errors
    });
  } else {
    steps = steps.end();
    B
      .resolve(steps)
      .then(function(result) {
        console.log(result);
        console.log('state');
        console.log(state);
        res.json({
          result: result,
          requestId: crypto.randomBytes(24).toString('hex')
        });
      })
      .catch(function(e) {
        res.json({
          "Exception": e
        });
      });

  }
});

app.listen(8080, function () {
  console.log('Rubbertiger listening on port 8080!');
});

module.exports = {};
