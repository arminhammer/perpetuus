/**
 * Created by arminhammer on 8/12/15.
 */
"use strict";

var rubbertiger = require('../lib/index');

var template = {
  "url": "https://www.google.com/search",
  "submit": {
    "input": {
      "q": "tigers"
    },
    "button": "button.lsb",
    "val": {
      "links": [".r a@href"]
    }
  }
};

rubbertiger.scrape(template).
  then(function(result) {

    console.log('Links from Google:');
    console.log(result);

  });
