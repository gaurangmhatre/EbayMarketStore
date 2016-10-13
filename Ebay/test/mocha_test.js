var assert = require('assert');
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");


describe('Ebay unit tests', function() {
    afterEach(function(){
        console.log('after the test!');
    })


    /*it.only('should return -1 when the value is not present', function() {
     assert.equal(-1, [1,2,3].indexOf(4));
     });

     it.skip('should return -1 when the value is not present', function() {
     assert.equal(-1, [1,2,3].indexOf(4));
     });

    it('should return -1 when the value is not present', function() {
        assert.equal(-1, [1,2,3].indexOf(4));
    });
     */

    
    it('Test1: for login for sample user', function() {

        var status;
        server
            .post("/checklogin")
            .send({email : 'gaurangmhatre@gmail.com', password : 'aabc'})
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                //res.statusCode.should.equal(200);
                status = res.statusCode;
                assert.equal(200,status);

                // Error key should be false.
                //res.body.error.should.equal(false);
                done();


            });
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

                assert.equal(true,res);

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

                assert.equal(true,res);

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
                assert.equal(200,status);

                assert.equal(true,res);

                // Error key should be false.
                //res.body.error.should.equal(false);
                done();
            });
    });
});