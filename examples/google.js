/**
 * Created by arminhammer on 8/12/15.
 */
"use strict";

var rubbertiger = require('../lib/index');

var template = {
  "url": "http://www.google.com/",
  "input": [
    { "input[name=q]": "tigers" }
  ],
  "follow": {
    "method": {
      "click": "button.lsb"
    },
    "val": [
      { "links": ".g > a[href]" }
    ]
  }
};

rubbertiger.scrape(template).
  then(function(result) {

    console.log('Links from Google:');
    console.log(result);

  });
