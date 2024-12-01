function getSysDateTime() {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}

function getSysDateTimeV2() {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return year + "-" + month + "-" + day;
}

function getTodayDate() {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  } else {
    month = `${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  } else {
    day = `${day}`;
  }

  return year + month + day;
}

module.exports = {
  getSysDateTime,
  getTodayDate,
  getSysDateTimeV2,
};
