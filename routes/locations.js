"use strict";
const express = require("express");
const router = new express.Router();
const LocationController = require("../controllers/locationController");
const { ensureLoggedIn } = require("../middleware/authMiddleware.js");


/** Routes for Locations. */
router
    .route("/")
    .get(
        ensureLoggedIn,
        LocationController.getAllLocations
    )
    .post(
        ensureLoggedIn,
        LocationController.createLocation
    )

router
    .route("/:id")
    .get(
        ensureLoggedIn,
        LocationController.getLocation
    )
    .patch(
        ensureLoggedIn,
        LocationController.updateLocation
    )
    .delete(
        ensureLoggedIn,
        LocationController.deleteLocation
    )


module.exports = router;