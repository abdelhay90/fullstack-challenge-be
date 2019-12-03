const express = require('express');
const app = express();
const api = require('./api/api');
const config = require('./config/config');
const db = require('./models');
const errorHandler = require('./middleware/errorHandler');
// const auth = require('./api/auth/routes');
// db.url is different depending on NODE_ENV
// todo: db connection initialization

if (config.seed) {
    // require('./util/seed');
}
if (config.env === 'development' && process.argv[2] === '-u') {
    db.sequelize.sync({ force: true }).then(async () => {});
}
// setup the app middleware
require('./middleware/appMiddleware')(app);

app.use('/', express.static('build'));

// setup the api
app.use('/api', api);

// set up global error handling
app.use(errorHandler);

// export the app for testing
module.exports = app;
