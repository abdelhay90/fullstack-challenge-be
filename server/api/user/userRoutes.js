const router = require('express').Router();
// const logger = require('../../utils/logger');
const controller = require('./userController');
const auth = require('../auth/auth');
// check if user is  authenticated or not
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

// setup boilerplate route just to satisfy a request for building
router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

// routes for adding new users and get all users
router.route('/')
    .get(checkUser, controller.get)
    .post(checkUser, controller.post);

// routes for get, put and delete operations for single user
router.route('/:id')
    .get(checkUser, controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete);

module.exports = router;
