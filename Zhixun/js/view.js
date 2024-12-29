// // 刪快取資料夾裡的檔案
// const orgdata = JSON.parse(localStorage.getItem("orgdata"));

// if (orgdata && Array.isArray(orgdata) && orgdata.length > 0) {
//   orgdata.forEach((item) => {
//     if (item && item.file_name && item.floder) {
//       $.ajax({
//         url: `${window.API_CONFIG.baseUrl}/deletecache`,
//         type: "POST",
//         data: {
//           file_name: item.file_name.join(","),
//           floder: item.floder,
//         },
//         success: function (response) {
//           console.log("Response data:", response);
//         },
//         error: function (error) {
//           console.log("Error fetching files:", error);
//         },
//       });
//     }
//   });

//   localStorage.removeItem("orgdata");
// }
$(document).ready(function () {
  const iconText = localStorage.getItem("uploadType");
  if (typeof BreadcrumbManager !== "undefined") {
    BreadcrumbManager.updateBreadcrumb(iconText);
  }
  $(".upload").on("click", function () {
    var uploadType = $(this).find(".fa-solid").attr("class").split(" ").at(-1);
    window.location.href = `upload_${uploadType}.html`;
  });

  $(".record").on("click", function () {
    var recordType = $(this).find(".fa-solid").attr("class").split(" ").at(-1);
    window.location.href = `records_${recordType}.html`;
  });
  var changeText = document.getElementById("changeText");
  changeText.innerHTML = changeText.innerHTML.replace("機電", iconText);
});
