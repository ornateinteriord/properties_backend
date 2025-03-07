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

module.exports = { createProperty };
