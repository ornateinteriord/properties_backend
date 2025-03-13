const {userGetDetails,getAllusers} = require("../controllers/user.controller");
const {Authenticated, AuthorizeRoles} = require("../middlewares/auth");

const router = require("express").Router();

router.get("/user-details/:userid",Authenticated,userGetDetails)
router.get("/alluser-details",Authenticated,AuthorizeRoles('admin'),getAllusers)

module.exports = router;