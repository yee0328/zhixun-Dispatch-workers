$(document).ready(function () {
  //載入navbar.html
  $(".navbar").load("navbar.html", function () {
    $("#navToggler").on("click", function () {
      $("#offcanvasNavbar").toggleClass("show");
      console.log($("#offcanvasNavbar").attr("class"));
    });

    $("#closeOffcanvas").on("click", function () {
      $("#offcanvasNavbar").removeClass("show");
    });
    var fun = ""; //導向頁面變數
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
          "泳池",
          "園藝",
          "清潔",
        ];
        dropdownItems.forEach((item) => {
          dropdownMenu.append(
            `<li><div class="dropdown-item clickable">${item}</div></li>`
          );
        });
      }
      dropdownMenu.toggleClass("show");
      fun = $(this).find(".fa-solid").attr("class").split(" ").at(-1);
    });
    $(document).on("click", ".dropdown-item", function () {
      var uploadType = $(this).text();
      localStorage.setItem("uploadType", uploadType);
      if (fun) {
        window.location.href = `${fun}.html`;
      } else {
        // window.location.href = `view.html`;
      }
    });
    $(document).on("click", ".view", function () {
      window.location.href = `view.html`;
    });
  });

  window.BreadcrumbManager = (function () {
    function updateBreadcrumb(iconText, recordType, previewType, editType) {
      const newBreadcrumbs = [];

      if (iconText) {
        newBreadcrumbs.push(
          $(`<li class="breadcrumb-item view clickable">${iconText}</li>`)
        );
      }
      if (recordType) {
        newBreadcrumbs.push(
          $(`<li class="breadcrumb-item recordType">${recordType}</li>`)
        );
      }
      if (previewType) {
        newBreadcrumbs.push(
          $(`<li class="breadcrumb-item previewType">${previewType}</li>`)
        );
      }
      if (editType) {
        newBreadcrumbs.push($(`<li class="breadcrumb-item">${editType}</li>`));
      }

      if (newBreadcrumbs.length > 0) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
              const breadcrumb = $(".breadcrumb");
              if (breadcrumb.length > 0) {
                breadcrumb.append(newBreadcrumbs);

                breadcrumb.find("li").removeClass("active");
                breadcrumb.find("li").last().addClass("active");
                breadcrumb.find("li").not(":last").addClass("clickable");
                observer.disconnect();
              }
            }
          });
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }

    return {
      updateBreadcrumb: updateBreadcrumb,
    };
  })();
});
