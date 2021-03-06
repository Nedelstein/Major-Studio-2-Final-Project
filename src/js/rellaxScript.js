// const $ = require("jquery");
// require("jquery-ui");

// const Rellax = require("rellax");
// require("typeit");

// on refresh scroll to top
$(window).on("beforeunload", function() {
  $(window).scrollTop(0);
});

// let chapterRequest = new Request("./chapters.json");

// play background audio on start
$(document).ready(function() {
  let chapterRequest = new Request("./chapters.json");
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
      let sis_ch4 = new Audio(chapterAudio.marlena.ch4);
      let sis_ch5 = new Audio(chapterAudio.marlena.ch5);
      let sis_ch6 = new Audio(chapterAudio.marlena.ch6);

      //noah audio chapters
      let bro_ch1 = new Audio(chapterAudio.noah.ch1);
      let bro_ch2 = new Audio(chapterAudio.noah.ch2);
      let bro_ch3 = new Audio(chapterAudio.noah.ch3);
      let bro_ch4 = new Audio(chapterAudio.noah.ch4);
      let bro_ch5 = new Audio(chapterAudio.noah.ch5);
      let bro_ch6 = new Audio(chapterAudio.noah.ch6);

      //dad audio chapters
      let dad_ch1 = new Audio(chapterAudio.dad.ch1);
      let dad_ch2 = new Audio(chapterAudio.dad.ch2);
      let dad_ch3 = new Audio(chapterAudio.dad.ch3);
      let dad_ch4 = new Audio(chapterAudio.dad.ch4);
      let dad_ch5 = new Audio(chapterAudio.dad.ch5);
      let dad_ch6 = new Audio(chapterAudio.dad.ch6);

      //mom audio chapters
      let mom_ch1 = new Audio(chapterAudio.mom.ch1);
      let mom_ch2 = new Audio(chapterAudio.mom.ch2);
      let mom_ch3 = new Audio(chapterAudio.mom.ch3);
      let mom_ch4 = new Audio(chapterAudio.mom.ch4);
      let mom_ch5 = new Audio(chapterAudio.mom.ch5);
      let mom_ch6 = new Audio(chapterAudio.mom.ch6);

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

      $(".sis3gif").hover(
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
      typeItDie(dad_ch3);

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

      ///part 4
      $(".sis4").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          sis_ch4.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          sis_ch4.pause();
        }
      );
      // addNoahgif(sis_ch4);
      $(".bro4").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          bro_ch4.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          bro_ch4.pause();
        }
      );

      $(".bro4gif").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          bro_ch4.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          bro_ch4.pause();
        }
      );

      $(".dad4").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          dad_ch4.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          dad_ch4.pause();
        }
      );

      $(".mom4").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          mom_ch4.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          mom_ch4.pause();
        }
      );

      ///part 5
      $(".sis5").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          sis_ch5.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          sis_ch5.pause();
        }
      );
      $(".bro5").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          bro_ch5.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          bro_ch5.pause();
        }
      );

      $(".dad5").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          dad_ch5.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          dad_ch5.pause();
        }
      );

      $(".mom5").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          mom_ch5.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          mom_ch5.pause();
        }
      );

      ///part 6
      $(".sis6").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          sis_ch6.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          sis_ch6.pause();
          console.log(sis_ch6.currentTime);
        }
      );
      typeItBroDrawing(sis_ch6);
      $(".bro6").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          bro_ch6.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          bro_ch6.pause();
        }
      );
      typeItSisDrawing(bro_ch6);
      $(".dad6").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          dad_ch6.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          dad_ch6.pause();
        }
      );
      typeItDadStay(dad_ch6);
      $(".mom6").hover(
        function() {
          $(this).animate({ opacity: 1.0 }, 500);
          mom_ch6.play();
        },
        function() {
          $(this).animate({ opacity: 0.5 }, 500);
          mom_ch6.pause();
        }
      );

      //part 1 imgs
      addImage(chapterAudio.dad.img, "dad1");
      addImage(chapterAudio.noah.img, "bro1");
      addImage(chapterAudio.marlena.img, "sis1");
      addImage(chapterAudio.mom.img, "mom1");

      //part 2 imgs
      addImage(chapterAudio.dad.img, "dad2");
      addImage(chapterAudio.noah.gif, "bro2");
      addImage(chapterAudio.marlena.img, "sis2");
      addImage(chapterAudio.mom.img, "mom2");

      //part 3 imgs
      addImage(chapterAudio.dad.gif, "dad3");
      addImage(chapterAudio.noah.gif, "bro3");
      addImage(chapterAudio.marlena.img, "sis3");
      addImage(chapterAudio.mom.img, "mom3");

      addImage(chapterAudio.marlena.gif, "sis3gif");

      //part 4 imgs
      addImage(chapterAudio.dad.gif, "dad4");
      addImage(chapterAudio.noah.gif, "bro4");
      addImage(chapterAudio.marlena.gif, "sis4");
      addImage(chapterAudio.mom.gif, "mom4");

      //part 5 imgs
      addImage(chapterAudio.dad.gif, "dad5");
      addImage(chapterAudio.noah.gif, "bro5");
      addImage(chapterAudio.marlena.gif, "sis5");
      addImage(chapterAudio.mom.gif, "mom5");

      //part 6 imgs
      addImage(chapterAudio.dad.gif, "dad6");
      addImage(chapterAudio.noah.gif, "bro6");
      addImage(chapterAudio.marlena.gif, "sis6");
      addImage(chapterAudio.mom.gif, "mom6");
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
  audio.addEventListener("timeupdate", vibrate, false);
  let timeStart = 47;
  let timeEnd = 48;

  function vibrate() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $(".dad3").effect("shake", { distance: 2 });
      $(".bro3").effect("shake", { distance: 2 });

      $(".sis3").fadeOut(20);
      $(".sis3gif").fadeIn(100);

      $("#anxious")
        .typeIt({
          // startDelay: 0,
          speed: 100,
          cursor: false
        })
        .tiType("Anxious.")
        .tiPause(2500)
        .tiDelete(50);

      $("#frantic")
        .typeIt({
          startDelay: 500,
          speed: 100,
          cursor: false
        })
        .tiType("Frantic.")
        .tiPause(2500)
        .tiDelete(50);
    }
  }
}

