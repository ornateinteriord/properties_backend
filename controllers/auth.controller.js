const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { verifyOTP, generateOTP, storeOTP } = require("../utils/OtpService");
const { sendMail } = require("../utils/EmailService");

const signup = async (req, res) => {
  try {
    const { email, password, ...otherDetails } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in exist" });
    }
    const newUser = new UserModel({
      email,
      password,
      ...otherDetails,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration Successfull!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { identifier , password } = req.body;
    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier } , {mobileno : identifier}],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        userid: user?.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      success: true,
      user,
      token,
      message: "login successful.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const forgotPassword = async(req,res)=>{
  try {
    const { email, password, otp } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email not registered" });
    }
    if (otp && !password) {
      if (!verifyOTP(email, otp)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid OTP or expired" });
      }
      return res.json({ success: true, message: "OTP verified. Now set a new password." });
    }
    if (password) {
      user.password = password;
      await user.save();
      return res.json({
        success: true,
        message: "Password reset successfully",
      });
    }
    const newOtp = generateOTP();
    const resetPasswordDescription = `Dear User,\n\nYour OTP for password reset is: ${newOtp}\n\nPlease use this OTP to proceed with resetting your password.\n\nPlease keep don't share with anyone.\n\nBest regards,\nSK Properties Team`;
    const resetPasswordSubject =  "SK Properties - OTP Verification";
    storeOTP(email, newOtp);
    await sendMail(email, resetPasswordSubject , resetPasswordDescription);
    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res
    .status(500)
    .json({ success: false, message: error });
  }
}


module.exports = {
    signup, signin,forgotPassword
}