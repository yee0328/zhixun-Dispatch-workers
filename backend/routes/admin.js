const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin_controller");

// http://localhost/login
router.post("/login", adminController.login);

// http://localhost/manufacturerLogin
router.post("/manufacturerLogin", adminController.manufacturerLogin);

module.exports = router;
