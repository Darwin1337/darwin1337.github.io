setInterval(function() {
  if ($(".image-um").is(":hover") || $(".fase-um").is(":hover")) {
    $(".fase-um p").css("background", "white");
    $(".fase-um p a").css("color", "rgba(0, 0, 0, 0.5)");
    $(".image-um").css("filter", "blur(6px)");
    $(".image-um").css("-webkit-filter", "blur(6px)");
    $(".fase-um p").css("cursor", "pointer");
  } else {
    $(".fase-um p").css("background", "none");
    $(".fase-um p a").css("color", "white");
    $(".image-um").css("filter", "blur(2px)");
    $(".image-um").css("-webkit-filter", "blur(2px)");
  }
  if ($(".image-dois").is(":hover") || $(".fase-dois").is(":hover")) {
    $(".fase-dois p").css("background", "white");
    $(".fase-dois p a").css("color", "rgba(0, 0, 0, 0.5)");
    $(".image-dois").css("filter", "blur(6px)");
    $(".image-dois").css("-webkit-filter", "blur(6px)");
    $(".fase-dois p").css("cursor", "pointer");
  } else {
    $(".fase-dois p").css("background", "none");
    $(".fase-dois p a").css("color", "white");
    $(".image-dois").css("filter", "blur(2px)");
    $(".image-dois").css("-webkit-filter", "blur(2px)");
  }
}, 200);
