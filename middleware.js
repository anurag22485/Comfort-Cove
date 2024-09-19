const Listing=require("./models/listing.js");
const {listingSchema} = require("./schema.js");
const ExpressError = require("./utils/expressError.js");
const {reviewSchema} = require("./schema.js");
const Review=require("./models/review.js");


module.exports.validateListing = (req,res,next)=>{
    
    let {error}=listingSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

module.exports.validateReview = (req,res,next)=>{
    
    let {error}=reviewSchema.validate(req.body);
    
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

module.exports.isLoggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be loged in to create a listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
        res.locals.redirectUrl=req.session.redirectUrl;
    next();
};

module.exports.isOwner = async(req,res,next)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have the permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAuthor = async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have the author of review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};



