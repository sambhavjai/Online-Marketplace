const User=require("../models/user");

exports.signout=(req,res)=>{
    res.json({
        message: "You are signed out"
    })
};

exports.signup=(req,res)=>{
    const user=new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "There is an error"
            });
        }
        else
        {
            return res.json(user);
        }
    })    
};