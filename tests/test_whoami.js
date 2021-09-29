// const index = require("index");
const request = require("supertest");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

test("base route works", (done) => {
  request(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect("Content-Length", 10)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err;
    });
});
