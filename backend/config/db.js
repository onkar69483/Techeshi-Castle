const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://jay110504:42hBGhBpEEqphnn9@cluster1.byhut.mongodb.net/techeshi_castle?retryWrites=true&w=majority&appName=Cluster1" );
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
