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
        console.log(folder);
        folder = folder[folder.length - 1];
        if (folder == "pdf") {
          folder = "pdf";
        } else {
          folder = "photo";
        }
        const filePath = path.join(uploadDir, type, folder, fileName);
        console.log(filePath);
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
    console.log(uploadedFiles);
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
    const fullCachePath = path.join(uploadDir);

    // 讀取 cache 目錄下的所有子資料夾
    const subFolders = ["pdf", "photo"];

    for (const folder of subFolders) {
      const folderPath = path.join(fullCachePath, cache, folder);
      console.log(`檢查資料夾: ${folderPath}`);

      try {
        // 讀取資料夾中的所有檔案
        const files = await fs.readdir(folderPath);

        // 刪除每個檔案
        for (const file of files) {
          const filePath = path.join(folderPath, file);
          try {
            const stat = await fs.stat(filePath);
            if (stat.isFile()) {
              // 確保是檔案而不是資料夾
              await fs.unlink(filePath);
              console.log(`已刪除檔案: ${filePath}`);
            }
          } catch (err) {
            console.warn(`刪除檔案失敗: ${filePath}`, err);
          }
        }
      } catch (err) {
        if (err.code !== "ENOENT") {
          // 忽略資料夾不存在的錯誤
          console.error(`處理資料夾失敗: ${folderPath}`, err);
        }
      }
    }

    return true;
  } catch (err) {
    console.error("清理 cache 失敗:", err);
    throw err;
  }
};

module.exports = {
  deletecacheFiles,
  deleteDBFiles,
  uploadFiles,
};
