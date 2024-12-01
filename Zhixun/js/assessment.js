$(document).ready(function () {
  const iconText = "機電"; // 設置預設值
  const uploadtext = "上傳估價單";
  if (typeof BreadcrumbManager !== "undefined") {
    console.log("1");
    BreadcrumbManager.updateBreadcrumb(iconText, uploadtext);
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
    $("#uploadedCount").text(currentCount - 1);
  });

  // 檔案檢視
  $("#uploadedFileList").on("click", ".uploaded-file", function (e) {
    const fileType = $(this).data("file-type");
    const fileUrl = $(this).data("file-url");
    let previewContent = "";

    if (fileType === "application/pdf") {
      previewContent = `<iframe src="${fileUrl}" width="100%" height="500px"></iframe>`;
    } else if (["image/png", "image/jpeg", "image/jpg"].includes(fileType)) {
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
      const formData = new FormData();
      formData.append("title", $("#title").val());
      formData.append("description", $("#description").val());

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
            });

          filePromises.push(filePromise);
        }
      });

      // 等待所有文件處理完成
      await Promise.all(filePromises);

      // 使用 Promise 包裝 AJAX 請求
      const response = await new Promise((resolve, reject) => {
        $.ajax({
          type: "POST",
          url: `${window.API_CONFIG.baseUrl}/uploadassessment`,
          data: formData,
          contentType: false,
          processData: false,
          success: resolve,
          error: reject,
        });
      });
      if (response.status === "success") {
        alert("上傳成功");
        window.location.reload();
      } else {
        alert("上傳失敗:請再試一次");
      }
    } catch (error) {
      console.error("上傳錯誤:", error);
      alert("上傳失敗:請再試一次");
    }
  });
  $("#goBack").on("click", function () {
    window.location.href = "view.html";
  });
});
