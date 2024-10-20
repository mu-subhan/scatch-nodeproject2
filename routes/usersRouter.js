const express = require("express");
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/authController")

router.get('/',function(req,res){
    res.send("it is working");
});

//  route is users/register  to check on postman
router.post("/register",registerUser);

// login router
// you can check thi via route whih is users/login
router.post("/login",loginUser);

module.exports= router;