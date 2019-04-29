$(document).ready(function() {
  $("#modal-close").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
    },
    function() {
      $(this).animate({ opacity: 0.6 }, 500);
    }
  );

  let modal = document.getElementById("modal-splash");
  let btn = document.getElementById("modal-close");

  btn.onclick = function() {
    $(this)
      .parent()
      .fadeOut(800);

    if (modal.opacity <= 0.3) {
      $(".modal").remove();
    }
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      $(".modal").fadeOut(800);
    }
    if (modal.opacity <= 0.3) {
      $(".modal").remove();
    }
  };
});
