const User = require("../models/user");
const Listing = require("../models/listing");
const Review= require("../models/reviews");

//signup user
module.exports.signupUser=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
      });

      req.flash("success", "Welcome to wanderlust");
      res.redirect("/listings");
    } catch (err) {
      console.log(err.message);
      res.redirect("/signup");
    }
  };
//login form route
module.exports.renderLoginForm=(req, res) => {
  res.render("users/login");
};

//login user post route
module.exports.userLogin=async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

//logout user route
module.exports.userLogout=(req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};

