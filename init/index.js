const mongoose = require("mongoose");
const initdata = require("./data.js");


const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const dbUrl = "fnjdkm"

main()
.then(()=>{
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

}

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Review.deleteMany({});
    console.log(initdata);
    
    initdata.data= await Promise.all(initdata.data.map(async (obj)=>{
      const geometry = await initdata.geocodeListings(obj);
      return {...obj,owner:"66eb8d7efa287a7cc51c3df3",geometry}
    }));
    console.log(initdata.data);
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initDB();
