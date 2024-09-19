const Listing = require("../models/listing.js");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });


module.exports.index = async (req,res)=>{

    const alllistings=await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.showListing=async(req,res)=>{
    const {id}=req.params;
    // const listing=await Listing.findById(id);
    const listing=await Listing.findById(id).populate({path:"reviews", populate :{path :"author"},}).populate("owner");
    if(!listing){
        req.flash("error"," listing doesn't exist");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async(req,res,next)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
    console.log(response.body.features[0].geometry);
    
      
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
    let savedListing=await newListing.save();
    console.log(savedListing);
    req.flash("success","new listing created");
    res.redirect("/listings");

};

module.exports.renderEditForm = async(req,res)=>{
    let {id}=req.params;
    
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error"," listing doesn't exist");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.irl;
    originalImageUrl.replace("/upload","/upload/h_300,w_100");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
    // let listing = req.body.listing;
    // if(!listing){
    //     throw new ExpressError(400,"Send valid data for listing");
    // }
    let {id}=req.params;
    
    let listing=await  Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    
    req.flash("success"," listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroylisting = async(req,res)=>{
    let {id}=req.params;
    let del=await Listing.findByIdAndDelete(id);
    console.log(del);
    req.flash("success"," listing deleted");
    res.redirect("/listings");
};