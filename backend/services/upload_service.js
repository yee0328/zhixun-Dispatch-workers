// require("dotenv").config({ path: "./config/env/.env" });

const Logger = require("../models/plugins/logger");
const sys = require("../models/plugins/system.js");
const database = require("../models/plugins/database.js");

const uploadreceipt = async (title, description, filesname) => {
  try {
    const date = sys.getSysDateTimeV2();
    var rec_id = "";
    const rec_idstr = `SELECT rec_id FROM receipt ORDER BY rec_id DESC LIMIT 1`;
    const checkidparams = [rec_idstr];
    const checkidresult = await database.query(rec_idstr, checkidparams);
    if (checkidresult.length === 0) {
      rec_id = sys.getTodayDate() + "01";
    }
    if (checkidresult.length > 0) {
      if (date === checkidresult[0].rec_id.substring(0, 8)) {
        var serial = checkidresult[0].rec_id.substring(8, 10);
        serial = parseInt(serial) + 1;
        if (serial < 10) {
          rec_id = sys.getTodayDate() + "0" + serial;
        } else {
          rec_id = sys.getTodayDate() + serial;
        }
      } else {
        rec_id = sys.getTodayDate() + "01";
      }
    }
    const sqlStr = `INSERT INTO receipt (rec_id,rec_title, rec_Details,user,date) VALUES (?,?, ?, ?,?)`;
    const params = [rec_id, title, description, "admin", date];
    const result = await database.query(sqlStr, params);
    if (result.affectedRows === 1) {
      for (var i = 0; i < filesname.length; i++) {
        var filename = Buffer.from(filesname[i], "latin1").toString("utf8");
        const sqlStr = `INSERT INTO rec_file (rec_id,file_name) VALUES (?, ?)`;
        const params = [rec_id, filename];
        const result = await database.query(sqlStr, params);
        if (result.affectedRows !== 1) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const uploadassessment = async (title, description, filesname) => {
  try {
    const date = sys.getSysDateTimeV2();
    var ass_id = "";
    const ass_idstr = `SELECT ass_id FROM assessment ORDER BY ass_id DESC LIMIT 1`;
    const checkidparams = [ass_idstr];
    const checkidresult = await database.query(ass_idstr, checkidparams);
    if (checkidresult.length === 0) {
      ass_id = sys.getTodayDate() + "01";
    }
    if (checkidresult.length > 0) {
      if (date === checkidresult[0].rec_id.substring(0, 8)) {
        var serial = checkidresult[0].rec_id.substring(8, 10);
        serial = parseInt(serial) + 1;
        if (serial < 10) {
          ass_id = sys.getTodayDate() + "0" + serial;
        } else {
          ass_id = sys.getTodayDate() + serial;
        }
      } else {
        ass_id = sys.getTodayDate() + "01";
      }
    }

    const sqlStr = `INSERT INTO assessment (ass_id,ass_title, ass_Details,user,date) VALUES (?,?, ?, ?,?)`;
    const params = [ass_id, title, description, "admin", date];
    const result = await database.query(sqlStr, params);
    if (result.affectedRows === 1) {
      for (var i = 0; i < filesname.length; i++) {
        var filename = Buffer.from(filesname[i], "latin1").toString("utf8");
        const sqlStr = `INSERT INTO ass_file (ass_id,file_name) VALUES (?, ?)`;
        const params = [ass_id, filename];
        const result = await database.query(sqlStr, params);
        if (result.affectedRows !== 1) {
          return false;
        }
      }
      if (result.affectedRows !== 1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const uploadmaintenance = async (type, Detail, postion, filesname) => {
  try {
    const date = sys.getSysDateTimeV2();
    var main_id = "";
    const main_idstr = `SELECT main_id FROM maintenance ORDER BY main_id DESC LIMIT 1`;
    const checkidparams = [main_idstr];
    const checkidresult = await database.query(main_idstr, checkidparams);
    if (checkidresult.length === 0) {
      main_id = sys.getTodayDate() + "01";
    }
    if (checkidresult.length > 0) {
      if (date === checkidresult[0].rec_id.substring(0, 8)) {
        var serial = checkidresult[0].rec_id.substring(8, 10);
        serial = parseInt(serial) + 1;
        if (serial < 10) {
          main_id = sys.getTodayDate() + "0" + serial;
        } else {
          main_id = sys.getTodayDate() + serial;
        }
      } else {
        main_id = sys.getTodayDate() + "01";
      }
    }
    const sqlStr = `INSERT INTO maintenance (main_id,main_class,main_Detail ,main_postion,user,date) VALUES (?,?,?, ?, ?,?)`;
    const params = [main_id, type, Detail, postion, "admin", date];
    const result = await database.query(sqlStr, params);
    if (result.affectedRows === 1) {
      for (var i = 0; i < filesname.length; i++) {
        var filename = Buffer.from(filesname[i], "latin1").toString("utf8");
        const sqlStr = `INSERT INTO main_file (main_id,file_name) VALUES (?, ?)`;
        const params = [main_id, filename];
        const result = await database.query(sqlStr, params);
        if (result.affectedRows !== 1) {
          return false;
        }
      }
      if (result.affectedRows !== 1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const checkassstatus = async (id) => {
  const ass_status = `SELECT ass_status FROM assessment where ass_id=?`;
  // const pram = [id];
  const result = await database.query(ass_status, [id]);
  // console.log(result);
  return result[0].ass_status;
};
const checkrecstatus = async (id) => {
  const rec_status = `SELECT rec_status FROM receipt where rec_id=?`;
  const result = await database.query(rec_status, [id]);
  return result[0].rec_status;
};
const editassessment = async (ass_id, title, description, filesname) => {
  try {
    const date = sys.getSysDateTimeV2();
    const editassdata = `UPDATE assessment  SET ass_title=? ,description=? , date=? where ass_id=?`;
    const params = [title, description, date, ass_id];
    const result = await database.query(editassdata, params);
    if (result.affectedRows == 1) {
      const deleteFiles = `DELETE assessment FROM rec_file where rec_id=? `;
      const deleteresule = await database.query(deleteFiles, [rec_id]);
      // console.log(deleteresule);
      if (deleteresule.affectedRows >= 1) {
        for (var i = 0; i < filesname.length; i++) {
          var filename = Buffer.from(filesname[i], "latin1").toString("utf8");
          const sqlStr = `INSERT INTO rec_file (rec_id,file_name) VALUES (?, ?)`;
          const params = [rec_id, filename];
          const result = await database.query(sqlStr, params);
          if (result.affectedRows !== 1) {
            return false;
          }
          if (result.affectedRows !== 1) {
            return false;
          } else {
            return true;
          }
        }
      }
    } else {
      return false;
    }
    console.log(result);
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const editreceipt = async (rec_id, title, description, filesname) => {
  try {
    const date = sys.getSysDateTimeV2();
    const editassdata = `UPDATE  receipt  SET rec_title=?,rec_Details=?,date=? where rec_id=?`;
    const params = [title, description, date, rec_id];
    const result = await database.query(editassdata, params);
    if (result.affectedRows == 1) {
      const deleteFiles = `DELETE FROM rec_file where rec_id=? `;
      const deleteresule = await database.query(deleteFiles, [rec_id]);
      // console.log(deleteresule);
      if (deleteresule.affectedRows >= 1) {
        for (var i = 0; i < filesname.length; i++) {
          var filename = Buffer.from(filesname[i], "latin1").toString("utf8");
          const sqlStr = `INSERT INTO rec_file (rec_id,file_name) VALUES (?, ?)`;
          const params = [rec_id, filename];
          const result = await database.query(sqlStr, params);
          if (result.affectedRows !== 1) {
            return false;
          }
          if (result.affectedRows !== 1) {
            return false;
          } else {
            return true;
          }
        }
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR:" + err);
    Logger.error("ERROR:" + err.stack);
    return false;
  }
};
const getrecfilename = async (id) => {
  // console.log(id);
  var filearray = [];
  const rec_status = `SELECT file_name FROM rec_file where rec_id=?`;
  const result = await database.query(rec_status, [id]);
  // console.log(result);
  for (var i = 0; i < result.length; i++) {
    filearray.push(result[i].file_name);
  }
  return filearray;
};
const getassfilename = async (id) => {
  // console.log(id);
  var filearray = [];
  const rec_status = `SELECT file_name FROM ass_file where ass_id=?`;
  const result = await database.query(rec_status, [id]);
  // console.log(result);
  for (var i = 0; i < result.length; i++) {
    filearray.push(result[i].file_name);
  }
  return filearray;
};

module.exports = {
  uploadreceipt,
  uploadassessment,
  uploadmaintenance,
  checkassstatus,
  checkrecstatus,
  editassessment,
  editreceipt,
  getrecfilename,
  getassfilename,
};