const express = require("express");
const app = express();
const User = require("./models/user");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

mongoose
  .connect("mongodb://localhost:27017/whoami", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((e) => {
    console.log("Mongo Connection Error");
    console.log(e);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "not a secret", resave: true, saveUninitialized: true })
);

app.get("/", (req, res) => {
  res.render("base");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// A new user should be able to sign up with username and password at the /signup page.
app.post("/signup", async (req, res) => {
  //I destructured the req.body.username and req.body.password so I could pass those values into the hash method and when creating a new user in the database.
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    //password: hash allows the password to become hashed in the database
    password: hash,
  });
  await user.save();
  //when you signup for a new user grab the _id for the user and associate it with an individual browser
  req.session.user_id = user._id;
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// After signing up, a user should be able to login with username and password at the /login page.
app.post("/login", async (req, res) => {
  const { password, username } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  //if validPassword is successful user is sent to '/me'. if authentication fails user is routed back to '/login' page.
  if (validPassword) {
    //the req.session.username = username was the key to being able to render the username on /me. This took me the most time out of any part of my code.
    //passing the username through the login made the username available once the login was successful and /me was rendered.
    req.session.username = username;
    req.session.user_id = user._id;
    res.redirect("/me");
  } else {
    res.redirect("/login");
  }
});

// Navigating to /logout should log the user out and take them back to /login.
app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/login");
});

// Users should not be able to access /me without logging in.
// Once logged in, the user should be taken to /me where they can see their username on the page.
app.get("/me", (req, res) => {
  //I destructured username from req.session.username and was able to pass username into the render method which gave me the result that was needed.
  const { username } = req.session;
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  res.render("me", { username: username });
});

app.listen(3000, () => {
  console.log("Whoami is being served");
});
