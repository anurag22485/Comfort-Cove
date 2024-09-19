const User = require("../models/user.js");

module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const regirteredUser=await User.register(newUser,password);
        console.log(regirteredUser);
        req.login(regirteredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to comfortcove ");
            res.redirect("/listings");
        });
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs")
};


module.exports.login = async(req,res)=>{
    req.flash("success","welcome back to wanderlust! you are logged in!");
    let redirectUrl = res.locals.redirectUrl;
    if(redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }
    else{
        res.redirect("/listings");

    }
    
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    });

};