const httpStatus = require("http-status");

const recordService = require("../services/record_service");

const recordreceipt = async (req, res) => {
  const uploadType = req.query.type;
  const result = await recordService.recordreceipt(uploadType);
  if (result.length > 0) {
    res.status(httpStatus.OK).send({
      message: "查詢成功",
      status: "success",
      data: result,
    });
  } else {
    res.status(httpStatus.OK).send({
      message: "查詢失敗",
      status: "fail",
    });
  }
};
const recordassessment = async (req, res) => {
  const uploadType = req.query.type;
  // console.log(uploadType);
  const result = await recordService.recordassessment(uploadType);
  if (result.length > 0) {
    res.status(httpStatus.OK).send({
      message: "查詢成功",
      status: "success",
      data: result,
    });
  } else {
    res.status(httpStatus.OK).send({
      message: "查詢失敗",
      status: "fail",
    });
  }
};
const receiptDetail = async (req, res) => {
  const rec_id = req.query.rec_id;
  const result = await recordService.receiptDetail(rec_id);
  // console.log(result);
  if (result.length > 0) {
    res.status(httpStatus.OK).send({
      message: "查詢成功",
      status: "success",
      data: result,
    });
  } else {
    res.status(httpStatus.OK).send({
      message: "查詢失敗",
      status: "fail",
    });
  }
};
const assessmentDetail = async (req, res) => {
  const ass_id = req.query.ass_id;
  const result = await recordService.assessmentDetail(ass_id);
  // console.log(result);
  if (result.length > 0) {
    res.status(httpStatus.OK).send({
      message: "查詢成功",
      status: "success",
      data: result,
    });
  } else {
    res.status(httpStatus.OK).send({
      message: "查詢失敗",
      status: "fail",
    });
  }
};
const recordmaintenance = async (req, res) => {
  const uploadType = req.query.type;
  const result = await recordService.recordmaintenance(uploadType);
  if (result.length > 0) {
    res.status(httpStatus.OK).send({
      message: "查詢成功",
      status: "success",
      data: result,
    });
  } else {
    res.status(httpStatus.OK).send({
      message: "查詢失敗",
      status: "fail",
    });
  }
};

const maintenanceDetail = async (req, res) => {
  const main_id = req.query.main_id;
  const result = await recordService.maintenanceDetail(main_id);
  if (result.length > 0) {
    res.status(httpStatus.OK).send({
      message: "查詢成功",
      status: "success",
      data: result,
    });
  } else {
    res.status(httpStatus.OK).send({
      message: "查詢失敗",
      status: "fail",
    });
  }
};

module.exports = {
  recordreceipt,
  recordassessment,
  recordmaintenance,
  receiptDetail,
  assessmentDetail,
  maintenanceDetail,
};
