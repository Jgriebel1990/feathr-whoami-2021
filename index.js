const express = require("express");
const app = express();
const User = require("./models/user");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// A new user should be able to sign up with username and password at the /signup page. - app.get
// After signing up, a user should be able to login with username and password at the /login page.
// Once logged in, the user should be taken to /me where they can see their username on the page.
// Navigating to /logout should log the user out and take them back to /login.
// Users should not be able to access /me without logging in.
// A test for each aforementioned route should be written in tests/test_whoami.py
// Fill in the "Implementation" and "Limitations/Future Work" sections of the NOTES.rst file

app.get("/base", (req, res) => {
  res.render("base");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/me", (req, res) => {
  res.render("me");
});

app.get("/secret", (req, res) => {
  res.send("this is secret");
});

app.listen(3000, () => {
  console.log("Whoami is being served");
});
