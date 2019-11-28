const logger = require('../utils/logger');

module.exports = (error, req, res, next)=> {
    // if error thrown from jwt validation check
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
        return;
    }

    logger.error(error.stack);
    const {statusCode, message, data, validation} = error;
    res.status(statusCode).json({
        message,
        data,
        validation
    })
};
