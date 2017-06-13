const expect = require("expect");
const request = require("supertest");
const assert = require("assert");

const {DuplicateKey} = require("mongo-errors");

const {TEST_UTILS} = require("./../TOOLS");
const {UTILS} = require("./../TOOLS");
const {CONSTANTS} = require("./../TOOLS");

const {app} = require("./LocalMongoServer.js");
const {Play} = require("./../MongoModels");

const {verifyClientServer} = TEST_UTILS;
const {printObj} = UTILS;

var {DATA} = require("./PlayData.js");

"use strict";

describe("POST /testOnePlay", () => {

    var clientDataArray = DATA.onePlay;
    var play = clientDataArray[0];

    /* Remove all data before tests in decribe block run */
    before((done) => {
	Play.remove({}).then(() => {
	    done();
	});
    });

    /* Clean up the databese after all tests run */
    after((done) => {
    	Play.remove({}).then(() => {
    	    done();
    	});
    });

    it("Test The Creation of a Single Play", (done) => {

	   request(app)
	       .post("/testOnePlay")
	       .send(clientDataArray)
	       .expect(200)
	       .expect((res, err) => {

		   var doc = res.body;
		   assert.ok(!res.clientError);
		   assert.ok(!res.serverError);
		   expect(verifyClientServer(play, doc))
		       .toBe("VERIFIED");

	       })
	       .end((err, res) => {
		   if (err) {
		       return done(err);
		   }
		   Play.find().then((serverDocArray) => {

		       expect(serverDocArray.length).toBe(1);
		       var serverPlay = serverDocArray[0];
		       
		       expect(verifyClientServer(play, serverPlay))
			   .toBe("VERIFIED");
		       console.log("Checked Instance Data");
		       done();
		   }).catch((err) => {
		       done(err)
		   });
	       });
       });

    it("Test That The Same Play Cannot Be Reinserted", (done) => {
	
	request(app)
	    .post("/testOnePlay")
	    .send(clientDataArray)
	    .expect(400)
	    .end((err, res) => {
		if (err) {
		    return done(err);
		}

		assert.ok(res.clientError);
		assert.ok(!res.serverError);
		assert.ok(res.body.code === DuplicateKey);
		console.log("Checked Error Response");
		done();
	    });
    });

    it("Test That The Play Can Be Updated", (done) => {

    	Play.find(play).then((serverDocArray) => {

	    var serverPlay = serverDocArray[0];
	    
    	    assert.ok(serverDocArray.length === 1);
    	    expect(verifyClientServer(play, serverPlay)).toBe("VERIFIED");


    	    play.timePeriod = "18th Century";
    	    play.copies = "9000";
	    Play.update(play).then((res) => {

		assert(res.n === 1);
		assert(res.nModified === 1)
		assert(res.ok === 1);

	    });
    	}).catch((err) => {
    		done(err);
    	});

	Play.find(play).then((serverDocArray) => {

	    var serverPlay = serverDocArray[0];
	    
	    expect(serverDocArray.length).toBe(1);
	    expect(verifyClientServer(play, serverDocArray[0]))
		.toBe("VERIFIED");
	    
	    console.log("Checked Instance Data");
	    done();
	}).catch((err) => {
	    done(err);
	});
	
    });
});

