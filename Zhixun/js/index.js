var auth = JSON.parse(localStorage.getItem("auth"));
if (
  auth.status !== "success" ||
  auth.date !==
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
) {
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
