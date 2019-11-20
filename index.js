const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

//these are things that the app should use
const app = express();

// import routes
const postsRoute = require('./routes/posts')

//load view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
//gets only the info requested from the body
app.use(bodyParser.urlencoded({ extended: true }));

//monogdb connection
mongoose.connect("mongodb://localhost:27017/node-demo");

//schema definition
//schema creates a structure for the body
const registerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: "Please Enter the First name"
  },
  lastname: String,
  gender: String,
  country: String,
  city: String
});

//create an instance of the model - register is the name of the collecton. registerSchema is the name of the schema
// the model helps save the data by attaching the collection and the schema
const Register = mongoose.model("R egister", registerSchema);

//routes
// gets the data from the register form
// 'get' is an express app
app.get("/register", (req, res) => {
  res.render("form");
});

app.post("/register", (req, res) => {
  // data saved using the schema structure to the the register collection
  const register = new Register(req.body);
  //save the data in the register model
  register
    .save()
    //this is a promise.
    .then(item => {
      //'.find' queries everything in that collection '.then' returns all the items to the next form
      Register.find().then(items => {
          //render the list page and it should have access to list
        res.render("list", { users: items });
      });
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

//start server
app.listen(2000, function() {
  console.log("listening on 2000");
});
