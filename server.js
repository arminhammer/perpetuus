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

  _.each(req.body, function(url, key) {
    steps = chain.goto(key);
    _.each(url, function(step) {
      if(step.TYPE) {
        steps = steps.type(step.TYPE[0], step.TYPE[1]);
      } else if(step.CLICK) {
        steps = steps.click(step.CLICK);
      } else if(step.WAIT) {
        steps = steps.wait(step.WAIT);
      } else if(step.RETURN) {
        var selector = step.RETURN;
        steps = steps.evaluate(function (selector) {
          return document.querySelector(selector).innerText
        }, selector)
      } else {
        errors.push(step);
      }
    })
  });

  if(errors.length > 0) {
    chain = chain.end();
    B
      .resolve(chain)
      .then(function(result) {
        console.log(result);
        res.json({
          "Syntax Errors": errors
        });
      })
      .catch(function(e) {
        res.json({
          "Exception": e
        });
      });
  } else {
    steps = steps.end();
    B
      .resolve(steps)
      .then(function(result) {
        console.log(result);
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
