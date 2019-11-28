require('dotenv').config();

// intro point for our server.
// PRO-TIP: if you have an auth.js file
// on the root of a folder in node
// you can just require that folder and node will
// automatically require the auth.js on the root

// setup config first before anything by requiring it
const config = require('./server/config/config');
const app = require('./server/server');
const logger = require('./server/utils/logger');

app.listen(config.port, () => {
    logger.log(`listening on ${config.port}`);
});



