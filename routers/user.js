const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const usercontroller = require("../controllers/users.js");



//router route to render signup form
router
.route("/signup")
.get((req, res) => {
  res.render("users/signup.ejs");
})
.post(
  wrapAsync(usercontroller.signupUser)
);


//render login form
router
  .route("/login")
  .get(usercontroller.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login"
    }),
    usercontroller.userLogin   // <--- runs ONLY on success
  );


//user logout route
router.get("/logout", usercontroller.userLogout);

module.exports = router;
