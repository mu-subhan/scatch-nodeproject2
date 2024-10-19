const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model")
const bcrypt = require('bcryptjs')

router.get('/',function(req,res){
    res.send("it is working");
});




//  route is users/register 
router.post("/register", function(req,res){
    try{
        let {fullname,password,email}= req.body;

    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function (err,hash){
            if(err) return res.send(err.message);
            else{
               let user = await userModel.create({
                    fullname,
                    password,
                    email,
                });
                res.send(user);
            }
            })
    })

    } catch(err){
        res.send(err.message);
        
    }

})
module.exports= router;