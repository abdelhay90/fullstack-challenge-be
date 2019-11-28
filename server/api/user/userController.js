const signToken = require('../auth/auth').signToken;
const models = require('../../models');

/**
 * define id params when detected in the route and get associated record to it
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.params = function (req, res, next, id) {
    models.User.findOne({where: {id}}).then(
        (user) => {
            if (!user) {
                next(new Error('No user with that id'));
            } else {
                req.user = user.toJson();
                next();
            }
        },
        (error) => {
            next(error)
        });
};

/**
 * get all users in db
 * @param req
 * @param res
 * @param next
 */
exports.get = function (req, res, next) {
    models.User.findAll().then((data) => {
        res.json(data.map((item) => item.toJson()));
    }, (error) => {
        next(error);
    })
};

/**
 * get one user by id
 * @param req
 * @param res
 * @param next
 */
exports.getOne = function (req, res, next) {
    res.json(req.user);
};

/**
 * update existing user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.put = async function (req, res, next) {

    let user = req.user;
    let update = req.body;

    try {
        let updated = await user.update({...update});
        res.json(updated)
    } catch (e) {
        next(e)
    }

};

/**
 * adding new user or sign up
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.post = async function (req, res, next) {
    try {
        let user = await models.User.create(req.body);
        const token = signToken(user._id);
        res.json({token: token});
    } catch (err) {
        next(err)
    }
};

/**
 * delete existing user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.delete = async function (req, res, next) {
    try {
        await req.user.destroy();
        res.json(req.user.toJson());
    } catch (e) {
        next(e)
    }
};

/**
 * get data against current user
 * @param req
 * @param res
 */
exports.me = function (req, res) {
    res.json(req.user.toJson());
};
