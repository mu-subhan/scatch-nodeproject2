const mongoose = require('mongoose');
const dbgr = require("debug")("development:mongoose");
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
.then(() => {
    dbgr("Connected to MongoDB Atlas");
    console.log("MongoDb connected")
})
.catch(err => {
    dbgr("MongoDB connection error:", err);
    console.log("MongoDb failed to connect")
});

// first install debug if you want to omit nothing can be happend in console you can use 
// export DEBUG=

// if you want to see all developement releated then run below command in terminal 
// export DEBUG=development:*