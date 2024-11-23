$(document).ready(function () {
  $(".slider").on("afterChange", function (event, slick, currentSlide) {
    var currentImageSrc = $(".slider .slick-current ").attr("src");
    $(".image-preview img").attr("src", currentImageSrc);
  });

  let data = callAPI();
  fillInfo(data);
});

function callAPI() {
  const data = {
    title: "我是標題3",
    uploader: "王小明",
    uploadInfo: "我是說明3",
    uploadDate: "2024-09-21",
    imageFiles: [
      { url: "../images/night_city.jpg", name: "Night City 1" },
      { url: "../images/night_city.jpg", name: "Night City 2" },
      { url: "../images/logo_black.png", name: "Night City 3" },
      { url: "../images/night_city.jpg", name: "Night City 4" },
    ],
    pdfFiles: [
      { url: "../files/demo.pdf", name: "demo.pdf" },
      { url: "../files/demo.pdf", name: "demo.pdf" },
    ],
  };

  return data;

  $.ajax({
    url: "/api/getFiles",
    type: "GET",
    success: function (response) {},
    error: function (error) {
      console.log("Error fetching files:", error);
    },
  });
}

function fillInfo(data) {
  // 基本資料
  $(".upload-title").text(data.title);
  $(".upload-info").text(data.uploadInfo);
  $(".uploader").text(data.uploader);
  $(".upload-date").text(data.uploadDate);

  // 圖片
  const sliderContainer = $(".slider");
  sliderContainer.empty();

  data.imageFiles.forEach(function (imageFile) {
    const imageElement = `<img src="${imageFile.url}" alt="${imageFile.name}" class="slider-image">`;
    sliderContainer.append(imageElement);
  });

  $(".slider").slick({
    dots: true,
    infinite: false,
    centerMode: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
  });

  var initialImageSrc = $(".slider .slick-current").attr("src");
  $(".image-preview img").attr("src", initialImageSrc);

  // pdf文件
  const pdfListContainer = $(".uploaded-file");
  pdfListContainer.empty();
  if (data.pdfFiles.length === 0) {
    pdfListContainer.append('<li class="no-file">無檔案上傳</li>');
  } else {
    data.pdfFiles.forEach(function (pdfFile) {
      const pdfElement = `<li><a href="${pdfFile.url}" target="_blank" download>${pdfFile.name} <i class="fa-solid fa-external-link-alt"></i></a></li>`;
      pdfListContainer.append(pdfElement);
    });
    $(".upload-wrapper div").append(
      '<p class="note">＊ 點擊檔案將自動下載</p>'
    );
  }
}
