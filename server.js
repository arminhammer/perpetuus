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

/* Check to see if JQuery is in the page already */
var checkJquery = function() {
  if (typeof jQuery === "undefined") {
    return false;
  } else {
    return true;
  }
};

app.post('/', function (req, res) {

  var errors = [];

  for(let url of req.body) {
    var page = Object.keys(url)[0];
    for (let step of url[page]) {
      if(step[0] === "TYPE" && _.isString(step[1]) && step[2] === "INTO" && _.isString(step[3])) {
      } else if(step[0] === "CLICK" && _.isString(step[1])) {
      } else if(step[0] === "WAIT" && step[1] === "FOR" && _.isString(step[2])) {
      } else if(step[0] === "PRESS" && _.isString(step[1])) {
      } else if(step[0] === "RETURN" && step[1] === "STRING" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
      } else if(step[0] === "RETURN" && step[1] === "ARRAY" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
      } else if(step[0] === "RETURN" && step[1] === "OBJECT" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
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

  var hasJquery = false;
  var browser = new Nightmare({
    show: false,
    waitTimeout: 10000
  });
  var results = {};

  vo(function* () {
    for(let url of req.body) {
      var page = Object.keys(url)[0];

      yield browser.goto(page);

      hasJquery = yield browser.evaluate(checkJquery);
      if(!hasJquery) {
        yield browser.inject('js', 'node_modules/jquery/dist/jquery.min.js');
      }

      for (let step of url[page]) {
        if(step[0] === "TYPE" && _.isString(step[1]) && step[2] === "INTO" && _.isString(step[3])) {
          yield browser.insert(step[3], step[1]);
        } else if(step[0] === "CLICK" && _.isString(step[1])) {
          yield browser.click(step[1]);
          hasJquery = yield browser.evaluate(checkJquery);
          if(!hasJquery) {
            yield browser.inject('js', 'node_modules/jquery/dist/jquery.min.js');
          }
        } else if(step[0] === "WAIT" && step[1] === "FOR" && _.isString(step[2])) {
          yield browser.wait(step[2]);
        } else if(step[0] === "PRESS" && _.isString(step[1])) {
          if(step[1] === "ENTER") {
            yield browser.type('document', '\u000d')
          }
        } else if(step[0] === "RETURN" && step[1] === "STRING" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
          var selector = step[2];
          var varName = step[4];
          results[varName] = yield browser.evaluate(function (selector) {
            return $.trim($(selector).text());
          }, selector);
        } else if(step[0] === "RETURN" && step[1] === "ARRAY" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
          var selector = step[2];
          var varName = step[4];
          results[varName] = yield browser.evaluate(function (selector) {
            return $(selector).map(function(){
              return $.trim($(this).text());
            }).get();
          }, selector);
        } else if(step[0] === "RETURN" && step[1] === "OBJECT" && _.isString(step[2]) && step[3] === "AS" && _.isString(step[4])) {
          var selector = step[2];
          var varName = step[4];
          results[varName] = yield browser.evaluate(function (selector) {
            var array = $(selector).map(function(){
              return $.trim($(this).text());
            }).get();
            var result = {};
            for(var i=0; i<array.length;i++) {
              result[i] = array[i];
            }
            return result;
          }, selector);
        }
      }
      yield browser.end();
    }
  })(function (err) {
    if (err) {
      console.log(err.stack);
      res.status(400).send(err.toString());
    } else {
      res.json({
        result: results,
        requestId: crypto.randomBytes(24).toString('hex')
      });
    }
  });
});

app.listen(8080, function () {
  console.log('Rubbertiger listening on port 8080!');
});

module.exports = {};
