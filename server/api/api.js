const router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/auth', require('./auth/authRoutes'));
router.use('/users', require('./user/userRoutes'));
router.use('/customers', require('./customer/customerRoutes'));
router.use('/vehicles', require('./vehicle/vehicleRoutes'));

module.exports = router;
