const UserModel = require("../models/user.model");


const userGetDetails = async(req,res)=>{
    try {
        const user = await UserModel.findOne({ username: req.params.userid });
        res.status(200).json({success: true,user});
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({success:false, message: error });
    }
}

const getAllusers = async(req,res)=>{
   try {
    const users = await UserModel.find().select("-password")
    res.status(200).json({
        success: true,
        count: users.length,
        users,
      });
   } catch (error) {
    res.status(500).json({ success: false, message: error.message });
   }
}

const userUpdateDetails = async(req,res)=>{
    try {
        const { userId } = req.params; 
        const updateData = req.body;
        const updatedUser = await UserModel.findOneAndUpdate({ username:userId } , updateData, {
            new: true,
            runValidators: true, 
        });
    
        res.status(200).json({success: true, message: "Profile updated successfully", data:updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports ={ userGetDetails,getAllusers,userUpdateDetails}