const express=require("express");
const app=express();
const port=3000;
app.get("/",(req,res)=>{
    return res.send("Hello");
})
app.get("/login",(req,res)=>{
    return res.send("You are logged in");
})
app.get("/signout",(req,res)=>{
    return res.send("You are signed out");
})
app.get("/signup",(req,res)=>{
    return res.send("You are signed up");
})
app.get("/sambhav",(req,res)=>{
    return res.send("Hey lord");
})
app.listen(port,()=>{
    console.log("server is running");
})
