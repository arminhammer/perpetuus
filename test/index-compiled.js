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

var busyTemplate = {
  url: 'http://google.com'
};

describe('rubbertiger', function () {
  it('should use promises', function () {

    _lib2['default'].scrape(simpleTemplate).then(function (response) {

      console.log(response);
      (0, _expectJs2['default'])(response).to.eql('Good.');
    })['catch'](function (error) {
      console.log('Error: ' + error);
      (0, _expectJs2['default'])(error).to.be(undefined);
    });
  });
});

describe('rubbertiger', function () {
  it('should validate the schema', function () {

    _lib2['default'].scrape(invalidTemplate).then(function (response) {

      console.log(response);
    })['catch'](function (error) {
      console.log('Error: ' + error);
      (0, _expectJs2['default'])(error).to.be(false);
    });
  });
});

//# sourceMappingURL=index-compiled.js.map