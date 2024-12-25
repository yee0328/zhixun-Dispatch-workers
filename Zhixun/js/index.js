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
  $(document).on("click", ".card", function () {
    var uploadType = $(this).find("p").text();
    // alert(uploadType);
    // console.log(uploadType);
    localStorage.setItem("uploadType", uploadType);
    window.location.href = `view.html`;
  });
  var items = [
    { icon: "fa-building", name: "物業", color: "orange", lightShadow: false },
    { icon: "fa-bolt", name: "機電", color: "yellow", lightShadow: true },
    { icon: "fa-battery", name: "弱電", color: "black", lightShadow: false },
    { icon: "fa-elevator", name: "電梯", color: "pink", lightShadow: true },
    { icon: "fa-leaf", name: "園藝", color: "dark-green", lightShadow: true },
    { icon: "fa-recycle", name: "環保", color: "green", lightShadow: false },
    { icon: "fa-broom", name: "社區清潔", color: "purple", lightShadow: true },
    {
      icon: "fa-water-ladder",
      name: "泳池",
      color: "blue",
      lightShadow: false,
    },
    { icon: "fa-print", name: "影印機", color: "brown", lightShadow: false },
    {
      icon: "fa-screwdriver-wrench",
      name: "公設區域修繕",
      color: "gray",
      lightShadow: true,
    },
  ];

  $.each(items, function (index, item) {
    var $li = $("<li>").addClass("col-md-3");
    var $card = $("<div>").addClass("card clickable");
    if (item.lightShadow) {
      $card.addClass("light-shadow");
    }

    var $cardContent = $("<div>").addClass("card-content");
    var $iconBox = $("<div>").addClass("icon-box " + item.color);
    var $icon = $("<i>").addClass("fa-solid " + item.icon);

    $iconBox.append($icon);
    var $p = $("<p>").text(item.name);

    $cardContent.append($iconBox, $p);
    $card.append($cardContent);
    $li.append($card);
    $("#selection").append($li);
  });
});
