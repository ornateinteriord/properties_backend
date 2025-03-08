const ProductModel = require("../models/product.model");

const generateUniquePropertytId = async () => {
  const [lastProperty] = await ProductModel.aggregate([
    { $match: { property_id: /^PRD\d+$/ } }, // Match valid IDs
    { $sort: { property_id: -1 } }, // Sort descending
    { $limit: 1 }, // Get the latest entry
  ]);

  const lastId = lastProperty ? Number(lastProperty.property_id.slice(3)) : 0; // Extract number part
  return `PRD${(lastId + 1).toString().padStart(7, "0")}`; // Format with leading zeros
};


const createProperty = async (req, res) => {
  try {
    const userid = req.user.userid.toString();
    const propertyId = await generateUniquePropertytId()
    const newProperty = new ProductModel({
      ...req.body,
      userid,
      property_id:propertyId
    });
    await newProperty.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Property Created Successfully",
        newProperty,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await ProductModel.find();
    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params; // Get property ID from URL
    const updatedProperty = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Ensure validation
    });

    if (!updatedProperty) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      updatedProperty,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params; // Get property ID from URL
    const deletedProperty = await ProductModel.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
      deletedProperty,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = { createProperty , getAllProperties , updateProperty , deleteProperty };