function typeItDie(audioSource) {
  let audio = audioSource;
  audio.addEventListener("timeupdate", dieType);

  let timeStart = 62;
  let timeEnd = 63;
  function dieType() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $("#dieText")
        .typeIt({
          speed: 100,
          deleteSpeed: 50,
          cursor: false
        })
        .tiType("I don't want to die.")
        .tiPause(2500)
        .tiDelete(50);
    }
  }
}

function shimmer(audioSource) {
  let audio = audioSource;
  audio.addEventListener("timeupdate", shine);
  let timeStart = 32;
  let timeEnd = 33;

  function shine() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $(".bro3").animate({ opacity: 0.1 }, 350);
      $(".bro3").animate({ opacity: 1 }, 350);
    }
  }
}

function typeItBroDrawing(audioSource) {
  let audio = audioSource;
  audio.addEventListener("timeupdate", broTypeIt);

  let timeStart = 63;
  let timeEnd = 63.5;

  function broTypeIt() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $("#broDrawing")
        .typeIt({
          speed: 100,
          deleteSpeed: 50,
          cursor: false
        })
        .tiType("My brother drew the picture.")
        .tiPause(2500)
        .tiDelete(50);
    }
  }
}

function typeItSisDrawing(audioSource) {
  let audio = audioSource;
  audio.addEventListener("timeupdate", sisTypeIt);

  let timeStart = 4;
  let timeEnd = 4.5;

  function sisTypeIt() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $("#sisDrawing")
        .typeIt({
          speed: 100,
          deleteSpeed: 50,
          cursor: false
        })
        .tiType("My sister drew the picture.")
        .tiPause(2500)
        .tiDelete(50);
    }
  }
}

function typeItDadStay(audioSource) {
  let audio = audioSource;
  audio.addEventListener("timeupdate", dadStay);

  let timeStart = 107;
  let timeEnd = 107.5;

  function dadStay() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $("#dadStay")
        .typeIt({
          speed: 100,
          deleteSpeed: 50,
          cursor: false
        })
        .tiType("Stayed with me for years.")
        .tiPause(2500)
        .tiDelete(50);
    }
  }
}

