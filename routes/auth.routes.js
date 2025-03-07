const { signup, signin } = require("../controllers/auth.controller");

const Authrouter = require("express").Router();

Authrouter.post("/signup", signup);
Authrouter.post("/login", signin);

module.exports = Authrouter;
