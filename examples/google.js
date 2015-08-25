/**
 * Created by arminhammer on 8/12/15.
 */
'use strict';

var rubbertiger = require('../dist/index');

var template = {
  'url': 'https://www.google.com/search',
  'submit': {
    'input': {
      'q': 'tigers'
    },
    'button': 'button.lsb',
    //'waitFor': '.r a@href',
    'val': {
      'links': ['.r > a@href']
    }
  }
};

var options = {
  //driver: 'osmosis',
  driver: 'webdriver',
  webdriverOptions: {
    host: "localhost",
    port: 4444,
    desiredCapabilities: {
      browserName: 'chrome'
    }
  }
};

rubbertiger.scrape(template, options).
  then(function(result) {

    console.log('Links from Google:');
    console.log(result);

  });
