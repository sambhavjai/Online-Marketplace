const User=require("../models/user");
const {check,validationResult} = require('express-validator');
const jwt=require('jsonwebtoken');
const expressjwt=require('express-jwt');


exports.signout=(req,res)=>{
    res.clearCookie("token");
    return res.json({
        message: "You are signed out"
    })
};

exports.signup=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user=new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "There is an error"
            });
        }
        else
        {
            return res.json({
                name: user.name,
                email: user.email,
                id: user._id
            });
        }
    })    
};

exports.signin= (req,res)=>{
    const errors=validationResult(req);
    const {email,password} = req.body;
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    User.findOne({email},(err,user)=>{
        if(err|| !user)
        {
            return res.status(400).json({
                error: "User not found in the database"
            })
        }
        if(!user.authenticate(password))
        {
            return res.status(401).json({
                error: "Password does not match"
            })
        }

        const token = jwt.sign({_id: user._id},process.env.SECRET);
        res.cookie("token",token,{expire: new Date()+9999});

        const {_id,name,email,role} = user;
        return res.json({
            token,
            user: {
                _id,name,email,role
            }
        });
    });
};