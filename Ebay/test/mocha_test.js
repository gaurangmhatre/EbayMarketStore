var assert = require('assert');
var supertest = require("supertest");
var should = require("should");
var http = require('http');

var server = supertest.agent("http://localhost:3000");


describe('Ebay unit tests', function() {
    afterEach(function(){
        console.log('after the test!');
    })

    /*it.only('should return -1 when the value is not present', function() {
     assert.equal(-1, [1,2,3].indexOf(4));
     });
     */

/*

    it('Test1: for login for sample user', function() {

        var status=500;
        server
            .post("/checklogin")
            .send({email : 'gaurangmhatre@gmail.com', password : 'aabc'})
            .expect("Content-type", /json/)
            //.expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                //res.statusCode.should.equal(200);
                status = res.statusCode;


                // Error key should be false.
                //res.body.error.should.equal(false);
                done();
            });

        assert.equal(200,status);
    });

    it('Test2: test email check', function() {

        server
            .post("/checksignup")
            .send({email : 'gaurangmhatre@gmail.com'})
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                //res.statusCode.should.equal(200);

                assert.equal(true,res);

                // Error key should be false.
                //res.body.error.should.equal(false);
                done();
            });
    });

    it('Test3: signout', function() {

        server
            .post("/signout")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                //res.statusCode.should.equal(200);

                var status = res.statusCode;
                assert.equal(200,status);

                //assert.equal(true,res);

                // Error key should be false.
                //res.body.error.should.equal(false);
                done();
            });
    });

    it('Test4: getAllProducts', function() {

        server
            .post("/getAllProducts")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                //res.statusCode.should.equal(200);

                var status = res.statusCode;
                assert.equal(200,status);

                //assert.equal(true,res);

                // Error key should be false.
                //res.body.error.should.equal(false);
                done();
            });
    });


    it('Test5: getItemType', function() {

        server
            .post("/getItemType")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                //res.statusCode.should.equal(200);

                var status = res.statusCode;
                assert.equal(400,200);

                //assert.equal(true,res);

                // Error key should be false.
                //res.body.error.should.equal(false);
                done();
            });
    });

*/

    it('[test]Test1: for login for sample user', function() {

        var status=500;
        /*server
            .post("/checklogin")
            .send({email : 'gaurangmhatre@gmail.com', password : 'aabc'})
            .expect("Content-type", /json/)
            //.expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                //res.statusCode.should.equal(200);
                status = res.statusCode;


                // Error key should be false.
                //res.body.error.should.equal(false);
                done();
            });*/

        http = require('https');
        var options= {
            host: "localhost:3000",
            path: '/checklogin',
            method: 'POST',
            data: {
                "email": 'gaurangmhatre@gmail.com',
                "password": 'aabc'
            }
        };
        var str='';
        http.request(options,function(response){
            response.on('data',function(data){
                console.log(data);

                status=data.statusCode;

                assert.equal(200,status);
            })
        })
/*
        http.response.on(res,function(){
            console.log("Hello:"+res);
        })*/


    });
});