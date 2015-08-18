'use strict';
var tv4 = require('tv4');
var Promise = require('bluebird');
var osmosis = require('osmosis');
var webdriverio = require('webdriverio');

var schema = require('./schema.json');

var osmosisDriver = function(template, options) {

  var promise = new Promise(function(resolve, reject) {

    var scrape = osmosis
      .get(template.url);

    if (template.submit) scrape = scrape.submit(template.submit.button, template.submit.input);

    scrape
      .set(template.submit.val)
      .then(function(context, data, next) {
        next(false);
        resolve(data);
      });

  });

  return promise;

};

var webdriverDriver = function(template, options) {

  var promise = new Promise(function(resolve, reject) {

    console.log('Using the webdriver driver');
    console.log(template.url);

    var data = {};

    var scrape = webdriverio
      .remote(options.webdriverOptions)
      .init()
      .url(template.url);

    if(template.submit) {

      Object.keys(template.submit.input).forEach(function(key) {
        console.log(key);
        console.log('Val: ', template.submit.input[key]);
        scrape = scrape.setValue(key, template.submit.input[key])
      });

      console.log('Submitting');
      scrape = scrape.click(template.submit.button);

      Object.keys(template.submit.val).forEach(function(key) {
        console.log(key);
        var value = template.submit.val[key][0];
        console.log(value);
        //scrape = scrape.setValue(key, template.submit.input[key])

        scrape = scrape.getAttribute(value.select, value.attr).then(function(result) {
          console.log('Setting ');
          console.log(result);
          data[key] = result;
        })
      });

    }

    scrape.title(function(err, res) {
      console.log('Title was: ' + res.value);
    })
      .end(function() {
        console.log('Data is: ',data);
        resolve(data);
      });

  });

  return promise;

};

var validateTemplate = function(template) {
  return tv4.validate(template, schema);
};

var scrape = function(template, options) {

  //var driver;
  //if(!template.driver) driver = 'cheerio';

  var promise = new Promise(function(resolve, reject) {

    var valid = validateTemplate(template);
    //console.log('valid: ' + valid);

    // Uncomment once the template is set.
    //if(!valid) { reject(valid); };

    var driver = osmosisDriver;

    if(options.driver === "webdriver") {
      driver = webdriverDriver;
    } else if(options.driver === "osmosis") {
      driver = osmosisDriver;
    }

    //return cheerioDriver(template)
    driver(template, options)
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
