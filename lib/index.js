'use strict';
var tv4 = require('tv4');
var BPromise = require('bluebird');
var osmosis = require('osmosis');
var webdriverio = require('webdriverio');

var schema = require('./schema.json');

var osmosisDriver = function(template, options) {

  console.log('Using the osmosis driver');
  console.log(template.url);

  var promise = new BPromise(function(resolve, reject) {

    var scrape = osmosis
      .get(template.url);

    if(template.val) {
      console.log('Val');
      scrape = scrape
        .set(template.val)
    }

    if (template.submit) {
      console.log('Submit');
      scrape = scrape
        .submit(template.submit.button, template.submit.input)
        .set(template.submit.val);

      console.log('Submitted');

    }

    scrape
      .then(function(context, data, next) {
        next(false);
        console.log('Data:');
        console.log(data);
        resolve(data);
      });

  });

  return promise;

};

var webdriverDriver = function(template, options) {

  var promise = new BPromise(function(resolve, reject) {

    console.log('Using the webdriver driver');
    console.log(template.url);

    var data = {};

    var scrape = webdriverio
      .remote(options.webdriverOptions)
      .init()
      .url(template.url);

    if(template.waitFor) {
      console.log('Waiting for ', template.waitFor);
      scrape
        .waitForExist(template.waitFor,30000);
    }

    if(template.val) {
      Object.keys(template.val).forEach(function(key) {
        console.log(key);
        var value = template.val[key][0];
        console.log(value);

        console.log('waiting...');

        if(!template.waitFor) {
          scrape = scrape
            .waitForExist(value, 30000);
        }

        /*
         if(value.attr) {
         scrape = scrape
         .getAttribute(value, value.attr)
         } else {
         scrape = scrape
         .getText(value)
         }

         scrape.then(function(result) {
         console.log('Setting ');
         //console.log(result);
         data[key] = result;
         });
         */

      });

      scrape = scrape
        .getHTML('html')
        .then(function(html) {

          console.log('getting html');

          osmosis
            .parse(html)
            .set(template.val)
            .then(function(context, result, next) {
              next(false);
              console.log('Data:');
              console.log(result);
              data = result;
            });

        });

    }



    if(template.submit) {

      Object.keys(template.submit.input).forEach(function(key) {
        console.log(key);
        console.log('Val: ', template.submit.input[key]);
        console.log('scrape');
        console.log(scrape);
        scrape = scrape.setValue(key, template.submit.input[key]);
      });

      console.log('Submitting');

      scrape = scrape
        .waitForVisible(template.submit.button, 30000)
        .click(template.submit.button);

      Object.keys(template.submit.val).forEach(function(key) {
        console.log(key);
        var value = template.submit.val[key][0];
        console.log(value);

        scrape = scrape
          .waitForVisible(value.select, 30000)
          .getHTML('html')
          .then(function(html) {
            //if(err) console.log(err);
            var fs = require('fs');
            console.log('writing to file.');
            fs.open('html.html', 'w+', function(err, fd) {
              fs.write(fd, html, 0, html.length, function() {
                console.log('Finished writing file.');
              });
            })
            //data[html] = html;
          });

        if(value.attr) {
          scrape = scrape
            .getAttribute(value.select, value.attr)
        };

        scrape.then(function(result) {
          console.log('Setting ');
          console.log(result);
          data[key] = result;
        });
      });

    }

    scrape
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

  var promise = new BPromise(function(resolve, reject) {

    var valid = validateTemplate(template);

    // Uncomment once the template is set.
    //if(!valid) { reject(valid); };

    var driver = osmosisDriver;

    if(options.driver === 'webdriver') {
      driver = webdriverDriver;
    } else if(options.driver === 'osmosis') {
      driver = osmosisDriver;
    }

    driver(template, options)
      .then(function(data) {
        console.log('Got data!');
        resolve(data);
      })
      .catch(function(error) {
        console.log(error);
      });

  });

  return promise;

};

module.exports = { scrape: scrape };
