const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true , unique : true },
    mobileno: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String ,required: true },
  },
  { timestamps: true,collection:'user_tbl' }
);

const UserModel = mongoose.model("user_tbl", UserSchema);
module.exports = UserModel;
