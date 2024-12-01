const express = require("express");
const router = express.Router();

const recordController = require("../controllers/record_controller");

// http://localhost:3000/recordreceipt
router.get("/recordreceipt", recordController.recordreceipt);

//http://localhost:3000/receiptDetail
router.get("/receiptDetail", recordController.receiptDetail);

// http://localhost:3000/recordassessment
router.get("/recordassessment", recordController.recordassessment);

// http://localhost:3000/assessmentDetail
router.get("/assessmentDetail", recordController.assessmentDetail);

//http://localhost:3000/recordmaintenance
router.get("/recordmaintenance", recordController.recordmaintenance);

//http://localhost:3000/maintenanceDetail
router.get("/maintenanceDetail", recordController.maintenanceDetail);

module.exports = router;
