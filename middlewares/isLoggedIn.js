const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
    // Check if the token is present in cookies
    if (!req.cookies.token) {
        req.flash("error", "You need to login first");
        return res.redirect('/'); // Redirect to homepage
    }

    try {
        // Verify the token using the secret key
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        
        // Find the user based on the email from the decoded token
        let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password"); // Exclude password from the user object

        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect('/'); // Redirect if user is not found
        }

        req.user = user; // Attach user to the request object
        next(); // Proceed to the next middleware/route
    } catch (err) {
        // Handle errors (invalid token, etc.)
        req.flash("error", "Something went wrong.");
        res.redirect("/"); // Redirect to homepage on error
    }
};
