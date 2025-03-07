const UserModel = require("../models/user.model");
const { sendMail } = require("../utils/EmailService");
const jwt = require("jsonwebtoken");

const signUpSubject = "Welcome to RealEstate - Your Login Credentials";

const generateUniqueUserId = async () => {
  while (true) {
    const userid = `USR${Math.floor(100000 + Math.random() * 900000)}`;
    if (!(await UserModel.exists({ user_id: userid }))) {
      return userid;
    }
  }
};

const signup = async (req, res) => {
  try {
    const { email, password, ...otherDetails } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }
    const userid = await generateUniqueUserId();
    const newUser = new UserModel({
      user_id: userid,
      email,
      password,
      ...otherDetails,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Signup successful.Credentials sent to email.",
      user: newUser,
    });
    const signUpDescription = `Dear Member,\n\nYour account has been successfully created!\n\nHere are your login details:\nUsername: ${userid}\nPassword: ${password}\n\nPlease keep this information secure.\n\nBest regards,\nRealEstate Team`;
    await sendMail(email, signUpSubject, signUpDescription);
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: error });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ user_id: username });
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
        userid: user?.user_id || null,
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
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: error });
  }
};


module.exports = {
    signup, signin
}