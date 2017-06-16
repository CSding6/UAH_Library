
const express = require("express");
const bodyParser = require("body-parser");

const {Play} = require("./../MongoModels");
const {UTILS} = require("./../TOOLS");
const {TEST_UTILS} = require("./../TOOLS");
const {CONSTANTS} = require("./../TOOLS");

const {app} = UTILS;
const {printObj} = UTILS;
const {httpJSON_2_ObjArr} = TEST_UTILS;

app.post("/testAddOnePlay", (req, res) => {

    var playArray = httpJSON_2_ObjArr(req, Play);
    playArray.pop().addToDatabase()
	.then((doc) => {
	    res.send(doc);
	})
	.catch((err) => {
	    res.status(400).send(err);
	});
});

app.post("/testQueryOnePlay", (req, res) => {

    Play.findOneFromDatabase(req[0])
	.then((doc) => {
	    res.send(doc);
	})
	.catch((err) => {
	    res.status(400).send(err);
	});
    
});

app.post("/testUpdateOnePlay", (req, res) => {

    var playArray = httpJSON_2_ObjArr(req, Play);
    playArray.pop().saveToDatabase()
	.then((doc) => {
	    res.send(doc);
	})
	.catch((err) => {
	    console.log(err);
	    res.status(400).send(err);
	});
});

app.post("/addFiveUniquePlays", (req, res) => {

    var cruc = httpJSON_2_ObjArr(req, Play);

    cruc.save().then(
	(doc) => {
	    res.send(doc);
	},
	(err) => {
	    res.status(400).send(err);
	}
    ).catch((err) => {
	console.error("Error: ", e);
    });
});

app.listen(3000, () => {
    console.log("Starting MongoDB server on port 3000");
});

module.exports = {app};
