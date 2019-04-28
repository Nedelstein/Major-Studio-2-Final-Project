// let rellaxBackground = new Rellax(".rellaxBack", {
//   speed: -5
// });

// document.body.style.cursor = url("images/cursors/canoe.png");
// $("selector").css({ cursor: "url(images/cursors/canoe.cur), default" });

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

//part 1
let rellaxSis = new Rellax(".rellaxSis", {
  speed: randScrollSpeed(5)
});
let rellaxBro = new Rellax(".rellaxBro", {
  speed: randScrollSpeed(5)
});
let rellaxDad = new Rellax(".rellaxDad", {
  speed: randScrollSpeed(5)
});
let rellaxMom = new Rellax(".rellaxMom", {
  speed: randScrollSpeed(5)
});

//part 2
let rellaxSis2 = new Rellax(".rellaxSis2", {
  speed: randScrollSpeed(2)
});

let rellaxBro2 = new Rellax(".rellaxBro2", {
  speed: randScrollSpeed(2)
});

let rellaxMom2 = new Rellax(".rellaxMom2", {
  speed: randScrollSpeed(2)
});

let rellaxDad2 = new Rellax(".rellaxDad2", {
  speed: randScrollSpeed(2)
});

let backgroundAudio = new Audio("audio/backgroundNoise.mp3");
backgroundAudio.volume = 0.3;

let momAudio1 = new Audio("audio/mom/mom_1.mp3");
let dadAudio1 = new Audio("audio/dad/dad_1.mp3");
let sisAudio1 = new Audio("audio/marlena/marlena_1.mp3");
let broAudio1 = new Audio("audio/noah/noah_1.mp3");

let momAudio2 = new Audio("audio/mom/mom_2.mp3");
let dadAudio2 = new Audio("audio/dad/dad_2.mp3");
let sisAudio2 = new Audio("audio/marlena/marlena_2.mp3");
let broAudio2 = new Audio("audio/noah/noah_2.mp3");

// let momTrack, sisTrack, dadTrack, broTrack;
// let momAudio = new Audio(momTrack);
// let dadAudio = new Audio(dadTrack);
// let sisAudio = new Audio(sisTrack);
// let broAudio = new Audio(broTrack);

// on hover no opacity and play/pause audio
$(document).ready(function() {
  backgroundAudio.play();
  backgroundAudio.loop = true;

  $(".sis1").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
      sisAudio1.play();
    },
    function() {
      $(this).animate({ opacity: 0.5 }, 500);
      sisAudio1.pause();
    }
  );
  $(".bro1").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
      broAudio1.play();
    },
    function() {
      $(this).animate({ opacity: 0.5 }, 500);
      broAudio1.pause();
    }
  );

  $(".dad1").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
      dadAudio1.play();
    },
    function() {
      $(this).animate({ opacity: 0.5 }, 500);
      dadAudio1.pause();
    }
  );

  $(".mom1").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
      momAudio1.play();
    },
    function() {
      $(this).animate({ opacity: 0.5 }, 500);
      momAudio1.pause();
    }
  );

  ///part 2
  $(".sis2").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
      sisAudio2.play();
    },
    function() {
      $(this).animate({ opacity: 0.5 }, 500);
      sisAudio2.pause();
    }
  );
  $(".bro2").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
      broAudio2.play();
    },
    function() {
      $(this).animate({ opacity: 0.5 }, 500);
      broAudio2.pause();
    }
  );

  $(".dad2").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
      dadAudio2.play();
    },
    function() {
      $(this).animate({ opacity: 0.5 }, 500);
      dadAudio2.pause();
    }
  );

  $(".mom2").hover(
    function() {
      $(this).animate({ opacity: 1.0 }, 500);
      momAudio2.play();
    },
    function() {
      $(this).animate({ opacity: 0.5 }, 500);
      momAudio2.pause();
    }
  );
});

function randScrollSpeed(max) {
  let pace = Math.random() * (max * 2) - max;
  return pace;
}
