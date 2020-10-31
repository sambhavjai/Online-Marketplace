const express=require('express');
const router=express.Router();
const {check,validationResult} = require('express-validator');
const {signout,signup,signin}=require('../controllers/auth');

router.get("/signout",signout);

router.post("/signup",[
    check("name").isLength({min: 3}).withMessage("Name should be of atleast 3 chars"),
    check("email").isEmail().withMessage("Please provide a correct email"),
    check("password").isLength({min: 3}).withMessage("Password should of atleast 3 length")
],signup);

router.post("/signin",[
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min: 1}).withMessage("Password is required")
],signin);

module.exports=router;