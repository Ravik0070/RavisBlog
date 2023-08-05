const router = require("express").Router();
const authController = require("../controllers/authController")

//Register
router.post("/register", authController.Register);

//Login
router.post("/login",authController.Login);

//logout
router.post("/logout",authController.Logout);

router.get("/getowner/:id", authController.GetOwner);
//update user 
router.put("/updateUser/:id",authController.UpdateUser)



module.exports = router;
