if(process.env.NODE_ENV !== "production") {
require("dotenv").config();

}
const MAP_API_KEY = process.env.MAP_API_KEY;
console.log(process.env.SECRET);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRoutes = require("./routers/listings.js");
const reviewRoutes = require("./routers/review.js");
const userRoutes = require("./routers/user.js");
const Listing = require("./models/listing.js");
const dbUrl= process.env.ATLAS_DB;  

main()
  .then(() => {
    console.log(`DB CONNECTED!`);
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// ============================
//        MIDDLEWARE
// ============================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser("thisshouldbeabettersecret!"));

// ============================
//        SESSION & FLASH
// ============================
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto:{
    secret: process.env.SESSION_SECRET
  }
});
store.on("error", function(e){
  console.log("SESSION STORE ERROR", e);
});
const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
};




sessionOptions.store = store;

app.use(session(sessionOptions));
app.use(flash());

// ============================
//        PASSPORT CONFIG
// ============================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash + current user middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;   
  next();
});

// ============================
//        CUSTOM MIDDLEWARE
// ============================

// ============================
//        ROUTES
// ============================

// Listings routes
app.use("/listings", listingRoutes);

// Reviews routes (FIXED — correct nesting)
app.use("/listings/:id/reviews", reviewRoutes);

// User routes (signup, login, logout)
app.use("/", userRoutes);

// Home page
app.get("/home", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/home.ejs", { allListings });
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { statusCode, message });
});

// ============================
//        SERVER START
// ============================
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
