const express=require('express');
const router=express.Router();

router.get("/signout",(req,res)=>{
    return res.send("User is signed out");
});

module.exports=router;