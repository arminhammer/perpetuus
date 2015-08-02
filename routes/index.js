var express = require('express');
//var Horseman = require('node-horseman');
//var town = require('ghost-town')({
//    phantomPort: 22000,
//    workerCount: 1
//});



var router = express.Router();

/* GET home page. */

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/f', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {

    /*
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
     */
    console.log('Got request');

    town.queue({
        html: html,
        width: width,
        height: height
    }, true, function(err, data) {
        if(err) console.log('There was an error: ' + err);
        console.log('Data returned:');
        console.log(data);
    });

    var response = {
        numLinks: numLinks
    };

    res.send(response);

});

module.exports = router;
