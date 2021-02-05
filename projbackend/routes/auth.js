const express=require('express');
const router=express.Router();
const {check,validationResult} = require('express-validator');
const {signout,signup,signin,isSignedIn}=require('../controllers/auth');

router.get("/signout",signout);

router.post("/signup",[
     check("name", "name should be at least 3 char").isLength({ min: 3 }),
     check("email", "email is required").isEmail(),
     check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],signup);

router.post("/signin",[
    check("email").isEmail().withMessage("Email is required"),
    check("password").isLength({min: 1}).withMessage("Password is required")
],signin);

router.get("/test",isSignedIn,(req,res)=>{
    return res.json({
        message: "User authorised"
    });
});

module.exports=router;