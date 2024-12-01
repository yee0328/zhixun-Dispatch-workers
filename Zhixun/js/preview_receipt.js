$(document).ready(function () {
  const iconText = "機電"; // 設置預設值
  const uploadtext = "查詢發票";
  var previewType = "發票紀錄";
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(iconText, uploadtext, previewType);
  }
  const orgdata = JSON.parse(localStorage.getItem("orgdata"));
  if (orgdata) {
    if (orgdata[0].edit === 0) {
      fillInfo(orgdata);
    } else {
      var rec_id = localStorage.getItem("recid");
      console.log(rec_id);
      $.ajax({
        url: `${window.API_CONFIG.baseUrl}/receiptDetail`,
        type: "GET",
        data: {
          rec_id: rec_id,
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
    }
  } else {
    var rec_id = localStorage.getItem("recid");
    console.log(rec_id);
    $.ajax({
      url: `${window.API_CONFIG.baseUrl}/receiptDetail`,
      type: "GET",
      data: {
        rec_id: rec_id,
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
  }
  $(".edit-button").on("click", function () {
    if (rec_id) {
      localStorage.setItem("rec_id", rec_id);
      window.location.href = "receipt_edit.html";
    }
  });
  $(".recordType").on("click", function () {
    window.location.href = "records_receipt.html";
  });
});

function fillInfo(data) {
  console.log(data);
  var date = data[0].date.substring(0, 10);
  // 基本資料
  $(".upload-title").text(data[0].rec_title);
  $(".upload-info").text(data[0].rec_Details);
  $(".uploader").text(data[0].user);
  $(".upload-date").text(date);
  var path = "../../file/receipt/";
  $(".slider").on("afterChange", function (event, slick, currentSlide) {
    var currentImageSrc = $(".slider .slick-current ").attr("src");
    $(".image-preview img").attr("src", currentImageSrc);
  });
  const sliderContainer = $(".slider");
  sliderContainer.empty();
  const pdfListContainer = $(".uploaded-file");
  pdfListContainer.empty();
  console.log(data[0].edit);
  if (data[0].edit === 0) {
    let noteAdded = false;
    data[0].file_name.forEach(function (File, index) {
      var floder = File.split(".")[1];
      var orgpath = "../../file/cache/receipt/";
      if (floder == "pdf") {
        const pdfElement = `<li><a href="${orgpath}${floder}/${File}" target="_blank" download>${File} <i class="fa-solid fa-external-link-alt"></i></a></li>`;
        pdfListContainer.append(pdfElement);
        if (!noteAdded) {
          $(".upload-wrapper div").append(
            '<p class="note">＊ 點擊檔案將自動下載</p>'
          );
          noteAdded = true;
        }
      } else {
        floder = "photo";
        const imageElement = `<img src="${orgpath}${floder}/${File}" alt="${File}" class="slider-image">`;
        sliderContainer.append(imageElement);
      }
    });
  } else {
    console.log(data[0].file_name);
    console.log(data[0].file_name.length);
    data[0].file_name.forEach(function (File) {
      var floder = File.split(".")[1];
      if (floder == "pdf") {
        const pdfElement = `<li><a href="${path}${floder}/${File}" target="_blank" download>${File} <i class="fa-solid fa-external-link-alt"></i></a></li>`;
        pdfListContainer.append(pdfElement);
        $(".upload-wrapper div").append(
          '<p class="note">＊ 點擊檔案將自動下載</p>'
        );
      } else {
        floder = "photo";
        const imageElement = `<img src="${path}${floder}/${File}" alt="${File}" class="slider-image">`;
        sliderContainer.append(imageElement);
      }
    });
  }
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
    window.location.href = "records_receipt.html";
  });
}
