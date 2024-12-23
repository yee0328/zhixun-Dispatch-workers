const httpStatus = require("http-status");
const bodyParser = require("body-parser");
const multer = require("multer");
const uploadService = require("../services/upload_service");
const fileUpload = require("../models/plugins/fileupload");
const { data } = require("../models/plugins/logger");
// const { exists } = require("fs");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("不支援的檔案類型"));
    }
    cb(null, true);
  },
});

const uploadreceipt = async (req, res) => {
  try {
    // 使用 multer 處理上傳
    upload.array("files")(req, res, async (err) => {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: err.message,
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: "未選擇任何檔案",
        });
      }
      const title = req.body.title;
      const description = req.body.description;
      const type = req.body.type;
      const name = req.body.name;
      var filesname = [];
      for (var i = 0; i < req.files.length; i++) {
        filesname.push(req.files[i].originalname);
      }
      const result = await uploadService.uploadreceipt(
        title,
        description,
        type,
        name,
        filesname
      );
      // console.log(result);
      if (result.exist === "duplicate") {
        res.status(httpStatus.OK).send({
          message: `以下檔案名稱重複: ${result.duplicateFiles.join(", ")}`,
          status: "fail",
        });
      }
      if (result.success === "true") {
        const dataresult = await fileUpload.uploadFiles(req.files, "receipt");

        if (dataresult === true) {
          res.status(httpStatus.OK).send({
            message: "上傳成功",
            status: "success",
            data: result.rec_id,
          });
        } else {
          res.status(httpStatus.OK).send({
            message: "上傳失敗",
            status: "fail",
          });
        }
      }
    });
  } catch (error) {
    console.error("Upload invoice error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "上傳失敗",
      status: "fail",
    });
  }
};
const uploadassessment = async (req, res) => {
  try {
    // 使用 multer 處理上傳
    upload.array("files")(req, res, async (err) => {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: err.message,
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(httpStatus.OK).send({
          message: "沒有檔案",
          status: "fail",
        });
      }
      const title = req.body.title;
      const description = req.body.description;
      const type = req.body.type;
      const name = req.body.name;
      var filesname = [];
      // console.log(req.files);
      for (var i = 0; i < req.files.length; i++) {
        filesname.push(req.files[i].originalname);
      }
      const result = await uploadService.uploadassessment(
        title,
        description,
        type,
        name,
        filesname
      );
      if (result.exist === "duplicate") {
        res.status(httpStatus.OK).send({
          message: `以下檔案名稱重複: ${result.duplicateFiles.join(", ")}`,
          status: "fail",
        });
      }
      if (result.success === "true") {
        const dataresult = await fileUpload.uploadFiles(
          req.files,
          "assessment"
        );

        if (dataresult === true) {
          res.status(httpStatus.OK).send({
            message: "上傳成功",
            status: "success",
            data: result.ass_id,
          });
        } else {
          res.status(httpStatus.OK).send({
            message: "上傳失敗",
            status: "fail",
          });
        }
      }
    });
  } catch (error) {
    console.error("Upload invoice error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "上傳失敗",
      status: "fail",
    });
  }
};
const uploadmaintenance = async (req, res) => {
  try {
    // 使用 multer 處理上傳
    upload.array("files")(req, res, async (err) => {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: err.message,
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(httpStatus.OK).send({
          message: "沒有檔案",
          status: "fail",
        });
      }
      const type = req.body.class;
      const Detail = req.body.Detail;
      const postion = req.body.postion;
      const uploadType = req.body.uploadType;
      var filesname = [];
      // console.log(req.files);
      for (var i = 0; i < req.files.length; i++) {
        filesname.push(req.files[i].originalname);
      }
      const result = await uploadService.uploadmaintenance(
        type,
        Detail,
        postion,
        filesname,
        uploadType
      );
      if (result.exist === "duplicate") {
        res.status(httpStatus.OK).send({
          message: `以下檔案名稱重複: ${result.duplicateFiles.join(", ")}`,
          status: "fail",
        });
      }
      if (result === true) {
        const result = await fileUpload.uploadFiles(req.files, "maintenance");
        console.log(result);
        if (result === true) {
          res.status(httpStatus.OK).send({
            message: "上傳成功",
            status: "success",
          });
        } else {
          res.status(httpStatus.OK).send({
            message: "上傳失敗",
            status: "fail",
          });
        }
      }
    });
  } catch (error) {
    console.error("Upload invoice error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "上傳失敗",
      status: "fail",
    });
  }
};
const editassessment = async (req, res) => {
  try {
    // 使用 multer 處理上傳
    upload.array("files")(req, res, async (err) => {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: err.message,
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(httpStatus.OK).send({
          message: "沒有檔案",
          status: "fail",
        });
      }
      const title = req.body.title;
      const description = req.body.description;
      const ass_id = req.body.id;
      var filesname = [];
      const checkstatus = req.body.edit;
      if (checkstatus == 0) {
        const result = await fileUpload.uploadFiles(
          req.files,
          "cache/assessment"
        );
        if (result === true) {
          res.status(httpStatus.OK).send({
            message: "上傳成功",
            status: "success",
            data: checkstatus,
          });
        } else {
          res.status(httpStatus.OK).send({
            message: "上傳失敗",
            status: "fail",
            data: checkstatus,
          });
        }
      } else {
        for (var i = 0; i < req.files.length; i++) {
          filesname.push(req.files[i].originalname);
        }
        const orgfilename = await uploadService.getassfilename(ass_id);
        const editassdata = await uploadService.editassessment(
          ass_id,
          title,
          description,
          filesname
        );
        if (editassdata.exist === "duplicate") {
          res.status(httpStatus.OK).send({
            message: `以下檔案名稱重複: ${result.duplicateFiles.join(", ")}`,
            status: "fail",
          });
        }
        // console.log(editassdata);
        if (editassdata === true) {
          const deletefile = await fileUpload.deleteDBFiles(
            //     req.files[i].originalname,
            orgfilename,
            "assessment"
          );
          if (deletefile === true) {
            const result = await fileUpload.uploadFiles(
              req.files,
              "assessment"
            );
            if (result === true) {
              res.status(httpStatus.OK).send({
                message: "上傳成功",
                status: "success",
              });
            } else {
              res.status(httpStatus.OK).send({
                message: "上傳失敗",
                status: "fail",
              });
            }
          } else {
            res.status(httpStatus.OK).send({
              message: "上傳失敗",
              status: "fail",
            });
          }
        } else {
          res.status(httpStatus.OK).send({
            message: "上傳失敗",
            status: "fail",
          });
        }
      }
    });
  } catch (error) {
    console.error("Upload invoice error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "上傳失敗",
      status: "fail",
    });
  }
};
const editreceipt = async (req, res) => {
  try {
    // 使用 multer 處理上傳
    upload.array("files")(req, res, async (err) => {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: err.message,
        });
      }
      if (!req.files || req.files.length === 0) {
        return res.status(httpStatus.OK).send({
          message: "沒有檔案",
          status: "fail",
        });
      }
      const title = req.body.title;
      const description = req.body.description;
      const rec_id = req.body.id;
      var filesname = [];
      var filearray = [];
      const checkstatus = req.body.edit;
      if (checkstatus == 0) {
        const result = await fileUpload.uploadFiles(req.files, "cache/receipt");
        if (result === true) {
          res.status(httpStatus.OK).send({
            message: "上傳成功",
            status: "success",
            data: checkstatus,
          });
        } else {
          res.status(httpStatus.OK).send({
            message: "上傳失敗",
            status: "fail",
            data: checkstatus,
          });
        }
      } else {
        const orgfilename = await uploadService.getrecfilename(rec_id);
        // console.log(filesname);
        for (var i = 0; i < req.files.length; i++) {
          filesname.push(req.files[i].originalname);
        }
        const editrecdata = await uploadService.editreceipt(
          rec_id,
          title,
          description,
          filesname
        );
        if (editrecdata.exist === "duplicate") {
          res.status(httpStatus.OK).send({
            message: "請勿上傳重複檔案",
            status: "fail",
          });
        }
        if (editrecdata === true) {
          const deletefile = await fileUpload.deleteDBFiles(
            orgfilename,
            "receipt"
          );
          if (deletefile === true) {
            const result = await fileUpload.uploadFiles(req.files, "receipt");
            if (result === true) {
              res.status(httpStatus.OK).send({
                message: "上傳成功",
                status: "success",
              });
            } else {
              res.status(httpStatus.OK).send({
                message: "上傳失敗",
                status: "fail",
              });
            }
          } else {
            res.status(httpStatus.OK).send({
              message: "上傳失敗",
              status: "fail",
            });
          }
        } else {
          res.status(httpStatus.OK).send({
            message: "上傳失敗",
            status: "fail",
          });
        }
      }
    });
  } catch (error) {
    console.error("Upload invoice error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "上傳失敗",
      status: "fail",
    });
  }
};
const demoassessment = async (req, res) => {
  try {
    // 使用 multer 處理上傳
    upload.array("files")(req, res, async (err) => {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: err.message,
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(httpStatus.OK).send({
          message: "沒有檔案",
          status: "fail",
        });
      }
      var serial = generateSerialNumber();
      const result = await fileUpload.uploadFiles(
        req.files,
        "cache/assessment"
      );
      if (result === true) {
        res.status(httpStatus.OK).send({
          message: "上傳成功",
          status: "success",
          serial: serial,
        });
      } else {
        res.status(httpStatus.OK).send({
          message: "上傳失敗",
          status: "fail",
        });
      }
    });
  } catch (error) {
    console.error("Upload invoice error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "上傳失敗",
      status: "fail",
    });
  }
};
const demoreceipt = async (req, res) => {
  try {
    // 使用 multer 處理上傳
    upload.array("files")(req, res, async (err) => {
      if (err) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: err.message,
        });
      }
      if (!req.files || req.files.length === 0) {
        return res.status(httpStatus.OK).send({
          message: "沒有檔案",
          status: "fail",
        });
      }
      var serial = generateSerialNumber();
      const result = await fileUpload.uploadFiles(req.files, "cache/receipt");
      if (result === true) {
        res.status(httpStatus.OK).send({
          message: "上傳成功",
          status: "success",
          serial: serial,
        });
      } else {
        res.status(httpStatus.OK).send({
          message: "上傳失敗",
          status: "fail",
        });
      }
    });
  } catch (error) {
    console.error("Upload invoice error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "上傳失敗",
      status: "fail",
    });
  }
};
const deletecache = async (req, res) => {
  console.log("delete cache");
  try {
    const filename = req.body.file_name.split(",");
    console.log(filename);
    const floder = req.body.floder;
    const result = await fileUpload.deletecacheFiles(
      filename,
      `cache/${floder}`
    );
    if (result === true) {
      res.status(httpStatus.OK).send({
        message: "刪除成功",
        status: "success",
      });
    } else {
      res.status(httpStatus.OK).send({
        message: "刪除失敗",
        status: "fail",
      });
    }
  } catch (error) {
    console.error("Delete cache error:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      message: "刪除失敗",
      status: "fail",
    });
  }
};
function generateSerialNumber() {
  var length = 10; // 序列號的長度
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var serial = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * chars.length);
    serial += chars[randomIndex];
  }
  return serial;
}
module.exports = {
  uploadreceipt,
  uploadassessment,
  editassessment,
  editreceipt,
  deletecache,
  uploadmaintenance,
  demoassessment,
  demoreceipt,
};
