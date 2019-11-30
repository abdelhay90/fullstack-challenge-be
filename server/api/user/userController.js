const models = require('../../models')
const logger = require('../../utils/logger')

/**
 * define id params when detected in the route and get associated record to it
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.params = function(req, res, next, id) {
    models.User.findOne({ where: { id } }).then(
        (user) => {
            if (!user) {
                next(new Error('No user with that id'))
            } else {
                req.selectedUser = user
                next()
            }
        },
        (error) => {
            next(error)
        },
    )
}

/**
 * get all users in db
 * @param req
 * @param res
 * @param next
 */
exports.get = function(req, res, next) {
    models.User.findAll().then(
        (data) => {
            res.json(data.map((item) => item.toJson()))
        },
        (error) => {
            next(error)
        },
    )
}

/**
 * get one user by id
 * @param req
 * @param res
 * @param next
 */
exports.getOne = function(req, res, next) {
    res.json(req.selectedUser.toJson())
}

/**
 * update existing user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.put = async function(req, res, next) {
    let user = req.selectedUser
    let update = req.body

    try {
        let updated = await user.update({ ...update })
        logger.log(`new update to vehicle ${JSON.stringify(updated.toJSON())}`)
        res.json(updated)
    } catch (e) {
        next(e)
    }
}

/**
 * adding new user or sign up
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.post = async function(req, res, next) {
    try {
        let user = await models.User.create(req.body)
        logger.log(`new vehicle ${JSON.stringify(user.toJSON())} added`)
        res.json(user.toJson())
    } catch (err) {
        next(err)
    }
}

/**
 * delete existing user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.delete = async function(req, res, next) {
    try {
        await req.selectedUser.destroy()
        logger.log(`user ${JSON.stringify(req.selectedUser.toJSON())} deleted`)
        res.json(req.selectedUser.toJson())
    } catch (e) {
        next(e)
    }
}

/**
 * get data against current user
 * @param req
 * @param res
 */
exports.me = function(req, res) {
    res.json(req.user)
}
