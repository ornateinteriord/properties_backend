const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    property_id: { type: String },
    property_type: { type: String },
    title: { type: String },
    image: { type: String },
    location: { type: String },
    sqrtft: { type: String },
    price: { type: String },
    pricePerSqft: { type: String },
    bhk: { type: String },
    bathrooms: { type: String },
    status: { type: String },
    possession: { type: String },
    furnishing: { type: String },
    parking: { type: String },
  },
  { timestamps: true, collection: "product_tbl" }
);

const ProductModel = mongoose.model("product_tbl", ProductSchema);
module.exports = ProductModel;
