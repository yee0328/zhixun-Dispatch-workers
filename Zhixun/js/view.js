// 刪快取資料夾裡的檔案
const orgdata = JSON.parse(localStorage.getItem("orgdata"));

if (orgdata && Array.isArray(orgdata) && orgdata.length > 0) {
  orgdata.forEach((item) => {
    if (item && item.file_name && item.floder) {
      $.ajax({
        url: `${window.API_CONFIG.baseUrl}/deletecache`,
        type: "POST",
        data: {
          file_name: item.file_name.join(","),
          floder: item.floder,
        },
        success: function (response) {
          console.log("Response data:", response);
        },
        error: function (error) {
          console.log("Error fetching files:", error);
        },
      });
    }
  });

  localStorage.removeItem("orgdata");
}
$(document).ready(function () {
  const iconText = "機電"; // 設置預設值
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(iconText);
  }
  $(".upload").on("click", function () {
    var uploadType = $(this).find(".fa-solid").attr("class").split(" ").at(-1);
    var uploadtext = $(this).text();

    localStorage.setItem("uploadtext", uploadtext);
    window.location.href = `upload_${uploadType}.html`;
  });
  if (!localStorage.getItem("orgdata")) {
    console.log("beforeunload event was triggered");
  } else {
    console.log("fail");
  }

  $(".record").on("click", function () {
    var recordType = $(this).find(".fa-solid").attr("class").split(" ").at(-1);
    // var recordtext = $(this).text();
    // console.log(recordtext);
    // localStorage.setItem("recordtext", recordtext);
    window.location.href = `records_${recordType}.html`;
    // if (recordType === "invoice") {
    //   window.location.href = `records_invoice.html`;
    // } else {
    //   window.location.href = `records_rec.html`;
    // }
  });
});
