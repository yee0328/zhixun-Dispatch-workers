const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin_controller");

// http://localhost/login
router.post("/login", adminController.login);

module.exports = router;
