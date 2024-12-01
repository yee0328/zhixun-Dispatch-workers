// require("dotenv").config({ path: "./config/env/.env" });

const Logger = require("../models/plugins/logger");

const database = require("../models/plugins/database.js");
const sys = require("../models/plugins/system.js");

const recordreceipt = async () => {
  try {
    const recript = `SELECT * FROM receipt ORDER BY date DESC`;
    const checkrecript = [recript];
    const checkrecriptresult = await database.query(recript, checkrecript);
    // console.log(checkrecriptresult);
    if (checkrecriptresult.length > 0) {
      return checkrecriptresult;
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const recordassessment = async () => {
  try {
    const assessment = `SELECT * FROM assessment ORDER BY date DESC`;
    const checkassessment = [assessment];
    const checkassessmentresult = await database.query(
      assessment,
      checkassessment
    );
    // console.log(checkassessmentresult);
    if (checkassessmentresult.length > 0) {
      return checkassessmentresult;
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const receiptDetail = async (rec_id) => {
  try {
    const receipt = `
    SELECT r.*, rf.file_name
    FROM receipt r
    INNER JOIN rec_file rf ON r.rec_id = rf.rec_id
    WHERE r.rec_id = ?
    ORDER BY r.date DESC
  `;
    const checkreceiptresult = await database.query(receipt, [rec_id]);
    const mergedData = checkreceiptresult.reduce((rec, curr) => {
      const existing = rec.find((item) => item.rec_id === curr.rec_id);
      if (existing) {
        existing.file_name.push(curr.file_name);
      } else {
        rec.push({
          ...curr,
          file_name: [curr.file_name],
        });
      }
      return rec;
    }, []);
    if (mergedData.length > 0) {
      return mergedData;
    } else {
      return false;
    }
    // if (checkreceiptresult.length > 0) {
    //   return checkreceiptresult;
    // } else {
    //   return false;
    // }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const assessmentDetail = async (ass_id) => {
  try {
    const receipt = `
    SELECT a.*, af.file_name
    FROM assessment a
    INNER JOIN ass_file af ON a.ass_id = af.ass_id
    WHERE a.ass_id = ?
    ORDER BY a.date DESC
  `;
    const checkassessmentresult = await database.query(receipt, [ass_id]);
    const mergedData = checkassessmentresult.reduce((acc, curr) => {
      const existing = acc.find((item) => item.ass_id === curr.ass_id);
      if (existing) {
        existing.file_name.push(curr.file_name);
      } else {
        acc.push({
          ...curr,
          file_name: [curr.file_name],
        });
      }
      return acc;
    }, []);
    if (mergedData.length > 0) {
      return mergedData;
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const recordmaintenance = async () => {
  try {
    const maintenance = `SELECT * FROM maintenance ORDER BY date DESC`;
    const checkMainresult = await database.query(maintenance);
    // console.log(checkMainresult);
    if (checkMainresult.length > 0) {
      return checkMainresult;
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const maintenanceDetail = async (main_id) => {
  try {
    const maintenance = `
    SELECT m.*, mf.file_name
    FROM maintenance m
    INNER JOIN main_file mf ON m.main_id = mf.main_id
    WHERE m.main_id = ?
    ORDER BY m.date DESC
  `;
    const checkMainresult = await database.query(maintenance, [main_id]);
    const mergedData = checkMainresult.reduce((main, curr) => {
      const existing = main.find((item) => item.main_id === curr.main_id);
      if (existing) {
        existing.file_name.push(curr.file_name);
      } else {
        main.push({
          ...curr,
          file_name: [curr.file_name],
        });
      }
      return main;
    }, []);
    if (mergedData.length > 0) {
      return mergedData;
    } else {
      return false;
    }
    // console.log("1", checkreceiptresult);
    //   if (checkMainresult.length > 0) {
    //     return checkMainresult;
    //   } else {
    //     return false;
    //   }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
module.exports = {
  recordreceipt,
  recordassessment,
  receiptDetail,
  assessmentDetail,
  recordmaintenance,
  maintenanceDetail,
};
