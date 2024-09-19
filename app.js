if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
};

const express = require("express");

const app=express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
// const {listingSchema} = require("./schema.js");
// const Review = require("./models/review.js");
// const {reviewSchema} = require("./schema.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const usersRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to db");
}) 
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter:24*3600
});

store.on("error",()=>{
    console.log("ERROR in MONGO session store");
});


const sessionOptions ={
    store,
    secret : process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie :{
        expires : Date.now()+7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly :true,
    },
};

// app.get("/",(req,res)=>{
//     res.send("hi, i am root1");
// });



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // add passport local strategy

passport.serializeUser(User.serializeUser()); //add user related information into a session
passport.deserializeUser(User.deserializeUser()); //delete user related information from a session


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"fakeuser@gmail.com",
//         username:"delta-student"
//     });
//     let registeredUser=await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

app.use("/listings",listingsRouter);

app.use("/listings/:id/reviews",reviewsRouter);

app.use("/",usersRouter);


// app.get("/testListing",async (req,res)=>{
//     const initialCount = await Listing.countDocuments();
// console.log(`Initial document count: ${initialCount}`);

//     console.log("Attempting to delete documents...");
//     const result = await Listing.deleteMany({});
//     console.log("Deleted documents:", result.deletedCount);

//     let sampleListing = new Listing({
//         title : "my new villa",
//         description: "by the beach",
//         price:1300,
//         location : "pune",
//         country : "india"
//     });
//     await sampleListing.save();

//     res.send("saved");
// });

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    // res.status(status).send(message);
    res.status(status).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});