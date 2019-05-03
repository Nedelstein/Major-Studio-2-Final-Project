// function navHighlight(elem, home, active) {
//   let url = location.href.split("/"),
//     loc = url[url.length - 1],
//     link = document.querySelectorAll(elem);
//   for (let i = 0; i < link.length; i++) {
//     let path = link[i].href.split("/"),
//       page = path[path.length - 1];
//     if (page == loc || (page == home && loc == "")) {
//       link[i].parentNode.className += " " + active;
//       document.body.className += " " + page.substr(0, page.lastIndexOf("."));
//     }
//   }
// }
// navHighlight(".sidebars a", "index.html", ".active");
/* menu link selector, home page, highlight class */

// function updateActiveLink() {
//   event.preventDefault();
//   var currentSection = location.href.split("#")[1] + "-link";

//   for (var a = 1; a < 7; a++) {
//     document.getElementById("ch" + a + "-link").classList.remove("current");
//   }
//   document.getElementById(currentSection).classList.add("current");
//   return false;
// }

// let navLinks = document
//   .getElementsByTagName("nav")[0]
//   .getElementsByTagName("a");

// let currentpage = url[url.length - 1];
// for (let i = 0; i < navLinks.length; i++) {
//   let lb = navLinks[i].href.split("/");
//   if (lb[lb.length - 1] == currentPage) {
//     navLinks[i].className = "current";
//   }
// }

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
