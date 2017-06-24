const express = require("express");
const bodyParser = require("body-parser");

const {UTILS} = require("./../TOOLS");
const {TEST_UTILS} = require("./../TOOLS");
const {CONSTANTS} = require("./../TOOLS");
const {NODE_ERRORS} = require("./../TOOLS");

const {app} = UTILS;
const {printObj} = UTILS;
const {logErrno} = NODE_ERRORS;

const {Control} = require("./../MongoModels")

function initMode(req) {

    try {
	var Mode = Control(req.params.mode);
    } catch (err) {
	logErrno(err);
	res.status(400).send(err);
	return null;
    }
    return Mode;
}

app.post("/add/:mode", (req, res) => {

    var Mode;
    if ((Mode = initMode(req))) {
	Mode.addNewDocument_ModifyDatabase(req)
	    .then((doc) => {
		res.send(doc);
	    })
	    .catch((err) => {
		logErrno(err);
		res.status(400).send(err);
	    });
    }
});

app.get("/get/:mode", (req, res) => {

    var Mode;
    if ((Mode = initMode(req))) {
	Mode.findFirstOneByProp_QueryDatabase(req)
	    .then((doc) => {
		res.send(doc);
	    })
	    .catch((err) => {
		logErrno(err);
		res.status(400).send(err);
	    });
    }
});

app.get("/getID/:mode/:id", (req, res) => {

    var Mode;
    if ((Mode = initMode(req))) {
	Mode.findOneByID_QueryDatabase(req)
	    .then((doc) => {
		res.send(doc);
	    })
	    .catch((err) => {
		logErrno(err);
		res.status(400).send(err);
	    });
    }
});

app.patch("/updateID/:mode/:id", (req, res) => {

    var Mode;
    if ((Mode = initMode(req))) {
	Mode.findOneByID_UpdateDatabase(req)
	    .then((doc) => {
		res.send(doc);
	    })
	    .catch((err) => {
		logErrno(err);
		res.status(400).send(err);
	    });
    }
});

app.delete("/removeID/:mode/:id", (req, res) => {

    var Mode;
    if ((Mode = initMode(req))) {
	Mode.removeOneByID_ModifyDatabase(req)
	    .then((awk) => {
		res.send(awk);
	    })
	    .catch((err) => {
		logErrno(err);
		res.status(400).send(err);
	});
    }
});


app.post("/add/batch/:mode", (req, res) => {

    var Mode;
    if ((Mode = initMode(req))) {
	Mode.addMultipleDocuments_ModifyDatabase(req)
	    .then((docs) => {
		res.send(docs);
	    })
	    .catch((err) => {
		console.log(err);
		res.status(400).send(err);
	    });
    }
});

app.listen(3000, () => {
    console.log("Starting MongoDB server on port 3000");
});

module.exports = {app};
