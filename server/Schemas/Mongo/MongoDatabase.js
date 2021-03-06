"use strict"

/* Import Mongoose and Constants Libraries */
const {NODE_LIB}       = require("./../library");
const {CONSTANTS}      = require("./../library");
const {InitMongoDB}     = require("./InitMongo.js");
const {mongoose}       = NODE_LIB;
const {NETWORK_EVENTS} = CONSTANTS;
const {CONFIG}         = CONSTANTS;
const {HOST}           = CONSTANTS;


/* Enable Mongoose Promises. Mongoose Will Always Try To Reconnect */
mongoose.Promise = global.Promise;
var db = mongoose.createConnection(HOST, CONFIG.CONN_OPTS);

/* Set Up Database if new environment it detected. Abort if set up
 * fails for any reason.
 */
InitMongoDB(HOST).then(() => {

    db.on(NETWORK_EVENTS.OPEN, () =>
	  console.log("Connection Is Open On", HOST));

    db.on(NETWORK_EVENTS.CONNECTED, () =>
	  console.log("Connection Established"));

    db.on(NETWORK_EVENTS.CONNECTING, () =>
	  console.log("Cuurently Estabishing Connection"));

    db.on(NETWORK_EVENTS.RECONNECT, () =>
	  console.log("Attempting To Reconnect"));

    db.on(NETWORK_EVENTS.CLOSE, () =>
	  console.log("Connection is Closed"));

    db.on(NETWORK_EVENTS.DISCONNECTED, () =>
	  console.log("Connection is Disconnected"));

    db.on(NETWORK_EVENTS.DISCONNECTING, () =>
	  console.log("Connection is Currently Disconnecting"));

    db.on(NETWORK_EVENTS.ERROR, (err) =>
	  console.error("Connection Error: ". err));

    process.on("SIGINT", () => {
	db.close(function() {
	    console.log("Connection Killed Via App Termination");
	    process.exit(0);
	});
    });
}).catch((err) => process.abort(err));

module.exports = {
    MongoDB : db
}

