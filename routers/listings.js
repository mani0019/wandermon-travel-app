const express = require("express");
const router = express.Router();
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { listingSchema } = require("../schema.js"); // Make sure this import is correct
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const listingsController = require("../controllers/listings.js");

//router.route for reducing the code and appliying same path
// NEW LISTING FORM
router.get("/new", isLoggedIn,listingsController.renderNewForm);
router
.route("/")
.get(wrapAsync(listingsController.index))
.post(
  isLoggedIn,
  
  upload.single('listing[image]'),
  
  wrapAsync(listingsController.createListing))
;

// SHOW, UPDATE, DELETE LISTING);

router
.route("/:id")
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  wrapAsync(listingsController.updatelisting)
)
.get(
  wrapAsync(listingsController.showListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.deletelisting)
);



// EDIT LISTING FORM
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.editlisting)
);



module.exports = router;
