'use strict';
var tv4 = require('tv4');
var cheerio = require('cheerio');
//var needle = require('needle');
var Promise = require('bluebird');
//var x = require('x-ray');
var request = require('request');
//var zombie = require('zombie');
var osmosis = require('osmosis');

var schema = require('./schema.json');

var osmosisDriver = function(template) {

  var promise = new Promise(function(resolve, reject) {

    if(template.submit) {
      osmosis
        .get(template.url)
        /*
        .then(function(context, data, next) {
          console.log(context);
          console.log(data);
          next(context, data);
        })
        */
        .submit(template.submit.button, template.submit.input)
        /*
        .then(function(context, data, next) {
          console.log(context);
          console.log(data);
          next(context, data);
        })
        */
        .set(template.submit.val)
        .then(function(context, data, next) {
          next(false);
          resolve(data);
        });
    }
    /*
     .then(function(context, data, next) {
     if(template.submit) {
     osmosis.submit(template.submit.button, template.submit.input)
     }
     else {
     next(context, data);
     }
     })
     .then(function(context, data, next) {
     next(false);
     resolve(data);
     });
     */
  });

  return promise;

};

var cheerioDriver = function(template) {

  var promise = new Promise(function(resolve, reject) {

    var result = {};

    request.get(template.url, function(error, response) {
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
      if(template.val) {
        console.log('There is a val');
        template.val.forEach(function(val, key) {
          var entry = Object.keys(val)[key];
          var value = input[entry];
          result[entry] = $(value).val();
        });
      }

      if(template.follow) {
        console.log('There is a val');
        template.follow.val.forEach(function(val, key) {
          var entry = Object.keys(val)[key];
          var value = val[entry];
          result[entry] = $(value).val();
        });
      }
      else {
        resolve(result);
      }

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

    // Uncomment once the template is set.
    //if(!valid) { reject(valid); };

    //return cheerioDriver(template)
    osmosisDriver(template)
      .then(function(data) {
        console.log('Got data!');
        //console.log(data);
        resolve(data);
      })
      .catch(function(error) {
        console.log(error);
      })

  });

  return promise;

};

module.exports = { scrape: scrape };
