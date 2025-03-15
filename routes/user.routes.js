const {userGetDetails,getAllusers, userUpdateDetails} = require("../controllers/user.controller");
const {Authenticated, AuthorizeRoles} = require("../middlewares/auth");

const router = require("express").Router();

router.get("/user-details/:userid",Authenticated,userGetDetails)
router.get("/alluser-details",Authenticated,AuthorizeRoles('admin'),getAllusers)
router.put("/update-profile/:userId",Authenticated,userUpdateDetails)

module.exports = router;