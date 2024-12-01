var auth = localStorage.getItem("auth");
if (auth !== "success") {
  window.location.href = "login.html";
}
$(document).ready(function () {
  $(".Trial").on("click", function () {
    var iconText = $(this).find("p").text();
    // console.log(iconText);
    localStorage.setItem("iconText", iconText);
    window.location.href = `view.html`;
  });
});
