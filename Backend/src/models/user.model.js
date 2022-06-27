const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  useremail: {
    type: String,
    required: true,
  },

  userpassword: {
    type: String,
    required: true,
  },
});
 
const User = mongoose.model("user", user_schema);
module.exports = User;

