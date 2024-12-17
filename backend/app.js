const createError = require("http-errors");
const express = require("express");
const path = require("path");

var adminRouter = require("./routes/admin");
var uploadRouter = require("./routes/upload");
var recodeRouter = require("./routes/recode");
var app = express();

const port = 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// config env
require("dotenv").config({ path: "./config/env/.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", adminRouter);
app.use("/", uploadRouter);
app.use("/", recodeRouter);

app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}! http://localhost:${port}/`
  )
);
