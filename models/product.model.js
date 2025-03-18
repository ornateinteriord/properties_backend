const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    property_id: { type: String },
    property_type: { type: String, required: true },
    subtype: { type: String },
    title: { type: String , required: true},
    images: { type: [String] , default:["https://res.cloudinary.com/dtntxcl9u/image/upload/v1742296527/trzlwr9la9bwm9dv8w4a.png"], required: true },
    address: { type: String ,  required: true },
    state: { type: String , default : 'karnataka'},
    district: { type: String , required: true },
    taluk: { type: String   , required: true},
    price: { type: String , required: true },
    sqft: { type: String , required: true},
    status : {type : String , default : "pending"},
    pramote : {type : String , default : "pending"},
    pricePerSqft: { type: String , required: true},
    bhk: { type: String },
    bathrooms: { type: String },
    propertyStatus: { type: String },
    possession: { type: String },
    furnishing: { type: String },
    parking: { type: String },
    description: { type: String, required: true },
  },
  { timestamps: true, collection: "product_tbl" }
);

const ProductModel = mongoose.model("product_tbl", ProductSchema);
module.exports = ProductModel;
