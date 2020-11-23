const express = require('express');
const router = express.Router();

const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth');
const {getCategoryById, createCategory, getCategory, getAllCategories, updateCategory} = require('../controllers/category');
const {getUserById} = require('../controllers/user');

router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

router.get("/category/:categoryId",getCategory);

router.get("/categories",getAllCategories);

router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory);
module.exports = router;