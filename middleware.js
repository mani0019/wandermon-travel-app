const Listing = require("./models/listing");
const Review = require("./models/reviews");
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
module.exports.validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  console.log(error)
  if(error){
    let errmsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errmsg);
  }else{
    next()
  }

};
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};
module.exports.isAuthor = async (req, res, next) => {
  const { id, Revid } = req.params; // match your route param
  const review = await Review.findById(Revid);
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/listings/${id}`);
  }
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
