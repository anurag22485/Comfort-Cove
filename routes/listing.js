const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
const {isOwner} = require("../middleware.js");
const {validateListing}=require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingControllers.createListing));

// //index route
// router.get("/",wrapAsync(listingControllers.index));

//new route

router.get("/new",isLoggedIn,listingControllers.renderNewForm);

//Show route

router.get("/:id",wrapAsync(listingControllers.showListing));


// //CREATE ROUTE
// router.post("/",isLoggedIn,validateListing,wrapAsync(listingControllers.createListing));


//edit route

router.get("/:id/edit",isLoggedIn,wrapAsync(listingControllers.renderEditForm));

//update route

router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingControllers.updateListing));

//delete route

router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingControllers.destroylisting));

module.exports=router;