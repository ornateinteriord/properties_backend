const UserModel = require("../models/user.model");
const { sendMail } = require("../utils/EmailService");
require("dotenv").config();


const userGetDetails = async(req,res)=>{
    try {
        const user = await UserModel.findOne({ username: req.params.userid });
        res.status(200).json({success: true,user});
    } catch (error) {
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

        if(!updatedUser){
            return res.status(400).json({success: false, message: "Invalid User"});
        }
    
        res.status(200).json({success: true, message: "Profile updated successfully", data:updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const ContactPage = async(req,res)=>{
    try {
        const { name, email, phone, message } = req.body;
        const adminEmail = process.env.EMAIL_USER;
        const subject = `New contact inquiry from ${name}`; 
        const emailBody= `New contact inquiry received:\n\n Name: ${name}\n Email: ${email}\n Phone: ${phone} \n Message: ${message}\n\n `
        await sendMail(adminEmail, subject, emailBody);
    
        const userSubject = 'Thank you for contacting us';
        const userBody = ` Dear ${name},\n\nThank you for reaching out to us.\nWe have received your message and will get back to you shortly.\n\nBest regards,\nSK Properties Team `
        await sendMail(email, userSubject, userBody);
        res.status(200).json({ 
            success: true, 
            message: 'Your message has been sent successfully' 
          });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
   
}


module.exports ={ userGetDetails,getAllusers,userUpdateDetails,ContactPage}