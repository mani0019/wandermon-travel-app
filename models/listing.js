const mongoose = require("mongoose");
const reviews = require("./reviews");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
title: {
type: String,
required: true,
},
description: String,
image: {
    url: String,
    filename: String
},
price: {
type: Number,
required: true,
},
location: String,
country: String,
reviews:[
    {
        type:Schema.Types.ObjectId,
        ref: "Review",
    },
],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
}
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
