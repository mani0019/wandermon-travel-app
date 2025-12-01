const Listing = require("../models/listing.js");
//index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };
  
//show route
module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: "author" }).populate("owner");
    if (!listing) {
      req.flash("error", "Cannot find that listing!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, currUser: req.user });
    
  };
//render new form

module.exports.renderNewForm =  (req, res) => {
  res.render("listings/new.ejs");
  
};



//create route
module.exports.createListing= async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
  };

//edit route
module.exports.editlisting=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    let oriimg=listing.image.url;
   oriimg= oriimg.replace("/upload/","/upload/h_300,w_200/");

    res.render("listings/edit.ejs", { listing ,oriimg});
  };

//update route
module.exports.updatelisting= async (req, res) => {
      let {id}= req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== 'undefined'){
   let url = req.file.path;
   let filename = req.file.filename;

    listing.image = { url, filename };
    await listing.save();
    }
    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${id}`);
  }

  //delete route
  module.exports.deletelisting = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
  };