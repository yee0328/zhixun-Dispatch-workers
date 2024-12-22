const httpStatus = require("http-status");

const adminService = require("../services/admin_service");

const login = async (req, res) => {
  const acc = req.body.account;
  const pwd = req.body.password;
  if (acc === "" || pwd === "") {
    res.status(httpStatus.OK).send({
      message: "帳號或密碼為空",
      status: "error",
    });
    return;
  }

  const account = await adminService.login(acc, pwd);

  if (account.length != 0) {
    if (account[0].status === 1) {
      res.status(httpStatus.OK).send({
        message: "登入成功",
        status: "success",
        name: account[0].name,
      });
    } else {
      res.status(httpStatus.OK).send({
        message: "此帳號已停用",
        status: "error",
      });
    }
  } else if (account === false) {
    res.status(httpStatus.OK).send({
      message: "登入失敗",
      status: "error",
    });
  } else {
    res.status(httpStatus.OK).send({
      message: "登入失敗",
      status: "error",
    });
  }
};
const manufacturerLogin = async (req, res) => {
  const acc = req.body.account;
  const pwd = req.body.password;
  if (acc === "" || pwd === "") {
    res.status(httpStatus.OK).send({
      message: "帳號或密碼為空",
      status: "error",
    });
    return;
  }

  const account = await adminService.manufacturerLogin(acc, pwd);

  if (account.length != 0) {
    if (account[0].status === 1) {
      res.status(httpStatus.OK).send({
        message: "登入成功",
        status: "success",
        name: account[0].name,
      });
    } else {
      res.status(httpStatus.OK).send({
        message: "此帳號已停用",
        status: "error",
      });
    }
  } else if (account === false) {
    res.status(httpStatus.OK).send({
      message: "登入失敗",
      status: "error",
    });
  } else {
    res.status(httpStatus.OK).send({
      message: "登入失敗",
      status: "error",
    });
  }
};
module.exports = { login, manufacturerLogin };
