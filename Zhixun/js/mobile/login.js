$(document).ready(function () {
  $(".fa-eye-slash").on("click", function () {
    const passwordInput = $("#password");
    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
      $(this).removeClass("fa-eye-slash").addClass("fa-eye");
    } else {
      passwordInput.attr("type", "password");
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
    }
  });

  $("#login-form").on("submit", function (event) {
    event.preventDefault(); // 防止表單提交
    const account = $("#username").val();
    const password = $("#password").val();
    $.ajax({
      type: "POST",
      url: `${window.API_CONFIG.baseUrl}/manufacturerLogin`,
      data: {
        account: account,
        password: password,
      },
      success: function (response) {
        if (response.status === "success") {
          var date =
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate();
          var auth = {
            status: "success",
            date: date,
            name: response.name,
          };
          localStorage.setItem("auth", JSON.stringify(auth));
          window.location.href = "index.html";
        } else {
          alert("帳號或密碼錯誤");
        }
      },
    });
    // 監聽 Enter 鍵
    $("#login-form input").on("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // 防止預設行為
        $("#login-form").submit(); // 觸發表單提交
      }
    });
  });
});
