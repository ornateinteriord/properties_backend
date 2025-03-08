const express = require("express");
const { getAllPropertyTypes, addPropertyType, deletePropertyType } = require("../controllers/propertyType.controller");

const router = express.Router();

router.get("/getall", getAllPropertyTypes);
router.post("/add-one", addPropertyType);
router.delete("/delete-one/:id", deletePropertyType);

module.exports = router;
