"use strict";
/** Express app for ChoresApp. */
const path = require('path');
const express = require("express");
//security
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require('cookie-parser');
//middleware and error handling
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/authMiddleware");

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const memberRoutes = require("./routes/members");
const locationRoutes = require("./routes/locations");
const resourceRoutes = require("./routes/resources");

const morgan = require("morgan");
const app = express();

app.use(cors());
app.options('*', cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

app.use(morgan("tiny"));
app.use(authenticateJWT);
// ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/members", memberRoutes);
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/resources", resourceRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;
