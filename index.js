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

// Once logged in, the user should be taken to /me where they can see their username on the page.
// A test for each aforementioned route should be written in tests/test_whoami.py
// Fill in the "Implementation" and "Limitations/Future Work" sections of the NOTES.rst file - future work - staying logged in, implementing cookies etc...

app.get("/", (req, res) => {
  res.render("base");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// A new user should be able to sign up with username and password at the /signup page.
app.post("/signup", async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  await user.save();
  req.session.user_id = user._id; //when you signup for a new user grab the _id for the user and associate it with an individual browser
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// After signing up, a user should be able to login with username and password at the /login page.
//when you login to a new session grab the _id for the user. Associating a user id in the session with an individual browser. if validPassword is successful user is sent to '/me'. if authentication fails user is routed back to '/login' page.
app.post("/login", async (req, res) => {
  const { password, username } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
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
app.get("/me", async (req, res) => {
  const { username } = req.session;
  // const user = await User.findOne({ username });
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  res.render("me", { username: username });
});

app.listen(3000, () => {
  console.log("Whoami is being served");
});
