'use strict';
var tv4 = require('tv4');
var cheerio = require('cheerio');
var needle = require('needle');
var Promise = require('bluebird');
//var x = require('x-ray');

var schema = require('./schema.json');

var cheerioDriver = function(template) {

  var promise = new Promise(function(resolve, reject) {

    needle.get(template.url, function(error, response) {
      if (error) reject(error);
      var $ = cheerio.load(response.body);

      if(template.input) {
        console.log('there is input');
        template.input.forEach(function(input, key) {
          console.log(input);
          var entry = Object.keys(input)[key];
          console.log(entry);
          var value = input[entry];
          console.log(value);
          console.log($(entry).val());
          $(entry).val(value);
          console.log($(entry).val());
        });
      }

      resolve($.html());
    });

  });

  return promise;

};

var xrayDriver = function(template) {

  var promise = new Promise(function(resolve, reject) {

    var url = Object.keys(template)[0];
    console.log(url);

    x(url, {

    })

  });

  return promise;

};

var validateTemplate = function(template) {
  return tv4.validate(template, schema);
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
