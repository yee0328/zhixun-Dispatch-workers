const mysql = require("mysql2/promise");

const Logger = require("./logger");

async function query(sql, params) {
  try {
    // MySQL 連線設定
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "", // XAMPP 預設密碼為空
      database: "zhixun",
    });

    const [results] = await connection.execute(sql, params);
    await connection.end();
    return results;
  } catch (err) {
    console.log("MySQL ERROR", err);
    Logger.error("MySQL ERROR:" + err.stack);
    return [];
  }
}

module.exports.query = query;
