const models = require('../../models');

/**
 * define id params when detected in the route and get associated record to it
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.params = function (req, res, next, id) {
    models.Customer.findOne({where: {id}}).then(
        (customer) => {
            if (!customer) {
                next(new Error('No customer with that id'));
            } else {
                req.customer = customer.toJSON();
                next();
            }
        },
        (error) => {
            next(error)
        });
};

/**
 * get all customers in db
 * @param req
 * @param res
 * @param next
 */
exports.get = function (req, res, next) {
    models.Customer.findAll({
        include: [
            {model: models.Vehicle}
        ]
    }).then((data) => {
        res.json(data.map((item) => item.toJSON()));
    }, (error) => {
        next(error);
    })
};

/**
 * get one customer by id
 * @param req
 * @param res
 * @param next
 */
exports.getOne = function (req, res, next) {
    res.json(req.customer);
};

/**
 * update existing customer
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.put = async function (req, res, next) {

    let customer = req.customer;
    let update = req.body;

    try {
        let updated = await customer.update({...update});
        res.json(updated)
    } catch (e) {
        next(e)
    }

};

/**
 * adding new customer
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.post = async function (req, res, next) {
    try {
        let customer = await models.Customer.create(req.body);
        res.json(customer.toJSON());
    } catch (err) {
        next(err)
    }
};

/**
 * delete existing customer
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.delete = async function (req, res, next) {
    try {
        await req.customer.destroy();
        res.json(req.customer.toJSON());
    } catch (e) {
        next(e)
    }
};
