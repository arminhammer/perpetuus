'use strict';
var tv4 = require('tv4');
var cheerio = require('cheerio');
var needle = require('needle');
var Promise = require('bluebird');

var schema = require('./schema.json');

var cheerioDriver = function(template) {

  var promise = new Promise(function(resolve, reject) {

    var url = Object.keys(template)[0];
    console.log(url);
    needle.get(url, function(error, response) {
      if (error) reject(error);
      var $ = cheerio.load(response.body);
      resolve($.html());
    });

  });

  return promise;

};

var validateTemplate = function(template) {
  var keys = Object.keys(template);
  if (keys.length === 1){
    return tv4.validate(template, schema);
  } else {
    return false;
  }
};

var scrape = function(template) {

  //var driver;
  //if(!template.driver) driver = 'cheerio';

  var promise = new Promise(function(resolve, reject) {

    var valid = validateTemplate(template);
    //console.log('valid: ' + valid);
    if(!valid) { reject(valid); };

    return cheerioDriver(template)
      .then(function(data) {
        console.log('Got data!');
        //console.log(data);
        resolve(data);
      });

  });

  return promise;

};

module.exports = { scrape: scrape };
