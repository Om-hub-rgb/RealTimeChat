const mongoose = require("mongoose");
const { ENV } = require("./env");

const connectDB = async () => {
    try {
        await
        mongoose.connect(ENV.MONGO_URI);
        console.log("mongoDB connected");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB
