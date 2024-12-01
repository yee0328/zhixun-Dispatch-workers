$(document).ready(function () {
  $("#navToggler").on("click", function () {
    $("#offcanvasNavbar").toggleClass("show");
  });

  $("#closeOffcanvas").on("click", function () {
    $("#offcanvasNavbar").removeClass("show");
  });

  $('[data-dropdown="true"]').on("click", function () {
    $(this).toggleClass("active");
    const dropdownMenu = $(this).siblings(".dropdown-menu");
    if (dropdownMenu.children().length === 0) {
      const dropdownItems = [
        "機電",
        "弱電",
        "電梯",
        "廚餘管線",
        "污水處理",
        "園藝",
        "清潔",
      ];
      dropdownItems.forEach((item) => {
        dropdownMenu.append(
          `<li><a class="dropdown-item" href="#">${item}</a></li>`
        );
      });
    }
    dropdownMenu.toggleClass("show");
  });

  $("#goBack").on("click", function () {
    window.location.href = "index.html";
  });

  $("#uploadBox").on("click", function () {
    const fileInput = $(
      '<input type="file" accept=".pdf, .png, .jpeg, .jpg" multiple style="display:none;">'
    );
    fileInput.on("change", function () {
      const files = this.files;
      if (files.length > 0) {
        Array.from(files).forEach((file) => {
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
        });
        const currentCount = parseInt($("#uploadedCount").text(), 10);
        $("#uploadedCount").text(currentCount + files.length);
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
      formData.append("class", $("#category").val());
      formData.append("Detail", $("#title").val());
      formData.append("postion", $("#description").val());

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
          url: `${window.API_CONFIG.baseUrl}/uploadmaintenance`,
          data: formData,
          contentType: false,
          processData: false,
          success: resolve,
          error: reject,
        });
      });
      console.log(response);
      if (response.status === "success") {
        alert("上傳成功");
        window.location.reload();
      } else {
        alert("上傳失敗:" + response.message);
      }
    } catch (error) {
      console.error("上傳錯誤:", error);
      alert("上傳失敗:請再試一次");
    }
  });
});
