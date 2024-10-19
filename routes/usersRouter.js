const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model")

router.get('/',function(req,res){
    res.send("it is working");
});


//  route is users/register 
router.post("/register",async function(req,res){
    try{
        let {fullname,password,email}= req.body;

   let user = await userModel.create({
        fullname,
        password,
        email,
    });
    res.send(user);
    } catch(err){
        res.send(err.message);
        
    }

})
module.exports= router;