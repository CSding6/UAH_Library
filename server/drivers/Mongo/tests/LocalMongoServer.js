const express = require("express");
const bodyParser = require("body-parser");

const {Play} = require("./../MongoModels");
const {UTILS} = require("./../TOOLS");
const {TEST_UTILS} = require("./../TOOLS");
const {CONSTANTS} = require("./../TOOLS");
const {NODE_ERRORS} = require("./../TOOLS");

const {ModelFactory} = require("./../MongoFactory.js");
const {app} = UTILS;
const {printObj} = UTILS;
const {logErrno} = NODE_ERRORS;
const {Mongo} = require("./../MongoModels/Mongo.js");

const Control = new Mongo(Play);

app.post("/addPlay", (req, res) => {

    Control.addNewDocument_ModifyDatabase(req)
	.then((doc) => {
	    res.send(doc);
	})
	.catch((err) => {
	    logErrno(err);
	    res.status(400).send(err);
	});
});

app.get("/getPlayID/:id", (req, res) => {

    Control.findOneByID_QueryDatabase(req)
	.then((doc) => {
	    res.send(doc);
	})
	.catch((err) => {
	    logErrno(err);
	    res.status(400).send(err);
	});
});

app.get("/getPlay", (req, res) => {

    Control.findFirstOneByProp_QueryDatabase(req)
	.then((doc) => {
	    res.send(doc);
	})
	.catch((err) => {
	    logErrno(err);
	    res.status.send(err);
	});
});

app.patch("/updatePlayID/:id", (req, res) => {

    Control.findOneByID_UpdateDatabase(req)
	.then((doc) => {
	    res.send(doc);
	})
	.catch((err) => {
	    logErrno(err);
	    res.status(400).send(err);
	});
});

app.listen(3000, () => {
    console.log("Starting MongoDB server on port 3000");
});

module.exports = {app};
