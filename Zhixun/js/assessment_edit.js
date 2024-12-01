$(document).ready(function () {
  const iconText = "機電"; // 設置預設值
  const recordType = "查詢估價單";
  const previewType = "估價單紀錄";
  const editType = "編輯估價單";
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(
      iconText,
      recordType,
      previewType,
      editType
    );
  }
  var ass_id = localStorage.getItem("ass_id");
  const orgdata = JSON.parse(localStorage.getItem("orgdata"));
  if (orgdata) {
    var path = "../../file/cache/assessment/";
    $("#title").val(orgdata[0].ass_title);
    $("#description").val(orgdata[0].ass_Details);
    $("#uploadedCount").text(orgdata[0].file_name.length);
    console.log(orgdata[0].file_name.length);
    orgdata[0].file_name.forEach(function (File) {
      var floder = File.split(".")[1];
      let fileIcon = '<i class="fa-solid fa-file file"></i>';
      if (floder === "pdf") {
        fileIcon = '<i class="fa-solid fa-file-pdf file"></i>';
      } else if (["png", "jpeg", "jpg"].includes(floder)) {
        fileIcon = '<i class="fa-solid fa-file-image file"></i>';
      } else {
        alert("檔案格式錯誤");
        return;
      }
      if (floder === "pdf") {
        const uploadedFile = `<div class="uploaded-file" data-file-type="${floder} data-file-url="${path}${floder}/${File}"
        data-file-name="${File}"><div>${fileIcon}<span>${File}</span></div><div class="delete-icon"><i class="fa-solid fa-trash-can delete-file"></i></div></div>`;
        $("#uploadedFileList").append(uploadedFile);
      } else {
        floder = "photo";
        const uploadedFile = `<div class="uploaded-file" data-file-type="${floder}" data-file-url="${path}${floder}/${File}"
        data-file-name="${File}"><div>${fileIcon}<span>${File}</span></div><div class="delete-icon"><i class="fa-solid fa-trash-can delete-file"></i></div></div>`;
        $("#uploadedFileList").append(uploadedFile);
      }
    });
  } else {
    $.ajax({
      url: `${window.API_CONFIG.baseUrl}/assessmentDetail`,
      type: "GET",
      data: {
        ass_id: ass_id,
      },
      success: function (response) {
        data = response.data;
        console.log(data);
        var path = "../../file/assessment/";
        $("#title").val(data[0].ass_title);
        $("#description").val(data[0].ass_Details);
        $("#uploadedCount").text(data[0].file_name.length);
        console.log(data[0].file_name.length);
        data[0].file_name.forEach(function (File) {
          var floder = File.split(".")[1];
          let fileIcon = '<i class="fa-solid fa-file file"></i>';
          if (floder === "pdf") {
            fileIcon = '<i class="fa-solid fa-file-pdf file"></i>';
          } else if (["png", "jpeg", "jpg"].includes(floder)) {
            fileIcon = '<i class="fa-solid fa-file-image file"></i>';
          } else {
            alert("檔案格式錯誤");
            return;
          }
          if (floder === "pdf") {
            const uploadedFile = `<div class="uploaded-file" data-file-type="${floder} data-file-url="${path}${floder}/${File}"
          data-file-name="${File}"><div>${fileIcon}<span>${File}</span></div><div class="delete-icon"><i class="fa-solid fa-trash-can delete-file"></i></div></div>`;
            $("#uploadedFileList").append(uploadedFile);
          } else {
            floder = "photo";
            const uploadedFile = `<div class="uploaded-file" data-file-type="${floder}" data-file-url="${path}${floder}/${File}"
          data-file-name="${File}"><div>${fileIcon}<span>${File}</span></div><div class="delete-icon"><i class="fa-solid fa-trash-can delete-file"></i></div></div>`;
            $("#uploadedFileList").append(uploadedFile);
          }
        });
      },
      error: function (error) {
        console.log("Error fetching files:", error);
      },
    });
  }
  $("#uploadBox").on("click", function () {
    const fileInput = $(
      '<input type="file" accept=".pdf, .png, .jpeg, .jpg" multiple style="display:none;">'
    );
    fileInput.on("change", function () {
      const file = this.files[0];
      if (file) {
        let fileIcon = '<i class="fa-solid fa-file file"></i>';
        if (file.type === "application/pdf") {
          fileIcon = '<i class="fa-solid fa-file-pdf file"></i>';
        } else if (
          ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
        ) {
          fileIcon = '<i class="fa-solid fa-file-image file"></i>';
        } else {
          alert("檔案格式錯誤");
          return;
        }
        const uploadedFile = `<div class="uploaded-file" data-file-type="${
          file.type
        }" data-file-name="${file.name}" data-file-url="${URL.createObjectURL(
          file
        )}"><div>${fileIcon}<span>${
          file.name
        }</span></div><div class="delete-icon"><i class="fa-solid fa-trash-can delete-file"></i></div></div>`;
        $("#uploadedFileList").append(uploadedFile);
        const currentCount = parseInt($("#uploadedCount").text(), 10);
        $("#uploadedCount").text(currentCount + 1);
      }
    });
    fileInput.click();
  });

  $("#uploadedFileList").on("click", ".delete-icon", function (e) {
    e.stopPropagation();
    $(this).closest(".uploaded-file").remove();
    const currentCount = parseInt($("#uploadedCount").text(), 10);
    var count = currentCount - 1;
    if (count < 0) {
      count = 0;
    }
    $("#uploadedCount").text(count);
  });

  // 檔案檢視
  $("#uploadedFileList").on("click", ".uploaded-file", function (e) {
    const fileType = $(this).data("file-type");
    const fileUrl = $(this).data("file-url");
    let previewContent = "";

    if (fileType === "application/pdf" || fileType === "pdf") {
      previewContent = `<iframe src="${fileUrl}" width="100%" height="500px"></iframe>`;
    } else if (
      ["image/png", "image/jpeg", "image/jpg"].includes(fileType) ||
      fileType === "photo"
    ) {
      console.log(fileType);
      previewContent = `<img src="${fileUrl}" class="img-fluid" alt="File Preview">`;
    }

    $("#filePreviewBody").html(previewContent);
    var myModal = new bootstrap.Modal(
      document.getElementById("filePreviewModal")
    );
    myModal.show();
  });

  $("#cancelButton").on("click", function () {
    var cancelModal = new bootstrap.Modal(
      document.getElementById("cancelModal")
    );
    cancelModal.show();
  });

  $("#confirmBtn").on("click", function () {
    var cancelModal = bootstrap.Modal.getInstance(
      document.getElementById("cancelModal")
    );
    cancelModal.hide();
  });
  $("#uploadForm").on("submit", async function (event) {
    event.preventDefault();

    try {
      console.log($("#title").val());
      const file_name = [];
      const orgdata = [];
      const formData = new FormData();
      formData.append("title", $("#title").val());
      formData.append("description", $("#description").val());
      formData.append("id", ass_id);
      const filePromises = [];

      $(".uploaded-file").each(function () {
        const fileUrl = $(this).data("file-url");
        const fileName = $(this).data("file-name");

        if (fileUrl && fileName) {
          const filePromise = fetch(fileUrl)
            .then((response) => response.blob())
            .then((blob) => {
              formData.append(
                "files",
                new File([blob], fileName, { type: blob.type })
              );
              file_name.push(fileName);
            });

          filePromises.push(filePromise);
        }
      });
      // 等待所有文件處理完成
      await Promise.all(filePromises);

      // // 使用 Promise 包裝 AJAX 請求
      const response = await new Promise((resolve, reject) => {
        $.ajax({
          type: "POST",
          url: `${window.API_CONFIG.baseUrl}/editassessment`,
          data: formData,
          contentType: false,
          processData: false,
          success: resolve,
          error: reject,
        });
      });
      if (response.status === "success") {
        orgdata.push({
          ass_id: ass_id,
          ass_title: $("#title").val(),
          floder: "assessment",
          user: "admin",
          ass_Details: $("#description").val(),
          date: new Date().toISOString().split("T")[0], // 當前日期
          file_name: file_name,
          edit: response.data,
        });
        localStorage.setItem("orgdata", JSON.stringify(orgdata));
        window.location.href = "preview_assessment.html";
      } else {
        alert("上傳失敗:請再試一次");
      }
    } catch (error) {
      console.error("上傳錯誤:", error);
      alert("上傳失敗:請再試一次");
    }
  });
  $("#goBack").on("click", function (event) {
    event.preventDefault();
    window.location.href = "preview_assessment.html";
  });
  $(".recordType").on("click", function () {
    window.location.href = "records_assessmentt.html";
  });
  $(".previewType").on("click", function () {
    window.location.href = "preview_assessmentt.html";
  });
});