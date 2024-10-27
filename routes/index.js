const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const product= require("../models/product-model");
const { route } = require("./ownersRouter");
const userModel = require("../models/user-model");

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
    res.render("index", { error, loggedin:false });
});

// Route for the shop page with product data
router.get("/shop", isLoggedin, async function (req, res) {
    try {
        
        // Fetch all products from the database
        const products = await product.find();
   let success = req.flash("success");
        // Pass the products array to the shop template
        res.render('shop', { products, success });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Server error");
    }
});

router.get("/cart", isLoggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");

    // Create an array to hold bill values for each item
    const bills = user.cart.map(item => {
        return Number(item.price) + 20 - Number(item.discount);
    });

    res.render("cart", { user, bills }); // Pass the bills array to the template
});


router.get("/addtocart/:productid", isLoggedin,async function (req,res) {
    let user = await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop")
    
})
router.get("/logout",isLoggedin,function(req,res){
    res.render("shop")
})

module.exports = router;
