/**
 * Created by arminhammer on 8/12/15.
 */
'use strict';

var rubbertiger = require('../lib/index');

var template = {
  'url': 'https://www.google.com',
  'submit': {
    'input': {
      '#lst-ib': 'tigers'
    },
    'button': 'button[type=submit]',
    'val': {
      'links': [{
        'select': '#rso > div.srg > div > div > h3 > a',
        'attr': 'href'
      }]
    }
  }
};

var options = {
  driver: 'webdriver',
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
