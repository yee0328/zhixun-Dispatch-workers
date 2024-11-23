// var auth = localStorage.getItem("auth");
// if (auth !== "success") {
//   window.location.href =
//     "http://localhost/20241110/Zhixun/templates/login.html";
// }
$(document).ready(function () {
  $(".Trial").on("click", function () {
    var element = $(this).find(".fa-solid").attr("class").split(" ");
    var iconType = element.find(
      (cls) => cls !== "fa-solid" && cls.startsWith("fa-")
    );

    localStorage.setItem("iconType", iconType);

    window.location.href = `http://127.0.0.1:5500/20241110/Zhixun/templates/view.html`;
  });
});
