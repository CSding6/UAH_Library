/* NPM Modules */
const expect = require("expect");
const request = require("supertest");
const assert = require("assert");

/* Custom Modules */
const {TEST_UTILS} = require("./../TOOLS");
const {UTILS} = require("./../TOOLS");
const {CONSTANTS} = require("./../TOOLS");
const {ERRNO} = require("./../TOOLS");
const {verifyClientServer} = TEST_UTILS;
const {printObj} = UTILS;

/* Local Modules */
const {MongoDB} = require("./../MongoDatabase.js");
const {app} = require("./LocalMongoServer.js");
const {User} = require("./../MongoModels");
var {DATA} = require("./LocalData.js");

"use strict";

/* Remove all users before unit tests in decribe block run */
before((done) => {
    User.remove({}).then(() => {
	done();
    });;
});

/* Clean up the databese after all unit tests run */
after((done) => {
    User.remove({}).then(() => {
	done();
    });
});

describe("Simple User Unit Tests", () => {

    it("Should Create And Query Via the ID of a Single User", (done) => {

	/* Create The First Entry and Confirm Data Save is Valid */
	var user = DATA.oneUser;
	request(app)
	    .post("/add/" + "User")
	    .send(user)
	    .expect(200)
	    .expect((res, err) => {

		if (err) {
		    return done(err);
		}

		var doc = res.body;
		expect(res.clientError).toBe(false);
		expect(res.serverError).toBe(false);
		expect(verifyClientServer(user, doc))
		    .toBe(true);
	    })
	    .end((err, res) => {

		if (err) {
		    return done(err);
		}

		/* Reacees Database To Confirm Data is Present and Valid */
		request(app)
		    .get("/getID/User/" + res.body._id)
		    .expect(200)
		    .expect((res, err) => {

			if (err) {
			    return done(err);
			}

			var doc = res.body;
			expect(res.clientError).toBe(false);
			expect(res.serverError).toBe(false);
			expect(verifyClientServer(user, doc))
			    .toBe(true);
			return done();
		    })
		    .catch((err) => {
			return done(err);
		    });
	    });
    });

    it("Should Not Be Able Reinsert the Same User", (done) => {

	/* Resend The Exact Same Data */
	var user = DATA.oneUser;
	request(app)
	    .post("/add/User")
	    .send(user)
	    .expect(400)
	    .end((err, res) => {

		/* There Should Not Be A Server Error */
		if (err) {
		    return done(err);
		}

		/* Verify The Client is At Fault and Server Detect Duplicate */
		expect(res.clientError).toBe(true);
		expect(res.serverError).toBe(false);
		expect(ERRNO[res.body.code]).toBe("DuplicateKey");
		return done();
	    });
    });

    // it("Should Be Able Query By Properties And Update The Play", (done) => {

    // 	/* Reacees Database To Confirm Data is Present and Valid */
    // 	var play = DATA.onePlay;
    // 	request(app)
    // 	    .get("/getPlay")
    // 	    .send(play)
    // 	    .expect(200)
    // 	    .expect((res, err) => {

    // 		if (err) {
    // 		    return done(err);
    // 		}
    // 		expect(res.clientError).toBe(false);
    // 		expect(res.serverError).toBe(false);
    // 		expect(verifyClientServer(play, res.body))
    // 		    .toBe(true);

    // 		/* Make Changes to the Client's Play and Post For An Update */
    // 		play = res.body;
    // 		play.timePeriod = "18th Century";
    // 		play.copies = 50;
    // 		request(app)
    // 		    .patch("/updatePlayID/" + play._id)
    // 		    .send(play)
    // 		    .expect(200)
    // 		    .end((err, res) => {

    // 			/* There Should Not Be A Server Error */
    // 			if (err) {
    // 			    return done(err);
    // 			}
    // 			expect(res.clientError).toBe(false);
    // 			expect(res.serverError).toBe(false);
    // 			expect(verifyClientServer(play, res.body))
    // 			    .toBe(true);
    // 		    });
    // 		return done();
    // 	    })
    // 	    .catch((err) => {
    // 		return done(err);
    // 	    });
    // });

    // it("Should Query and Delete A Play Via ID ", (done) => {

    // 	var play = DATA.onePlay;
    // 	request(app)
    // 	    .get("/getPlay")
    // 	    .send(play)
    // 	    .expect(200)
    // 	    .expect((res, err) => {

    // 		if (err) {
    // 		    return done(err);
    // 		}
    // 		expect(res.clientError).toBe(false);
    // 		expect(res.serverError).toBe(false);
    // 		expect(verifyClientServer(play, res.body))
    // 		    .toBe(true);

    // 		play = res.body;
    // 		request(app)
    // 		    .delete("/removePlayID/" + play._id)
    // 		    .expect(200)
    // 		    .expect((res, err) => {

    // 			if (err) {
    // 			    return done(err);
    // 			}
    // 			var awk = res.body;
    // 			expect(awk.n).toBe(1);
    // 			expect(awk.ok).toBe(1);

    // 			/* Need To Test That Proper Error Result is Returned*/
    // 			/*Code Here :) */

    // 			request(app)
    // 			    .get("/getPlay")
    // 			    .send({copies: play.copies})
    // 			    .expect(400)
    // 			    .end((err, res) => {

    // 				if (err) {
    // 				    return done(err);
    // 				}
    // 				expect(res.clientError).toBe(true);
    // 				expect(res.serverError).toBe(false);
    // 				expect(ERRNO[res.body.code]).toBe("QueryMiss");
    // 				return done();
    // 			    });
    // 		    }).catch((err) => {
    // 			return done(err);
    // 		    });
    // 	    })
    // 	    .catch((err) => {
    // 		return done(err)
    // 	    });

    // });

});


// describe("Multiple Play Unit Tests", () => {

//     it("Should Be Able To Create Multiple", (done) => {

// 	var plays = DATA.fivePlays;
// 	request(app)
// 	    .post("/addPlays")
// 	    .send(plays)
// 	    .expect(200)
// 	    .end((err, res) => {

// 		if (err) {
// 		    return done(err);
// 		}

// 		expect(res.clientError).toBe(false);
// 		expect(res.serverError).toBe(false);
// 		return done();
// 	    });
//     })
// });
