
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectToMongo =  mongoose.connect("mongodb://localhost:27017/OTP").then(() => {
  console.log("connection with mongoDB successfull");
});

module.exports = connectToMongo;