var auth = localStorage.getItem("auth");
if (auth !== "success") {
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
    window.location.href = `http://localhost/20241110/Zhixun/templates/mobile/${id}.html`;
  });
});
