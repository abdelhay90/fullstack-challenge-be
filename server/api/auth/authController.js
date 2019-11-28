const signToken = require('./auth').signToken;
const models = require('../../models');
const validations = require('../../validations/validationHandler')

exports.signin = function (req, res, next) {
    // req.user will be there from the middleware
    // verify user. Then we can just create a token
    // and send it back for the client to consume
    let token = signToken(req.user.toJson().id);
    res.json({token: token});
};

exports.signup = async function (req, res, next) {
    try {
        validations(req);
        let user = await models.User.create(req.body);
        const token = signToken(user._id);
        res.json({token: token});
    } catch (err) {
        next(err)
    }
};
