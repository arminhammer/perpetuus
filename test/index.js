'use strict';
import expect from 'expect.js';
import rubbertiger from '../lib';

var simpleTemplate = {
  url: 'http://google.com'
};

var invalidTemplate = {
  orl: 'http://google.com'
};

var busyTemplate = {
  url: 'http://google.com'
};


describe('rubbertiger', function () {
  it('should use promises', function () {

    rubbertiger
      .scrape(simpleTemplate)
      .then(function(response) {

        console.log(response);
        expect(response).to.eql('Good.');

      })
      .catch(function(error) {
        console.log('Error: ' + error);
        expect(error).to.be(undefined);
      });

  });
});

describe('rubbertiger', function () {
  it('should validate the schema', function () {

    rubbertiger
      .scrape(invalidTemplate)
      .then(function(response) {

        console.log(response);

      })
      .catch(function(error) {
        console.log('Error: ' + error);
        expect(error).to.be(false);
      });

  });
});
