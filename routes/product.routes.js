const { createProperty } = require("../controllers/product.controller");
const Authenticated = require("../middlewares/auth");

const Productrouter = require("express").Router();

Productrouter.post("/create-property",Authenticated, createProperty);

module.exports = Productrouter;
