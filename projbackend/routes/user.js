const express = require('express');
const router = express.Router();

const {getUserById,getUser,updateUser,getUserOrders} = require('../controllers/user');
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth');

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);

router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);

router.get("/user/orders/:userId",isSignedIn,isAuthenticated,getUserOrders);
module.exports = router;