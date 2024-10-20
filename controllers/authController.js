const userModel = require("../models/user-model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {genrateToken} = require("../utils/genratedToken");



module.exports.registerUser = async function(req, res) {
    try {
        let { fullname, password, email } = req.body;

        // Check if the user already exists
        let user = await userModel.findOne({ email: email });
        if (user) 
            return res.status(401).send("User already exists with this email, please login or try another email.");

        // Generate salt and hash the password
        bcrypt.genSalt(10, async (err, salt) => {
            if (err) return res.status(500).send(err.message);

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).send(err.message);

                // Create a new user with the hashed password
                user = await userModel.create({
                    fullname,
                    password: hash,  // Save the hashed password
                    email,
                });

                // Generate a token and set it as a cookie
                const token = genrateToken(user);
                res.cookie("token", token);
                res.send("User created successfully.");
            });
        });
    } catch (err) {
        res.status(500).send(err.message);  
    }
};





// 

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    // Log the email for debugging
    console.log("Login attempt with email:", email);
    

    let user = await userModel.findOne({ email: email });
     console.log("User found:", user);
    if (!user) {
        return res.status(401).json({ success: false, message: "No user exists with this email. Please create an account." });
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        if (result) {
            let token = genrateToken(user);
            res.cookie("token", token);
            return res.json({ success: true, message: "Login successful." });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }
    });
};
