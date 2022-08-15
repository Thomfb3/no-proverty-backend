"use strict";
const express = require("express");
const router = new express.Router();
const AuthController = require("../controllers/authController");

/** Routes for authentication. */
/** POST /auth/token:  { username, password } => { token } **/
router
    .route("/token")
    .post(AuthController.authenticateAndGetToken)

/** POST /auth/register:   { user } => { token }
 * user must include { username, password, firstName, lastName, email } **/
router
    .route("/register")
    .post(AuthController.registerAndGetToken)


module.exports = router;
