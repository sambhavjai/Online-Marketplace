const express = require('express');
const router = express.Router();

const {getOrderById} = require('../controllers/order');

router.param("orderId",getOrderById);

module.exports = router;