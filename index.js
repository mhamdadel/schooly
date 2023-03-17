require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
require("./config/passport");

// mongodb configuration
connectDB();
// view engine setup

// init the cors liberary ==> to use cookies and headers
app.use(cors({ credentials: true, origin: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes config
app.use(require("./routes/index"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        status: err.status,
        message: err.message,
    });
});

app.set("port", process.env.HTTP_PORT);
app.listen(process.env.HTTP_PORT, () => {
    console.log("Server running at port " + process.env.HTTP_PORT);
});

module.exports = app;
