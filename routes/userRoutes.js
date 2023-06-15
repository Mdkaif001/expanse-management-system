const { loginController, registerController } = require("../controllers/userController");
const express = require("express");

const router = express.Router();

// post || login user
router.post("/login",loginController)


// post || register
router.post("/register",registerController)
module.exports = router;    