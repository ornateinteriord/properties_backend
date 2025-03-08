const mongoose = require("mongoose");

const PropertyTypeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, unique: true },
    subTypes: { type: [String], required: true },
  },
  { timestamps: true, collection: "property_types" }
);

const PropertyTypeModel = mongoose.model("property_types", PropertyTypeSchema);
module.exports = PropertyTypeModel;
