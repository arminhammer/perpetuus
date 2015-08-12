'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expectJs = require('expect.js');

var _expectJs2 = _interopRequireDefault(_expectJs);

var _lib = require('../lib');

var _lib2 = _interopRequireDefault(_lib);

var simpleTemplate = {
  url: 'http://google.com'
};

var invalidTemplate = {
  orl: 'http://google.com'
};

var googleTemplate = {
  url: 'http://google.com',
  input: [{
    element: '#lst-ib',
    val: 'tigers'
  }],
  follow: {
    method: {
      click: 'button.lsb'
    },
    val: {
      links: '.g > a[href]'
    }
  }
};

describe('rubbertiger', function () {
  it('should use promises', function (done) {

    _lib2['default'].scrape(simpleTemplate).then(function (response) {

      console.log(response);
      (0, _expectJs2['default'])(response).to.eql('Good.');
      done();
    })['catch'](function (error) {
      console.log('Error: ' + error);
      (0, _expectJs2['default'])(error).to.be(undefined);
      done();
    });
  });
});

describe('rubbertiger', function () {
  it('should validate the schema', function (done) {

    _lib2['default'].scrape(invalidTemplate).then(function (response) {

      console.log(response);
      done();
    })['catch'](function (error) {
      console.log('Error: ' + error);
      (0, _expectJs2['default'])(error).to.be(false);
      done();
    });
  });
});

describe('rubbertiger', function () {
  it('should input a search and return links from google', function (done) {

    var expected = {
      links: ['http://www.google.com', 'http://www.google.com']
    };

    _lib2['default'].scrape(googleTemplate).then(function (response) {

      console.log('Response from google scrape:');
      console.log(response);
      (0, _expectJs2['default'])(response).to.be(expected);
      done();
    })['catch'](function (error) {
      console.log('Error: ' + error);
      (0, _expectJs2['default'])(error).to.be(undefined);
      done();
    });
  });
});

//# sourceMappingURL=index-compiled.js.map