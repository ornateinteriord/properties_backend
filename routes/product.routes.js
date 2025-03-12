const { createProperty, getAllProperties, updateProperty, deleteProperty } = require("../controllers/product.controller");
const {Authenticated, AuthorizeRoles} = require("../middlewares/auth");

const Productrouter = require("express").Router();

Productrouter.post("/create-property",Authenticated, createProperty);
Productrouter.get("/getall", getAllProperties);
Productrouter.get("/get-property/:userid",Authenticated, getAllProperties);
Productrouter.put("/update/:id",Authenticated, updateProperty);
Productrouter.delete("/delete/:id",Authenticated, AuthorizeRoles(['admin']), deleteProperty);

module.exports = Productrouter;
