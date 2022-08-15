"use strict";
const express = require("express");
const router = new express.Router();
const ResourceController = require("../controllers/resourceController");
const { ensureLoggedIn } = require("../middleware/authMiddleware.js");


/** Routes for Resource. */
router
    .route("/")
    .get(
        ensureLoggedIn,
        ResourceController.getAllResources
    )
    .post(
        ensureLoggedIn,
        ResourceController.createResource
    )

router
    .route("/:id")
    .get(
        ensureLoggedIn,
        ResourceController.getResource
    )
    .patch(
        ensureLoggedIn,
        ResourceController.updateResource
    )
    .delete(
        ensureLoggedIn,
        ResourceController.deleteResource
    )

router
    .route("user/:userId")
    .get(
        ensureLoggedIn,
        ResourceController.getAllResourcesForUser
    )

module.exports = router;