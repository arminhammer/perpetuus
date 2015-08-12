'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _tv4 = require('tv4');

var schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "RubberTiger",
  "description": "Templated web scraping",
  "type": "object",
  "properties": {
    "url": "string"
  },
  "required": ["url"]
};

var cheerioDriver = function cheerioDriver() {};

var validateTemplate = function validateTemplate(template) {
  return (0, _tv4.validate)(template, schema);
};

var scrape = function scrape(template) {

  //var driver;
  //if(!template.driver) driver = 'cheerio';

  var promise = new Promise(function (resolve, reject) {

    var valid = validateTemplate(template);
    console.log('valid: ' + valid);
    if (!valid) {
      reject(valid);
    };

    resolve('Good.');
  });

  return promise;
};

exports['default'] = { scrape: scrape };
module.exports = exports['default'];

//# sourceMappingURL=index-compiled.js.map