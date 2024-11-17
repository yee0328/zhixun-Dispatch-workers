require("dotenv").config({ path: "./config/env/.env" });

const Logger = require("../models/plugins/logger");

const database = require("../models/plugins/database.js");

const login = async (account, pwd) => {
  try {
    const sqlStr = `
    SELECT name, account, status 
    FROM user 
    WHERE account = ? 
    AND password = ?
  `;

    const params = [account, pwd];

    const result = await database.query(sqlStr, params);

    return result;
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};

module.exports = { login };
