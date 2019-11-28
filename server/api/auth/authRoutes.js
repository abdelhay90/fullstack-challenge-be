const router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const controller = require('./authController');
const  {email, password} = require('../../validations/validators');

// before we send back a jwt, lets check
// the password and username match what is in the DB
router.post('/signin', verifyUser(), controller.signin);
router.post('/signup', [email, password], controller.signup);

module.exports = router;
