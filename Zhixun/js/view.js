$(document).ready(function () {
  // 從 localStorage 獲取並處理圖示類型
  const dict = {
    "fa-bolt": "機電",
    "fa-battery": "弱電",
    "fa-elevator": "電梯",
    "fa-kitchen-set": "廚餘管線",
    "fa-water": "污水處理",
    "fa-water-ladder": "泳池",
    "fa-pagelines": "園藝",
    "fa-broom": "清潔",
  };
  const iconType = localStorage.getItem("iconType") || "fa-question"; // 設置預設值
  const iconClass = dict[iconType]; // 設置預設圖示
  if (iconType) {
    $(".breadcrumb-item.active").text(iconClass);
  }

  $(".upload").on("click", function () {
    var uploadType = $(this).find(".fa-solid").attr("class").split(" ").at(-1);
    // localStorage.setItem("uploadType", uploadType);
    if (uploadType === "invoice") {
      window.location.href = `upload_invoice.html`;
    } else {
      window.location.href = `upload_assessment.html`;
    }
  });
});
