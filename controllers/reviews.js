const Review = require("../models/reviews");
const Listing = require("../models/listing");
//create review
module.exports.createReview=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "Successfully added review!");
  res.redirect(`/listings/${listing._id}`);
};

//delete review
module.exports.deleteReview=async (req, res) => {
    const { id, Revid } = req.params;
    await Review.findByIdAndDelete(Revid);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: Revid } });
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
};