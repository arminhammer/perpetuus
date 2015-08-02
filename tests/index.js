/**
 * Created by arming on 7/31/15.
 */

var app = require('../app');
var request = require('supertest');

var port = process.env.PORT || 9000;

describe('server', function () {

  describe('get index', function(){
    it('should respond to GET',function(done) {
      request('localhost:' + port)
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

      //this.timeout(10000);

      request('http://localhost:'+port)
        .post('/')
          .send({ url: "http://google.com" })
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '20')
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
              console.log('Response:');
              console.log(res.body);
          done();
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
