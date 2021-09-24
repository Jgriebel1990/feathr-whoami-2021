const express = require("express");
const app = express();
const User = require("./models/user");

app.get("/secret", (req, res) => {
  res.send("this is secret");
});

app.listen(3000, () => {
  console.log("Whoami is being served");
});
