"use strict"
const express = require("express");
const router = new express.Router();
const MemberController = require('./../controllers/memberController');
const { uploadImages } = require('../helpers/handlerFileUpload');
const { ensureLoggedIn, ensureAdmin } = require("../middleware/authMiddleware.js");

/** Routes for members. */
router
    .route("/")
    .get(
        ensureLoggedIn,
        MemberController.getAllMembers
    )
    .post(
        ensureLoggedIn,
        MemberController.createMember
    )

router
    .route("/user/:userId")
    .get(
        ensureLoggedIn,
        MemberController.getAllMembersForUser
    );

router
    .route('/:id')
    .get(
        ensureLoggedIn,
        MemberController.getMember
    )
    .patch(
        ensureLoggedIn,
        uploadImages,
        MemberController.resizeUserImages,
        MemberController.updateMember
    )
    .delete(
        ensureLoggedIn,
        ensureAdmin,
        MemberController.deleteMember
    );



module.exports = router;