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
            `<li><div class="dropdown-item">${item}</div></li>`
          );
        });
      }
      dropdownMenu.toggleClass("show");
      fun = $(this).find(".fa-solid").attr("class").split(" ").at(-1);
    });
    $("#goBack").on("click", function () {
      window.history.back();
    });
    $(document).on("click", ".dropdown-item", function () {
      var type = $(this).text();
      localStorage.setItem("type", type);
      window.location.href = `${fun}.html`;
    });
  });
});
