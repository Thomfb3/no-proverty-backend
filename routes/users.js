"use strict"
const express = require("express");
const router = new express.Router();
const UserController = require('./../controllers/userController');
const { uploadImages } = require('../helpers/handlerFileUpload');
const { ensureLoggedIn, ensureAdmin } = require("../middleware/authMiddleware.js");


/** Routes for users. */
router
    .route("/")
    .get(
        ensureLoggedIn,
        UserController.getAllUsers
    )


router
    .route('/:id')
    .get(
        ensureLoggedIn,
        UserController.getUser
    )
    .patch(
        ensureLoggedIn,
        uploadImages,
        UserController.resizeUserImages,
        UserController.updateUser
    )
    .delete(
        ensureLoggedIn,
        ensureAdmin,
        UserController.deleteUser
    );



module.exports = router;