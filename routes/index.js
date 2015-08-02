var express = require('express');
var Horseman = require('node-horseman');

var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/f', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {

  var horseman = new Horseman();

  var numLinks = horseman
    .userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0")
    .open('http://www.google.com')
    .type('input[name="q"]', 'github')
    .click("button:contains('Google Search')")
    .waitForNextPage()
    .count("li.g");

  console.log('numLinks');
  console.log(numLinks);

  horseman.close();

  var response = {
    numLinks: numLinks
  };

  res.send(response);

});

module.exports = router;
