'use strict';
import { validate } from 'tv4';
//var schema = require('schema.json');
//import * as schema from 'schema.json';
import * as cheerio from 'cheerio';
import * as needle from 'needle';

//console.log('Schema:');
//console.log(schema);

var schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/",
  "type": "object",
  "properties": {
    "url": {
      "id": "url",
      "type": "string"
    },
    "input": {
      "id": "input",
      "type": "array",
      "items": {
        "id": "0",
        "type": "object",
        "properties": {
          "element": {
            "id": "element",
            "type": "string"
          },
          "val": {
            "id": "val",
            "type": "string"
          }
        }
      }
    },
    "follow": {
      "id": "follow",
      "type": "object",
      "properties": {
        "method": {
          "id": "method",
          "type": "object",
          "properties": {
            "click": {
              "id": "click",
              "type": "string"
            }
          }
        },
        "val": {
          "id": "val",
          "type": "object",
          "properties": {
            "links": {
              "id": "links",
              "type": "string"
            }
          }
        }
      }
    }
  },
  "required": [
    "url"
  ]
};

var cheerioDriver = function(template) {

  var promise = new Promise(function(resolve, reject) {

    needle.get(template.url, function(error, response) {
      if (error) reject(error);
      var $ = cheerio.load(response.body);
      resolve($.html());
    });

  });

  return promise;

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

    cheerioDriver(template)
      .then(function(data) {
        resolve(data);
      });

  });

  return promise;

};

export default { scrape };
