const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    property_id: { type: String },
    property_type: { type: String, },
    subtype: { type: String, },
    title: { type: String },
    image: { type: String },
    address: { type: String },
    state: { type: String },
    district: { type: String },
    taluk: { type: String },
    price: { type: String },
    sqft: { type: String },
    status : {type : String , default : "pending"},
    pramote : {type : String , default : "pending"},
    pricePerSqft: { type: String },
    bhk: { type: String },
    bathrooms: { type: String },
    propertyStatus: { type: String },
    possession: { type: String },
    furnishing: { type: String },
    parking: { type: String },
    description: { type: String },
  },
  { timestamps: true, collection: "product_tbl" }
);

const ProductModel = mongoose.model("product_tbl", ProductSchema);
module.exports = ProductModel;
