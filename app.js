require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const app = express();

// EJS and Body Parser
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


// Mongoose and Connection
const mongodb = require("mongodb");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userResumeDB", { useNewUrlParser: true, useUnifiedTopology: true });
// Add findOrCreate plugin for mongoose
const findOrCreate = require("mongoose-findorcreate");

// Need to test DB for updating found user

// Create child schema for message content
// let messageSchema = new mongoose.Schema({
//     contactMessage: String
// });
// Parent schema for contacts
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    subject: {
        type: [String]
    },
    message: {
        type: [String]
    }
});

// Add find or create plugin
userSchema.plugin(findOrCreate);
// Create user model
const User = mongoose.model("User", userSchema);

// Home Page
app.get("/", function(req, res) {
    res.render("home");
    console.log(__dirname);
});

// Portfolio Page
app.get("/portfolio", function(req, res) {
    res.render("portfolio");
});

// Services Page
app.get("/services", function(req, res) {
    res.render("services");
});

// About Page
app.get("/about", function(req, res) {
    res.render("about");
});

// Contact Page
app.get("/contact", function(req, res) {
    res.render("contact");
});

app.post("/contact", function(req, res) {

    let contact = {
        name: req.body.contactName,
        email: req.body.contactEmail,
        subject: req.body.contactSubject,
        message: req.body.contactMessage,
        file: req.body.filename
    };


});

// User.findOneAndUpdate ()

// Message recieved page when contact info is sent
app.get("/message", function(req, res) {
    res.render("message");
});

// Error page for any error that occurs
app.get("/error", function(req, res) {
    res.render("error");
});

//Login Page

app.get("/login", function(req, res) {
    res.render("login");
});

// app.post("/login", (req, res) => {
//     const user = new User({
//         name: req.body.contactName,
//         email: req.body.contactEmail,
//         subject: req.body.contactSubject,
//         message: req.body.contactMessage
//     });

//     // FindOne is working. Need to change to find one and update, currently not successful

//     User.findOne({ email: user.email }, function(err, foundUser) {
//         if (err) {
//             console.log(err);
//             res.render("error");
//         }
//         // Push new message to array of messages on DB
//         // Problem: CastError: Cast to string failed for value "["Test for push"]" at path "message"
//         if (foundUser) {
//             user.message.push(user.message);
//             res.render("message");
//             console.log("User with email has been found." + user.message);
//         } else {
//             user.save();
//             res.render("message");
//             console.log("This is a new user." + user.email);
//         }
//     });
// });

// Server running check
app.listen(3000, function() {
    console.log("Server started on port 3000.");
});