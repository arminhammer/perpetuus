'use strict';
var expect = require('expect.js');
var rubbertiger = require('../lib');

var simpleTemplate = {
  url: 'http://www.google.com/'
};

var invalidTemplate = {
  orl: 'http://www.google.com/'
};

var googleTemplate = {
  "url": "http://www.google.com/",
  "input": [
    {
      "element": "#lst-ib",
      "val": "tigers"
    }
  ],
  "follow": {
    "method": {
      "click": "button.lsb"
    },
    "val": {
      "links": ".g > a[href]"
    }
  }
};


describe('rubbertiger', function () {
  it('should use promises', function (done) {

    rubbertiger
      .scrape(simpleTemplate)
      .then(function(response) {

        console.log(response);
        expect(response).to.eql('Good.');
        done();
      })
      .catch(function(error) {
        console.log('Error: ' + error);
        expect(error).to.be(undefined);
        done();
      });

  });
});

describe('rubbertiger', function () {
  it('should validate the schema', function (done) {

    rubbertiger
      .scrape(invalidTemplate)
      .then(function(response) {

        console.log(response);
        done();
      })
      .catch(function(error) {
        console.log('Error: ' + error);
        expect(error).to.be(false);
        done();
      });

  });
});

describe('rubbertiger', function () {
  it('should input a search and return links from google', function (done) {

    var expected = {
      links: [
        'http://www.google.com',
        'http://www.google.com'
      ]
    };

    rubbertiger
      .scrape(googleTemplate)
      .then(function(response) {

        console.log('Response from google scrape:');
        console.log(response);
        expect(response).to.be(expected);
        done();
      })
      .catch(function(error) {
        console.log('Error: ' + error);
        expect(error).to.be(undefined);
        done();
      });

  });
});
