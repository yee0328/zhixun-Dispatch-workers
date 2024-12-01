// models/plugins/fileupload.js
const fs = require("fs").promises;
const path = require("path");

const uploadDir = path.join(__dirname, "../../../Zhixun/file");

const uploadFiles = async (files, type) => {
  try {
    // 參數驗證
    if (!files || !Array.isArray(files)) {
      return {
        success: false,
        error: "無效的檔案參數",
      };
    }

    // 檢查是否有檔案
    if (files.length === 0) {
      return {
        success: false,
        error: "沒有檔案需要上傳",
      };
    }

    // 確保上傳目錄存在
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        // 檢查必要的檔案屬性
        if (!file.originalname || !file.buffer) {
          throw new Error(`無效的檔案格式: ${file.originalname || "未知檔案"}`);
        }

        const fileName = Buffer.from(file.originalname, "latin1").toString(
          "utf8"
        );
        var folder = fileName.split(".");
        folder = folder[folder.length - 1];
        if (folder == "pdf") {
          folder = "pdf";
        } else {
          folder = "photo";
        }
        const filePath = path.join(uploadDir, type, folder, fileName);

        // 移動檔案到目標目錄
        await fs.writeFile(filePath, file.buffer);

        return {
          filename: fileName,
          path: filePath,
          size: file.size || 0,
          mimetype: file.mimetype || "application/octet-stream",
        };
      })
    );

    return true;
  } catch (error) {
    console.error("檔案上傳失敗:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
const deleteDBFiles = async (files, cache) => {
  try {
    // console.log(files);
    // for (var i = 0; i < files.length; i++) {
    //   console.log(files[i].split(".")[1]);
    // }
    for (var i = 0; i < files.length; i++) {
      var folder = files[i].split(".")[1];
      if (folder == "pdf") {
        folder = "pdf";
      } else {
        folder = "photo";
      }
      const filePath = path.join(uploadDir, cache, folder, files[i]);

      // 輸出檔案路徑以供檢查
      console.log(`檢查檔案路徑: ${filePath}`);

      try {
        // 檢查檔案是否存在以及是否有讀寫權限
        await fs.access(
          filePath,
          fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
        );
        console.log(`檔案存在且有讀寫權限: ${filePath}`);

        // 刪除檔案
        await fs.unlink(filePath);
        console.log(`檔案已刪除: ${filePath}`);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.warn(`檔案不存在: ${filePath}`);
        } else if (err.code === "EACCES" || err.code === "EPERM") {
          console.error(`沒有權限刪除檔案: ${filePath}`);
        } else {
          console.error(`刪除檔案失敗: ${err.message}`);
        }
      }
    }
    return true;
  } catch (err) {
    throw new Error(`刪除檔案失敗: ${err.message}`);
  }
};
const deletecacheFiles = async (files, cache) => {
  try {
    for (var i = 0; i < files.length; i++) {
      if (!files[i]) {
        throw new Error(`檔案名稱不存在於索引 ${i}`);
      }
      var folder = files[i].split(".")[1];
      if (folder == "pdf") {
        folder = "pdf";
      } else {
        folder = "photo";
      }
      const filePath = path.join(uploadDir, cache, folder, files[i]);

      // 輸出檔案路徑以供檢查
      console.log(`檢查檔案路徑: ${filePath}`);

      try {
        // 檢查檔案是否存在以及是否有讀寫權限
        await fs.access(
          filePath,
          fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
        );
        console.log(`檔案存在且有讀寫權限: ${filePath}`);

        // 刪除檔案
        await fs.unlink(filePath);
        console.log(`檔案已刪除: ${filePath}`);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.warn(`檔案不存在: ${filePath}`);
        } else if (err.code === "EACCES" || err.code === "EPERM") {
          console.error(`沒有權限刪除檔案: ${filePath}`);
        } else {
          console.error(`刪除檔案失敗: ${err.message}`);
        }
      }
    }
    return true;
  } catch (err) {
    throw new Error(`刪除檔案失敗: ${err.message}`);
  }
};

module.exports = {
  deletecacheFiles,
  deleteDBFiles,
  uploadFiles,
};
