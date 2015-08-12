'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _tv4 = require('tv4');

//var schema = require('schema.json');
//import * as schema from 'schema.json';

var _cheerio = require('cheerio');

var cheerio = _interopRequireWildcard(_cheerio);

var _needle = require('needle');

//console.log('Schema:');
//console.log(schema);

var needle = _interopRequireWildcard(_needle);

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
  "required": ["url"]
};

var cheerioDriver = function cheerioDriver(template) {

  var promise = new Promise(function (resolve, reject) {

    needle.get(template.url, function (error, response) {
      if (error) reject(error);
      var $ = cheerio.load(response.body);
      resolve($.html());
    });
  });

  return promise;
};

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

    cheerioDriver(template).then(function (data) {
      resolve(data);
    });
  });

  return promise;
};

exports['default'] = { scrape: scrape };
module.exports = exports['default'];

//# sourceMappingURL=index-compiled.js.map