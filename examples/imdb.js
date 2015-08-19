/**
 * Created by arminhammer on 8/18/15.
 */
'use strict';

var rubbertiger = require('../lib/index');

var template = {
  'url': 'http://www.imdb.com/chart/top',
  'val': {
    'movies': [{
      'select': '//*[@id="main"]/div/span/div/div/div[2]/table/tbody/tr/td[2]/a'
    }]
  }
};

var options = {
  //driver: 'osmosis',
  driver: 'webdriver',
  webdriverOptions: {
    desiredCapabilities: {
      browserName: 'chrome'
    }
  }
};

rubbertiger.scrape(template, options).
  then(function(result) {

    console.log('Top 250 Movies:');
    console.log(result);

  });
