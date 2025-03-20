const { signup, signin, forgotPassword } = require("../controllers/auth.controller");

const Authrouter = require("express").Router();

Authrouter.post("/signup", signup);
Authrouter.post("/login", signin);
Authrouter.post("/reset-password", forgotPassword);

module.exports = Authrouter;
