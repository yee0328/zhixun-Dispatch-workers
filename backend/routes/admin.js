const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin_controller");

// 店家登入帳密檢查
// http://localhost/login
router.post("/login", adminController.login);

module.exports = router;
