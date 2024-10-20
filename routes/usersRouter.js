const express = require("express");
const router = express.Router()
const isLoggedin = require("../middlewares/isLoggedIn");
const {
    registerUser,
    loginUser,
    logout,
} = require ("../controllers/authController");

router.get("/",function (req,res){
    res.send("it is working");
});

// route is users/register 
router.post("/register",registerUser);

// for login users/login 
router.post("/login",loginUser);

router.get("/logout",logout);

module.exports = router