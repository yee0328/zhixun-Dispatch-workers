$(document).ready(function () {
  //載入navbar.html
  $(".navbar").load("navbar.html", function () {
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
          "泳池",
          "園藝",
          "清潔",
        ];
        dropdownItems.forEach((item) => {
          dropdownMenu.append(
            `<li><a class="dropdown-item" href="upload_invoice.html">${item}</a></li>`
          );
        });
      }

      dropdownMenu.toggleClass("show");
    });
  });
});
