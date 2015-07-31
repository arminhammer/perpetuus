/**
 * Created by arming on 7/31/15.
 */

var app = require('../app');
var request = require('supertest');

var port = process.env.PORT || 3000;

describe('server', function () {

  describe('homepage', function(){
    it('should respond to GET',function(done) {
      request(app)
        .get('/')
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '20')
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
        });
        done();
    });

  });

});
