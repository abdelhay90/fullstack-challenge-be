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
    models.Vehicle.findOne({ where: { id } }).then(
        (vehicle) => {
            if (!vehicle) {
                next(new Error('No user with that id'))
            } else {
                req.vehicle = vehicle
                next()
            }
        },
        (error) => {
            next(error)
        },
    )
}

/**
 * get all vehicles in db
 * @param req
 * @param res
 * @param next
 */
exports.get = function(req, res, next) {
    models.Vehicle.findAll().then(
        (data) => {
            res.json(data.map((item) => item.toJSON()))
        },
        (error) => {
            next(error)
        },
    )
}

/**
 * get one vehicle by id
 * @param req
 * @param res
 * @param next
 */
exports.getOne = function(req, res, next) {
    res.json(req.vehicle)
}

/**
 * update existing vehicle
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.put = async function(req, res, next) {
    let vehicle = req.vehicle
    let update = req.body

    try {
        let updated = await vehicle.update({ ...update })
        logger.log(`new update to vehicle ${JSON.stringify(updated.toJSON())}`)
        res.json(updated)
    } catch (e) {
        next(e)
    }
}

/**
 * adding new vehicle
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.post = async function(req, res, next) {
    try {
        const data = {
            ...req.body,
            CustomerId: req.body.customerId,
        }
        let vehicle = await models.Vehicle.create(data, {
            include: [models.Customer],
        })
        logger.log(`new vehicle ${JSON.stringify(vehicle.toJSON())} added`)
        res.json(vehicle.toJSON())
    } catch (err) {
        next(err)
    }
}

/**
 * delete existing vehicle
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.delete = async function(req, res, next) {
    try {
        await req.vehicle.destroy()
        logger.log(`vehicle ${JSON.stringify(req.vehicle.toJSON())} deleted`)
        res.json(req.vehicle.toJSON())
    } catch (e) {
        next(e)
    }
}
