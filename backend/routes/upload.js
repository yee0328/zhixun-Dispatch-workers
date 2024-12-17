const express = require("express");
const router = express.Router();

const uploadController = require("../controllers/upload_controller");

// http://localhost/uploadreceipt
router.post("/uploadreceipt", uploadController.uploadreceipt);

//http://localhost/uploadassessment
router.post("/uploadassessment", uploadController.uploadassessment);

//http://localhost/uploadmaintenance
router.post("/uploadmaintenance", uploadController.uploadmaintenance);

//http://localhost/editassessment
router.post("/editassessment", uploadController.editassessment);

//http://localhost/editreceipt
router.post("/editreceipt", uploadController.editreceipt);

//http://localhost/deletecache
router.post("/deletecache", uploadController.deletecache);

//http://localhost/demoassessment
router.post("/demoassessment", uploadController.demoassessment);

//http://localhost/demoreceipt
router.post("/demoreceipt", uploadController.demoreceipt);

module.exports = router;
