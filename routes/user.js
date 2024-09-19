const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {savedRedirectUrl}=require("../middleware.js");
const userContoller = require("../controllers/user.js");

router.get("/signup",userContoller.renderSignup);

router.post("/signup",wrapAsync(userContoller.signup));

router.get("/login",userContoller.renderLogin);

router.post("/login",savedRedirectUrl,passport.authenticate("local",{ failureRedirect: '/login', failureFlash: true }),userContoller.login);

router.get("/logout",userContoller.logout);

module.exports=router;