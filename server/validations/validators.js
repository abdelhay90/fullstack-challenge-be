const { body, check } = require('express-validator')

exports.email = check('email')
    .isEmail()
    .not()
    .isEmpty()
exports.password = check('password').isLength({ min: 8 })
