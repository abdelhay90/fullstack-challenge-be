require('dotenv').config();

// intro point for our server.
// PRO-TIP: if you have an auth.js file
// on the root of a folder in node
// you can just require that folder and node will
// automatically require the auth.js on the root

// setup config first before anything by requiring it
const config = require('../../config/config');
const logger = require('../../utils/logger');
const app = require('../../server');

module.exports = app;
