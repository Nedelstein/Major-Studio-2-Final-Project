// const $ = require("jquery");
// require("jquery-ui");

$.fn.isInViewport = function() {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();

  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on("resize scroll", function() {
  $("section").each(function() {
    let activeSec = $(this).attr("id");
    if ($(this).isInViewport()) {
      $("#link-" + activeSec).addClass(activeSec + "-active");
    } else {
      $("#link-" + activeSec).removeClass(activeSec + "-active");
    }
  });
});
