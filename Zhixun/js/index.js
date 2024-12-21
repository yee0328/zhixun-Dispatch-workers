var auth = localStorage.getItem("auth");
if (auth) {
  auth = JSON.parse(auth);
} else {
  auth = null;
}
if (
  !auth ||
  auth.status !== "success" ||
  auth.date !==
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate()
) {
  localStorage.removeItem("auth");
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