function addNoahgif(audioSource) {
  let audio = audioSource;
  audio.addEventListener("timeupdate", noahGif, false);

  let timeStart = 1;
  let timeEnd = 2;
  function noahGif() {
    if (this.currentTime > timeStart && this.currentTime < timeEnd) {
      $(".bro4").fadeOut(20, function() {
        $(this).hide();
      });
      $(".bro4gif").fadeIn(100);
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

///////parallax effects//////////

//banners
let rellaxBanner1 = new Rellax(".banner1", {
  speed: 5,
  wrapper: ".part1",
  relativeToWrapper: true
});

let rellaxBanner2 = new Rellax(".banner2", {
  speed: 5,
  wrapper: ".part2",
  relativeToWrapper: true
});

let rellaxBanner3 = new Rellax(".banner3", {
  speed: 5,
  wrapper: ".part3",
  relativeToWrapper: true
});

let rellaxBanner4 = new Rellax(".banner4", {
  speed: 5,
  wrapper: ".part4",
  relativeToWrapper: true
});

let rellaxBanner5 = new Rellax(".banner5", {
  speed: 5,
  wrapper: ".part5",
  relativeToWrapper: true
});

let rellaxBanner6 = new Rellax(".banner6", {
  speed: 5,
  wrapper: ".part6",
  relativeToWrapper: true
});

//part 1
let rellaxSis = new Rellax(".rellaxSis", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part1",
  relativeToWrapper: true
});
let rellaxBro = new Rellax(".rellaxBro", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part1",
  relativeToWrapper: true
});
let rellaxDad = new Rellax(".rellaxDad", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part1",
  relativeToWrapper: true
});
let rellaxMom = new Rellax(".rellaxMom", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part1",
  relativeToWrapper: true
});

//part 2
let rellaxSis2 = new Rellax(".rellaxSis2", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part2",
  relativeToWrapper: true
});

let rellaxBro2 = new Rellax(".rellaxBro2", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part2",
  relativeToWrapper: true
});

let rellaxMom2 = new Rellax(".rellaxMom2", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part2",
  relativeToWrapper: true
});

let rellaxDad2 = new Rellax(".rellaxDad2", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part2",
  relativeToWrapper: true
});

//part 3
let rellaxSis3 = new Rellax(".rellaxSis3", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part3",
  relativeToWrapper: true
});

let rellaxBro3 = new Rellax(".rellaxBro3", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part3",
  relativeToWrapper: true
});

let rellaxMom3 = new Rellax(".rellaxMom3", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part3",
  relativeToWrapper: true
});

let rellaxDad3 = new Rellax(".rellaxDad3", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part3",
  relativeToWrapper: true
});

//part 4
let rellaxSis4 = new Rellax(".rellaxSis4", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part4",
  relativeToWrapper: true
});

let rellaxBro4 = new Rellax(".rellaxBro4", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part4",
  relativeToWrapper: true
});

let rellaxMom4 = new Rellax(".rellaxMom4", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part4",
  relativeToWrapper: true
});

let rellaxDad4 = new Rellax(".rellaxDad4", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part4",
  relativeToWrapper: true
});

//part 5

let rellaxSis5 = new Rellax(".rellaxSis5", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part5",
  relativeToWrapper: true
});

let rellaxBro5 = new Rellax(".rellaxBro5", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part5",
  relativeToWrapper: true
});

let rellaxMom5 = new Rellax(".rellaxMom5", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part5",
  relativeToWrapper: true
});

let rellaxDad5 = new Rellax(".rellaxDad5", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part5",
  relativeToWrapper: true
});

//part 6
let rellaxSis6 = new Rellax(".rellaxSis6", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part6",
  relativeToWrapper: true
});

let rellaxBro6 = new Rellax(".rellaxBro6", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part6",
  relativeToWrapper: true
});

let rellaxMom6 = new Rellax(".rellaxMom6", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part6",
  relativeToWrapper: true
});

let rellaxDad6 = new Rellax(".rellaxDad6", {
  speed: randScrollSpeed(-6, 6),
  wrapper: ".part6",
  relativeToWrapper: true
});

//random min/max function
function randScrollSpeed(min, max) {
  let pace = Math.random() * (max - min) + max;
  return pace;
}
