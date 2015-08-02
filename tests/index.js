/**
 * Created by arming on 7/31/15.
 */

var app = require('../app');
var request = require('supertest');

var port = process.env.PORT || 3000;

describe('server', function () {

  describe('get index', function(){
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

  describe('google.com test', function(){

    var requestDoc = {
      url: "http://google.com"
    };

    it('should return array of links',function(done) {

      request(app)
        .post('/')
        .expect('Content-Type', /json/)
        .expect('Content-Length', '20')
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          //done();
        });

    });

    /*
      request(app)
        .post('/')
        //.send(requestDoc)
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '20')
        .expect(300)
        .end(function(err, res){
          if (err) throw err;
          console.log('Res: ' + res);
        });
      done();
    });
    */
  });

});
