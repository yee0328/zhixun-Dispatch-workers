var auth = JSON.parse(localStorage.getItem("mainAuth"));
console.log(auth);
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
  localStorage.removeItem("mainAuth");
  window.location.href = "login.html";
}
$(document).ready(function () {
  $("#navToggler").on("click", function () {
    $("#offcanvasNavbar").toggleClass("show");
  });

  $("#closeOffcanvas").on("click", function () {
    $("#offcanvasNavbar").removeClass("show");
  });

  // $('.fa-eye-slash').on('click', function () {
  //     const passwordInput = $('#password');
  //     if (passwordInput.attr('type') === 'password') {
  //         passwordInput.attr('type', 'text');
  //         $(this).removeClass('fa-eye-slash').addClass('fa-eye');
  //     } else {
  //         passwordInput.attr('type', 'password');
  //         $(this).removeClass('fa-eye').addClass('fa-eye-slash');
  //     }
  // });
  $(".selection").on("click", function () {
    var id = $(this).find(".fa-solid").attr("id");
    window.location.href = `${id}.html`;
  });
});
