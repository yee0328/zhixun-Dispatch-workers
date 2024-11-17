const httpStatus = require("http-status");
async function responeData1(res, data, msg1, msg2, msg3) {
  if (data === false) {
    res.status(httpStatus.ERROR).send({
      message: msg1,
      status: "error",
    });
  } else if (data.length === 0) {
    res.status(httpStatus.OK).send({
      message: msg2,
      status: "null",
    });
  } else {
    res.status(httpStatus.OK).send({
      data,
      message: msg3,
      status: "success",
    });
  }
}

module.exports = {
  responeData1,
};
