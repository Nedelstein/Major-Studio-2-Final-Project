// "use strict";
let chapterRequest = new Request("./chapters.json");

let backgroundAudio = new Audio("audio/backgroundNoise.mp3");
backgroundAudio.volume = 0.3;

// play background audio on start
$(document).ready(function() {
  backgroundAudio.play();
  backgroundAudio.loop = true;

  fetch(chapterRequest)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(chapterAudio) {
      console.log(chapterAudio);

      //sister audio chapters
      let sis_ch1 = new Audio(chapterAudio.marlena.ch1);
      let sis_ch2 = new Audio(chapterAudio.marlena.ch2);
      let sis_ch3 = new Audio(chapterAudio.marlena.ch3);

      //noah audio chapters
      let bro_ch1 = new Audio(chapterAudio.noah.ch1);
      let bro_ch2 = new Audio(chapterAudio.noah.ch2);
      let bro_ch3 = new Audio(chapterAudio.noah.ch3);

      //dad audio chapters
      let dad_ch1 = new Audio(chapterAudio.dad.ch1);
      let dad_ch2 = new Audio(chapterAudio.dad.ch2);
      let dad_ch3 = new Audio(chapterAudio.dad.ch3);

      //mom audio chapters
      let mom_ch1 = new Audio(chapterAudio.mom.ch1);
      let mom_ch2 = new Audio(chapterAudio.mom.ch2);
      let mom_ch3 = new Audio(chapterAudio.mom.ch3);

      $(".sis1").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          sis_ch1.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          sis_ch1.pause();
        }
      );
      $(".bro1").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          bro_ch1.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          bro_ch1.pause();
        }
      );
      $(".dad1").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          dad_ch1.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          dad_ch1.pause();
        }
      );
      $(".mom1").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          mom_ch1.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          mom_ch1.pause();
        }
      );

      ///part 2
      $(".sis2").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          sis_ch2.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          sis_ch2.pause();
        }
      );
      $(".bro2").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          bro_ch2.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          bro_ch2.pause();
        }
      );

      $(".dad2").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          dad_ch2.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          dad_ch2.pause();
        }
      );

      $(".mom2").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          mom_ch2.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          mom_ch2.pause();
        }
      );

      //part 3
      $(".sis3").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          sis_ch3.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          sis_ch3.pause();
        }
      );
      shake(sis_ch3);
      $(".bro3").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          bro_ch3.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          bro_ch3.pause();
        }
      );

      $(".dad3").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          dad_ch3.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          dad_ch3.pause();
        }
      );

      $(".mom3").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          mom_ch3.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          mom_ch3.pause();
        }
      );
      shimmer(bro_ch3);

      //part 1 imgs
      addImage(chapterAudio.dad.img, "dad1");
      addImage(chapterAudio.noah.img, "bro1");
      addImage(chapterAudio.marlena.img, "sis1");
      addImage(chapterAudio.mom.img, "mom1");

      //part 2 imgs
      addImage(chapterAudio.dad.img, "dad2");
      addImage(chapterAudio.noah.img, "bro2");
      addImage(chapterAudio.marlena.img, "sis2");
      addImage(chapterAudio.mom.img, "mom2");

      //part 3 imgs
      addImage(chapterAudio.dad.img, "dad3");
      addImage(chapterAudio.noah.img, "bro3");
      addImage(chapterAudio.marlena.img, "sis3");
      addImage(chapterAudio.mom.img, "mom3");
    });
});

function addImage(imgSource, sect) {
  let img = document.createElement("img");
  img.src = imgSource;
  let chapter = document.getElementsByClassName(sect);
  $(chapter).append(img);
}

function shake(audioSource) {
  let audio = audioSource;
  audio.addEventListener("timeupdate", vibrate);
  let timeStart = 86;
  let timeEnd = 89;

  function vibrate() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $(".dad3").effect("shake", { distance: 5 });
      $(".bro3").effect("shake", { distance: 5 });

      $("#anxious").toggle({
        effect: "scale",
        direction: "horizontal",
        duration: "300"
      });

      $("#frantic").toggle({
        effect: "scale",
        direction: "horizontal",
        duration: "300"
      });
    }
  }
}

function shimmer(audioSource) {
  let audio = audioSource;
  audio.addEventListener("timeupdate", shine);
  let timeStart = 32;
  let timeEnd = 34;

  function shine() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $(".bro3").animate({ opacity: 0.1 }, 350);
      $(".bro3").animate({ opacity: 1 }, 350);

      console.log("working");
    }
  }
}

//cursor change
$(function() {
  $("body")
    .mousemove(function(e) {
      $(".cursor")
        .show()
        .css({
          left: e.clientX,
          top: e.clientY
        });
    })
    .mouseout(function() {
      $(".cursor").hide();
    });
});

//parallax effects
//part 1
let rellaxSis = new Rellax(".rellaxSis", {
  speed: randScrollSpeed(2, 3)
});
let rellaxBro = new Rellax(".rellaxBro", {
  speed: randScrollSpeed(2, 3)
});
let rellaxDad = new Rellax(".rellaxDad", {
  speed: randScrollSpeed(2, 3)
});
let rellaxMom = new Rellax(".rellaxMom", {
  speed: randScrollSpeed(2, 3)
});

//part 2
let rellaxSis2 = new Rellax(".rellaxSis2", {
  speed: randScrollSpeed(1.1, 2)
});

let rellaxBro2 = new Rellax(".rellaxBro2", {
  speed: randScrollSpeed(1.1, 2)
});

let rellaxMom2 = new Rellax(".rellaxMom2", {
  speed: randScrollSpeed(1.1, 2)
});

let rellaxDad2 = new Rellax(".rellaxDad2", {
  speed: randScrollSpeed(1.1, 2)
});

//part 3
let rellaxSis3 = new Rellax(".rellaxSis3", {
  speed: randScrollSpeed(0.3, 0.6)
});

let rellaxBro3 = new Rellax(".rellaxBro3", {
  speed: randScrollSpeed(0.3, 0.6)
});

let rellaxMom3 = new Rellax(".rellaxMom3", {
  speed: randScrollSpeed(0.3, 0.6)
});

let rellaxDad3 = new Rellax(".rellaxDad3", {
  speed: randScrollSpeed(0.3, 0.6)
});

//random min/max function
function randScrollSpeed(min, max) {
  let pace = Math.random() * (max - min) + max;
  return pace;
}
