const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI;
console.log("MongoDB URI:", uri); // Add this line

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
