const { createLogger, format, transports } = require("winston");

const sys = require("../plugins/system");

const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.align(),
  format.printf((i) => `${i.level}: ${[i.timestamp]}: ${i.message}`)
);

const todayDate = sys.getTodayDate();

module.exports = createLogger({
  transports: [
    new transports.File({
      filename: "logs/error/error-" + todayDate + ".log",
      level: "error",
      format: customFormat,
    }),
  ],
});
