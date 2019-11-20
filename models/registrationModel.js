const mongoose = require("mongoose");//connecting the app to the database by requiring mongoose

// structure declaring our collection----schema
var nameSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    gender: String,
    city : String,
  });
  
  //creating an instance of a model from it
  module.exports = mongoose.model("User", nameSchema); //user is a collection name