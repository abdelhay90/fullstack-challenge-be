const signToken = require('./auth').signToken;
const models = require('../../models');
const validations = require('../../validations/validationHandler');
const logger = require('../../utils/logger');

exports.signin = function (req, res, next) {
    // req.user will be there from the middleware
    // verify user. Then we can just create a token
    // and send it back for the client to consume
    let token = signToken(req.user.id);
    logger.log(`user ${JSON.stringify(req.user.toJson())} signed in`);
    res.json({token: token});
};

exports.signup = async function (req, res, next) {
    try {
        validations(req);
        let user = await models.User.create(req.body);
        const token = signToken(user._id);
        logger.log(`new user signed up ${JSON.stringify(user.toJson())}`)
        res.json({token: token});
    } catch (err) {
        next(err)
    }
};
