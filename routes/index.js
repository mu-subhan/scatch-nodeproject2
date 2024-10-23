const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const product= require("../models/product-model")

// Hardcoded sample products data (replace with real data if needed)
const products = [
    {
        name: 'Product 1',
        price: 1000,
        image: 'image1.jpg', // Ensure the correct path or base64 data is used
        bgcolor: '#f5f5f5',
        panelcolor: '#ffffff',
        textcolor: '#333'
    },
    {
        name: 'Product 2',
        price: 2000,
        image: 'image2.jpg',
        bgcolor: '#fafafa',
        panelcolor: '#eeeeee',
        textcolor: '#555'
    }
];

// Route for the homepage
router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

// Route for the shop page with product data
router.get("/shop", isLoggedin, async function (req, res) {
    try {// Pass the products array to the shop template
        // res.render('shop', { products: products });
        // Fetch all products from the database
        const products = await product.find();

        // Pass the products array to the shop template
        res.render('shop', { products: products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
