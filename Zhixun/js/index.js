var auth = JSON.parse(localStorage.getItem("auth"));
if (
  auth == null ||
  auth.status !== "success" ||
  auth.date !==
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate() ||
  auth.status == null
) {
  localStorage.removeItem("auth");
  window.location.href = "login.html";
}
$(document).ready(function () {
  $(".card").on("click", function () {
    var uploadType = $(this).find("p").text();
    localStorage.setItem("uploadType", uploadType);
    window.location.href = `view.html`;
  });
});
