// var auth = localStorage.getItem("auth");
// if (auth !== "success") {
//   window.location.href =
//     "http://localhost/20241110/Zhixun/templates/login.html";
// }
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
        "泳池",
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
  $(".Trial").on("click", function () {
    var element = $(this).find(".fa-solid").attr("class").split(" ");
    var iconType = element.find(
      (cls) => cls !== "fa-solid" && cls.startsWith("fa-")
    );

    localStorage.setItem("iconType", iconType);

    window.location.href = `http://127.0.0.1:5500/20241110/Zhixun/templates/view.html`;
  });
});
