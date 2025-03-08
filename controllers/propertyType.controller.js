const PropertyTypeModel = require('../models/propertyType.model');

const getAllPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyTypeModel.find();
    res.status(200).json({ success: true, data: propertyTypes });
  } catch (error) {
    console.error("Error fetching property types:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const addPropertyType = async (req, res) => {
  try {
    const { type, subTypes } = req.body;

    // Check if property type already exists
    const existingType = await PropertyTypeModel.findOne({ type });
    if (existingType) {
      return res
        .status(400)
        .json({ success: false, message: "Property type already exists" });
    }

    const newPropertyType = new PropertyTypeModel({ type, subTypes });
    await newPropertyType.save();

    res.status(201).json({ success: true, message: "Property Type added" });
  } catch (error) {
    console.error("Error adding property type:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deletePropertyType = async (req, res) => {
  try {
    const { id } = req.params;
    await PropertyTypeModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Property Type deleted" });
  } catch (error) {
    console.error("Error deleting property type:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = { getAllPropertyTypes, addPropertyType, deletePropertyType };
