const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");
const reviewController = require("../controllers/reviews.js");

const wrapAsync = require("../utils/wrapAsync.js");

// Validate review
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn,isAuthor } = require("../middleware.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
};

// Create review
router.post("/", validateReview,isLoggedIn, wrapAsync(reviewController.createReview));

router.delete(
  "/:Revid",           // this matches `Revid`
  isLoggedIn,
  isAuthor,            // now correctly reads Revid
  wrapAsync(reviewController.deleteReview)
);


module.exports = router;
