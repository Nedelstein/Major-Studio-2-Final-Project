let backgroundAudio = new Audio("audio/backgroundNoise.mp3");
backgroundAudio.volume = 0.3;

$(document).ready(function() {
  $("#modal-close").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
    },
    function() {
      $(this).animate({ opacity: 0.8 }, 500);
    }
  );

  let modal = document.getElementById("modal-splash");
  let btn = document.getElementById("modal-close");

  btn.onclick = function() {
    backgroundAudio.play();
    backgroundAudio.loop = true;
    $(this)
      .parent()
      .fadeOut(800);

    // if (btn.opacity <= 0.3) {
    //   // $(".modal").remove();
    //   document.getElementById("modal-splash").style.display = "none";
    // }

    setTimeout(function() {
      document.getElementById("modal-splash").style.display = "none";
    }, 800);
  };

  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     $(".modal").fadeOut(800);
  //   }
  //   if (modal.opacity <= 0.3) {
  //     $(".modal").remove();
  //   }
  // };
});
