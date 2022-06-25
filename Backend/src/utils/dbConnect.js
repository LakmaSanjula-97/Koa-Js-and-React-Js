const mongoose = require("mongoose");

const dbConnect = () => {
  const dbConStr = process.env.MONGODB_URL;

  mongoose.connect(dbConStr, () => {
    console.log("__Database connected__");
  });
};

module.exports = { dbConnect };


// MONGODB_URL = mongodb://localhost:27017/managementdb
//MONGODB_URL = mongodb+srv://sanjula:Lakma123@cluster0.kga7s.mongodb.net/sp1_db?retryWrites=true&w=majority