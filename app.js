"use strict";

require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/* Routes import */
const skillsRoute = require("./routes/skills");
const opportunitiesRoute = require("./routes/opportunities");
const userRoute = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front-end/build")));

app.use("/api/skills", skillsRoute);
app.use("/api/opportunities", opportunitiesRoute);
app.use("/api/user", userRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front-end/build/index.html"));
});

module.exports = app;
