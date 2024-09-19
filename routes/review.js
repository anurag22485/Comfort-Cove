const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");

const {validateReview,isLoggedIn,isAuthor}=require("../middleware.js");
const reviewController = require("../controllers/review.js");
//reviews route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delte review route

router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;