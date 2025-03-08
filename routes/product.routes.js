const { createProperty, getAllProperties, updateProperty, deleteProperty } = require("../controllers/product.controller");
const Authenticated = require("../middlewares/auth");

const Productrouter = require("express").Router();

Productrouter.post("/create-property",Authenticated, createProperty);
Productrouter.get("/getall", getAllProperties);
Productrouter.put("/update/:id",Authenticated, updateProperty);
Productrouter.delete("/delete/:id",Authenticated, deleteProperty);

module.exports = Productrouter;
