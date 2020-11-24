const express = require('express');
const router = express.Router();

const {getProductById,createProduct} = require('../controllers/product');
const {getUserById} = require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin} = require('../controllers/auth');

router.param("productId",getProductById);
router.param("userId",getUserById);

router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

module.exports = router;