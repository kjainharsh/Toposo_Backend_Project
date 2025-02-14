const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
const connectdb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successfull");
    }
    catch (error) {
        console.log("database connection failed");
        process.exit(0);
    }
};

module.exports = connectdb;