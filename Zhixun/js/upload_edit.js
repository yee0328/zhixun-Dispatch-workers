$(document).ready(function () {
  $("#uploadBox").on("click", function () {
    const fileInput = $(
      '<input type="file" accept=".pdf, .png, .jpeg, .jpg" style="display:none;">'
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
        }
        const uploadedFile = `<div class="uploaded-file" data-file-type="${
          file.type
        }" data-file-url="${URL.createObjectURL(file)}"><div>${fileIcon}<span>${
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
  $("#uploadForm").on("submit", function (event) {
    event.preventDefault();
    if ($("#uploadedFileList").children().length === 0) {
      alert("請上傳至少一個文件。");
      return;
    }

    const formData = new FormData(this);
    $("#uploadedFileList .uploaded-file").each(function () {
      const fileUrl = $(this).data("file-url");
      formData.append("files[]", fileUrl);
    });

    $.ajax({
      url: "api",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (response) {
        alert("文件上傳成功！");
      },
      error: function (xhr, status, error) {
        alert("文件上傳失敗，請重試。");
      },
    });
  });
});
