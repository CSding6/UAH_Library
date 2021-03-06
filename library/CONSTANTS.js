/**
 * The CONSTANTS.js file stores all the commonly used strings used in NodeJS to
 * indetify events and the objects used to set low level configuration options
 * such a setting the properties of a connection. This files primary purpose is
 * to prevent run-time errors due to misspelled strings. It is also a convenint
 * location for maintianing configuration options which could vary from server
 * to server.
 *
 * @author Eric William Martin
 * @module CONSTANTS
 */


/**
 * Constants used to indentify the various events which occur during a newtwork
 * connection to a remote database.
 *
 * @property NETWORK_EVENTS
 * @final
 * @type {Object}
 */
const NETWORK_EVENTS = {
    OPEN: "open",
    CONNECTED: "connected",
    CONNECTING: "connecting",
    RECONNECT: "reconnected",
    CLOSE: "close",
    DISCONNECTED: "disconnected",
    DISCONNECTING: "disconnecting",
    ERROR: "error"
};

const HOST = process.env.MONGODB_URI || "mongodb://localhost:27017/UAH_LIBRARY";



/**
 * Constants used for defining the API.
 *
 * @property API
 * @final
 * @type {Object}
 */
const API = {

}


/**
 * A collection of configuration objects used to simplify the task of setting
 * the properties of low level tasks.
 *
 * @property CONFIG
 * @final
 * @type {Object}
 */
const CONFIG = {

    /**
     * Configuration object used to configure the
     * network properties betweeen the server and the
     * remote database.
     *
     * @property CONN_OPTS
     * @final
     * @type {Object}
     */
    CONN_OPTS : {
	socketOptions: {keepAlive: 1000, connectTimeOutMS: 3000}
    }
};


/* Export CONSTANTS to other modules. */
module.exports = {
    CONSTANTS :
    {
	HOST,
	NETWORK_EVENTS,
	API,
	CONFIG
    }
};
