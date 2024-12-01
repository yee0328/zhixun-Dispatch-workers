$(document).ready(function () {
  const iconText = "機電"; // 設置預設值
  const uploadtext = "維護及施工紀錄查詢";
  var previewType = "維護及施工紀錄";
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(iconText, uploadtext, previewType);
  }
  var main_id = localStorage.getItem("mainid");
  console.log(main_id);
  $.ajax({
    url: `${window.API_CONFIG.baseUrl}/maintenanceDetail`,
    type: "GET",
    data: {
      main_id: main_id,
    },
    success: function (response) {
      console.log("Response data:", response);
      data = response.data;
      fillInfo(data);
    },
    error: function (error) {
      console.log("Error fetching files:", error);
    },
  });
  $(".recordType").on("click", function () {
    window.location.href = "records_maintenance.html";
  });
});

function fillInfo(data) {
  console.log(data);
  var date = data[0].date.substring(0, 10);
  // 基本資料
  $(".upload-title").text(data[0].main_class);
  $(".upload-info").text(data[0].main_Detail);
  $(".postion-info").text(data[0].main_postion);
  $(".uploader").text(data[0].user);
  $(".upload-date").text(date);
  var path = "../../file/maintenance/";
  $(".slider").on("afterChange", function (event, slick, currentSlide) {
    var currentImageSrc = $(".slider .slick-current ").attr("src");
    $(".image-preview img").attr("src", currentImageSrc);
  });
  const sliderContainer = $(".slider");
  sliderContainer.empty();
  const pdfListContainer = $(".uploaded-file");
  pdfListContainer.empty();
  data[0].file_name.forEach(function (File) {
    var floder = File.split(".")[1];
    if (floder == "pdf") {
      const pdfElement = `<li><a href="${path}${floder}/${File}" target="_blank" download>${File} <i class="fa-solid fa-external-link-alt"></i></a></li>`;
      pdfListContainer.append(pdfElement);
    } else {
      floder = "photo";
      const imageElement = `<img src="${path}${floder}/${File}" alt="${File}" class="slider-image">`;
      sliderContainer.append(imageElement);
    }
  });
  $(".slider").slick({
    dots: true,
    infinite: false,
    centerMode: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
  });

  var initialImageSrc = $(".slider .slick-current").attr("src");
  $(".image-preview img").attr("src", initialImageSrc);
  $(document).on("click", ".image-preview img", function () {
    var imageSrc = $(this).attr("src");

    var modalContent = `<img src="${imageSrc}" alt="Image Preview" class="img-fluid" />`;
    $("#filePreviewBody").html(modalContent);

    $("#filePreviewModal").modal("show");
  });
  $("#goBack").on("click", function (event) {
    event.preventDefault();
    //alert("返回上一頁");
    window.location.href = "records_maintenance.html";
  });
}
