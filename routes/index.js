const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    const error = req.query.error ? [req.query.error] : []; // Make it an array
    res.render("index", { error }); // Pass the error to the view
});

module.exports = router;
