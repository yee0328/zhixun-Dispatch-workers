$(document).ready(function () {
  const iconText = "機電"; // 設置預設值
  const uploadtext = "查詢估價單紀錄";
  var previewType = "估價單紀錄";
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(iconText, uploadtext, previewType);
  }
  var ass_id = localStorage.getItem("ass_id");
  const orgdata = JSON.parse(localStorage.getItem("orgdata"));
  console.log(orgdata);
  if (orgdata) {
    if (orgdata[0].edit === 0) {
      fillInfo(orgdata);
    } else {
      console.log(ass_id);
      $.ajax({
        url: `${window.API_CONFIG.baseUrl}/assessmentDetail`,
        type: "GET",
        data: {
          ass_id: ass_id,
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
    $.ajax({
      url: `${window.API_CONFIG.baseUrl}/assessmentDetail`,
      type: "GET",
      data: {
        ass_id: ass_id,
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
    if (ass_id) {
      localStorage.setItem("ass_id", ass_id);
      window.location.href = "assessment_edit.html";
    }
  });
  $(".recordType").on("click", function () {
    window.location.href = "records_assessmentt.html";
  });
});

function fillInfo(data) {
  console.log(data);
  var date = data[0].date.substring(0, 10);
  // 基本資料
  $(".upload-title").text(data[0].ass_title);
  $(".upload-info").text(data[0].ass_Details);
  $(".uploader").text(data[0].user);
  $(".upload-date").text(date);
  var path = "../../file/assessment/";
  const sliderContainer = $(".slider");
  sliderContainer.empty();
  const pdfListContainer = $(".uploaded-file");
  pdfListContainer.empty();
  if (data[0].edit === 0) {
    let noteAdded = false;
    data[0].file_name.forEach(function (File, index) {
      var floder = File.split(".")[1];
      var orgpath = "../../file/cache/assessment/";
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

  $("#goBack").on("click", function (event) {
    event.preventDefault();
    // alert("返回上一頁");
    window.location.href = "records_assessment.html";
  });
  var initialImageSrc = $(".slider .slick-current").attr("src");
  $(".image-preview img").attr("src", initialImageSrc);
  $(document).on("click", ".image-preview img", function () {
    var imageSrc = $(this).attr("src");

    var modalContent = `<img src="${imageSrc}" alt="Image Preview" class="img-fluid" />`;
    $("#filePreviewBody").html(modalContent);

    $("#filePreviewModal").modal("show");
  });
  var initialImageSrc = $(".slider .slick-current").attr("src");
  $(".image-preview img").attr("src", initialImageSrc);
}
