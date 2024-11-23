$(document).ready(function () {
  let data = callAPI();
  fillInfo(data);
});

function callAPI() {
  const data = {
    title: "我是標題3",
    uploader: "王小明",
    uploadInfo: "我是說明3",
    uploadDate: "2024-09-21",
    imageFiles: [],
    pdfFiles: [],
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
