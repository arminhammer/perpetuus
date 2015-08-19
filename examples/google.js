/**
 * Created by arminhammer on 8/12/15.
 */
'use strict';

var rubbertiger = require('../lib/index');

var template = {
  'url': 'https://www.google.com/search',
  'submit': {
    'input': {
      'input#lst-ib': 'tigers'
    },
    'button': 'button.lsb',
    'val': {
      'links': ['a@href']
    }
  }
};

var options = {
  driver: 'osmosis',
  //driver: 'webdriver',
  webdriverOptions: {
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
