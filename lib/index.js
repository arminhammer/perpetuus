'use strict';

var B = require('bluebird');
var Nightmare = require('nightmare');

var test = {
  0: [
    { "GOTO" : "https://www.google.com/" },
    { "TYPE": ["#lst-ib", "Cattleya Concepcion"] },
    { "CLICK": "#tsf > div.tsf-p > div.jsb > center > input[type='submit']:nth-child(1)" },
    { "WAIT": "#rso" },
    { "RETURN": "#rso > div:nth-child(1) > div:nth-child(1) > div > h3 > a" }
  ]
};

var chain = new Nightmare({ show: true });

for(var i = 0; i < test[0].length; i++) {
  if(test[0][i].GOTO) {
    chain = chain.goto(test[0][i].GOTO);
  } else if(test[0][i].TYPE) {
    chain = chain.type(test[0][i].TYPE[0], test[0][i].TYPE[1]);
  } else if(test[0][i].CLICK) {
    chain = chain.click(test[0][i].CLICK);
  } else if(test[0][i].WAIT) {
    chain = chain.wait(test[0][i].WAIT);
  } else if(test[0][i].RETURN) {
    var selector = test[0][i].RETURN;
    chain = chain.evaluate(function (selector) {
      return document.querySelector(selector).innerText
    }, selector)
  }
}

chain = chain.end();

B
  .resolve(chain)
  .then(function(result) {
    console.log(result);
  })
  .catch(function(e) {
    console.log(e);
  });

module.exports = {};
