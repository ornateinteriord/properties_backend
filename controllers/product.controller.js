const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");
const { sendMail } = require("../utils/EmailService");

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
      const user = await UserModel.findOne({username:userid});
      if(user){
        const { email, fullname: name } = user;
        const subject = "Property Submission Received"
        const description =`Dear ${name},\n\nThank you for submitting your property on our platform.\n We have successfully received the details of your property.\n Our team will now verify the submitted information. After verification, we will get back to you with further updates.\n\nBest regards,\nSK Properties Team `
        await sendMail(email, subject, description);
      }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const user = req.params.userid
    if (user) {
      const userProperty = await ProductModel.find({userid: user });
      return res.status(200).json({success:true,userProperty});
    }
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

const getPropertyDetails =async(req,res)=>{
   try {
    const { propertyid } = req.params;
    if(!propertyid){
      return res.status(404).json({ success: false, message: "Property Id is required" });
    }
    const property = await ProductModel.findOne({ property_id:propertyid})
    if(!property){
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    return res.status(200).json({success:true,property});
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
}

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

const getCounts = async (req, res) => {
  try {
    const [totalProperties, totalUsers] = await Promise.all([
      ProductModel.countDocuments(),
      UserModel.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      count: { totalProperties, totalUsers },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const searchProperties = async (req, res) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng || !radius) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  try {
    const properties = await ProductModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], parseFloat(radius) / 6378.1], // Convert km to radians
        },
      },
    }) // Only return the `title` and `location` fields

    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createProperty , getAllProperties , updateProperty , deleteProperty , getCounts , searchProperties,getPropertyDetails};
