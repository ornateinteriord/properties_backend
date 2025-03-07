const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileno: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String },
  },
  { timestamps: true,collection:'user_tbl' }
);

const UserModel = mongoose.model("user_tbl", UserSchema);
module.exports = UserModel;
