'use strict';

var Nightmare = require('nightmare');
var _ = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var crypto = require('crypto');
var vo = require('vo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {

  var errors = [];

  for(let url of req.body) {
    var page = Object.keys(url)[0];
    for (let step of url[page]) {
      if(step[0] === "TYPE" && _.isString(step[1]) && step[2] === "INTO" && _.isString(step[3])) {
      } else if(step[0] === "CLICK" && _.isString(step[1])) {
      } else if(step[0] === "WAITFOR" && _.isString(step[1])) {
      } else if(step[0] === "RETURN" && step[1] === "STRING" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
      } else {
        errors.push(step);
      }
    }
  }

  if(errors.length > 0) {
    res.json({
      "Syntax Errors": errors
    });
    return;
  }

  var browser = new Nightmare({ show: false });
  var results = {};

  vo(function* () {
    for(let url of req.body) {
      var page = Object.keys(url)[0];

      yield browser.goto(page);
      for (let step of url[page]) {
        if(step[0] === "TYPE" && _.isString(step[1]) && step[2] === "INTO" && _.isString(step[3])) {
          yield browser.insert(step[3], step[1]);
        } else if(step[0] === "CLICK" && _.isString(step[1])) {
          yield browser.click(step[1]);
        } else if(step[0] === "WAITFOR" && _.isString(step[1])) {
          yield browser.wait(step[1]);
        } else if(step[0] === "RETURN" && step[1] === "STRING" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
          var selector = step[2];
          var varName = step[4];
          results[varName] = yield browser.evaluate(function (selector) {
            return document.querySelector(selector).innerText;
          }, selector);
        }
      }
      yield browser.end();
    }
  })(function (err, result) {
    if (err) return console.log(err);
    res.json({
      result: results,
      requestId: crypto.randomBytes(24).toString('hex')
    });
  });

});

app.listen(8080, function () {
  console.log('Rubbertiger listening on port 8080!');
});

module.exports = {};
