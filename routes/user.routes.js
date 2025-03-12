const userGetDetails = require("../controllers/user.controller");
const Authenticated = require("../middlewares/auth");

const router = require("express").Router();

router.get("/user-details/:userid",Authenticated,userGetDetails)

module.exports = router;