'use strict';
import { validate } from 'tv4';

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

var cheerioDriver = function() {

};

var validateTemplate = function(template) {
  return validate(template, schema);
};

var scrape = function(template) {

  //var driver;
  //if(!template.driver) driver = 'cheerio';

  var promise = new Promise(function(resolve, reject) {

    var valid = validateTemplate(template);
    console.log('valid: ' + valid);
    if(!valid) { reject(valid); };

    resolve('Good.');

  });

  return promise;

};

export default { scrape };
