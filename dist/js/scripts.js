//sourced from: Jason Labbe @ https://www.openprocessing.org/sketch/413567

/*
Orginally from https://cdn.rawgit.com/ironwallaby/delaunay/master/delaunay.js
Tweaked it so instead of raising an error it would return an empty list.
*/

let Delaunay;

(function() {
  "use strict";

  let EPSILON = 1.0 / 1048576.0;

  function supertriangle(vertices) {
    let xmin = Number.POSITIVE_INFINITY,
      ymin = Number.POSITIVE_INFINITY,
      xmax = Number.NEGATIVE_INFINITY,
      ymax = Number.NEGATIVE_INFINITY,
      i,
      dx,
      dy,
      dmax,
      xmid,
      ymid;

    for (i = vertices.length; i--; ) {
      if (vertices[i][0] < xmin) xmin = vertices[i][0];
      if (vertices[i][0] > xmax) xmax = vertices[i][0];
      if (vertices[i][1] < ymin) ymin = vertices[i][1];
      if (vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
      [xmid - 20 * dmax, ymid - dmax],
      [xmid, ymid + 20 * dmax],
      [xmid + 20 * dmax, ymid - dmax]
    ];
  }

  function circumcircle(vertices, i, j, k) {
    let x1 = vertices[i][0],
      y1 = vertices[i][1],
      x2 = vertices[j][0],
      y2 = vertices[j][1],
      x3 = vertices[k][0],
      y3 = vertices[k][1],
      fabsy1y2 = Math.abs(y1 - y2),
      fabsy2y3 = Math.abs(y2 - y3),
      xc,
      yc,
      m1,
      m2,
      mx1,
      mx2,
      my1,
      my2,
      dx,
      dy;

    /* Check for coincident points */
    if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON) return;
    //throw new Error("Eek! Coincident points!");

    if (fabsy1y2 < EPSILON) {
      m2 = -((x3 - x2) / (y3 - y2));
      mx2 = (x2 + x3) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc = (x2 + x1) / 2.0;
      yc = m2 * (xc - mx2) + my2;
    } else if (fabsy2y3 < EPSILON) {
      m1 = -((x2 - x1) / (y2 - y1));
      mx1 = (x1 + x2) / 2.0;
      my1 = (y1 + y2) / 2.0;
      xc = (x3 + x2) / 2.0;
      yc = m1 * (xc - mx1) + my1;
    } else {
      m1 = -((x2 - x1) / (y2 - y1));
      m2 = -((x3 - x2) / (y3 - y2));
      mx1 = (x1 + x2) / 2.0;
      mx2 = (x2 + x3) / 2.0;
      my1 = (y1 + y2) / 2.0;
      my2 = (y2 + y3) / 2.0;
      xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
      yc = fabsy1y2 > fabsy2y3 ? m1 * (xc - mx1) + my1 : m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return { i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy };
  }

  function dedup(edges) {
    let i, j, a, b, m, n;

    for (j = edges.length; j; ) {
      b = edges[--j];
      a = edges[--j];

      for (i = j; i; ) {
        n = edges[--i];
        m = edges[--i];

        if ((a === m && b === n) || (a === n && b === m)) {
          edges.splice(j, 2);
          edges.splice(i, 2);
          break;
        }
      }
    }
  }

  Delaunay = {
    triangulate: function(vertices, key) {
      let n = vertices.length,
        i,
        j,
        indices,
        st,
        open,
        closed,
        edges,
        dx,
        dy,
        a,
        b,
        c;

      /* Bail if there aren't enough vertices to form any triangles. */
      if (n < 3) return [];

      /* Slice out the actual vertices from the passed objects. (Duplicate the
       * array even if we don't, though, since we need to make a supertriangle
       * later on!) */
      vertices = vertices.slice(0);

      if (key) for (i = n; i--; ) vertices[i] = vertices[i][key];

      /* Make an array of indices into the vertex array, sorted by the
       * vertices' x-position. */
      indices = new Array(n);

      for (i = n; i--; ) indices[i] = i;

      indices.sort(function(i, j) {
        return vertices[j][0] - vertices[i][0];
      });

      /* Next, find the vertices of the supertriangle (which contains all other
       * triangles), and append them onto the end of a (copy of) the vertex
       * array. */
      st = supertriangle(vertices);
      vertices.push(st[0], st[1], st[2]);

      /* Initialize the open list (containing the supertriangle and nothing
       * else) and the closed list (which is empty since we havn't processed
       * any triangles yet). */
      let circCircle = circumcircle(vertices, n + 0, n + 1, n + 2);
      if (circCircle == undefined) return [];

      open = [circumcircle(vertices, n + 0, n + 1, n + 2)];
      closed = [];
      edges = [];

      /* Incrementally add each vertex to the mesh. */
      for (i = indices.length; i--; edges.length = 0) {
        c = indices[i];

        /* For each open triangle, check to see if the current point is
         * inside it's circumcircle. If it is, remove the triangle and add
         * it's edges to an edge list. */
        for (j = open.length; j--; ) {
          /* If this point is to the right of this triangle's circumcircle,
           * then this triangle should never get checked again. Remove it
           * from the open list, add it to the closed list, and skip. */
          dx = vertices[c][0] - open[j].x;
          if (dx > 0.0 && dx * dx > open[j].r) {
            closed.push(open[j]);
            open.splice(j, 1);
            continue;
          }

          /* If we're outside the circumcircle, skip this triangle. */
          dy = vertices[c][1] - open[j].y;
          if (dx * dx + dy * dy - open[j].r > EPSILON) continue;

          /* Remove the triangle and add it's edges to the edge list. */
          edges.push(
            open[j].i,
            open[j].j,
            open[j].j,
            open[j].k,
            open[j].k,
            open[j].i
          );
          open.splice(j, 1);
        }

        /* Remove any doubled edges. */
        dedup(edges);

        /* Add a new triangle for each edge. */
        for (j = edges.length; j; ) {
          b = edges[--j];
          a = edges[--j];
          open.push(circumcircle(vertices, a, b, c));
        }
      }

      /* Copy any remaining open triangles to the closed list, and then
       * remove any triangles that share a vertex with the supertriangle,
       * building a list of triplets that represent triangles. */
      for (i = open.length; i--; ) closed.push(open[i]);
      open.length = 0;

      for (i = closed.length; i--; )
        if (closed[i].i < n && closed[i].j < n && closed[i].k < n)
          open.push(closed[i].i, closed[i].j, closed[i].k);

      /* Yay, we're done! */
      return open;
    },
    contains: function(tri, p) {
      /* Bounding box test first, for quick rejections. */
      if (
        (p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
        (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
        (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
        (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1])
      )
        return null;

      let a = tri[1][0] - tri[0][0],
        b = tri[2][0] - tri[0][0],
        c = tri[1][1] - tri[0][1],
        d = tri[2][1] - tri[0][1],
        i = a * d - b * c;

      /* Degenerate tri. */
      if (i === 0.0) return null;

      let u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
        v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

      /* If we're outside the tri, fail. */
      if (u < 0.0 || v < 0.0 || u + v > 1.0) return null;

      return [u, v];
    }
  };

  if (typeof module !== "undefined") module.exports = Delaunay;
})();

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

//with help from https://www.openprocessing.org/sketch/413567
let allParticles = [];
let maxLevel = 5;
let useFill = false;

let data = [];

let river;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.parent("sketch-holder");
  colorMode(HSB);
  background(199.2, 30, 80);

  river = loadImage("images/river1.png");
  river.resize(169, 1000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  river.resize(169, 1120);
  noStroke();
  fill(199.2, 30, 80, 20);
  rect(0, 0, width, height);

  image(river, width / 9, -10);
  image(river, width / 3, -10);
  image(river, width / 1.65, -10);
  image(river, width / 1.15, -10);

  //create and move particles
  for (let i = allParticles.length - 1; i > -1; i--) {
    allParticles[i].move();

    //remove particles that is below the velocity threshold
    if (allParticles[i].vel.mag() < 0.01) {
      allParticles.splice(i, 1);
    }
  }
  if (allParticles.length > 0) {
    data = Delaunay.triangulate(
      allParticles.map(function(pt) {
        return [pt.pos.x, pt.pos.y];
      })
    );
    strokeWeight(0.3);

    for (let i = 0; i < data.length; i += 3) {
      let p1 = allParticles[data[i]];
      let p2 = allParticles[data[i + 1]];
      let p3 = allParticles[data[i + 2]];

      //don't draw triangle if it's area is too big
      let distThresh = 75;

      if (dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y) > distThresh) {
        continue;
      }
      if (dist(p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue;
      }
      if (dist(p1.pos.x, p1.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue;
      }

      // Base its color by the particle's life.
      // if (useFill) {
      //   noStroke();
      //   fill(150 + p1.life * 1.5, 300, 300);
      // } else {

      noFill();
      stroke(160 + p1.life * 1.5, 100, 200);
      // }
      triangle(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y);
    }
  }
  allParticles.push(new Particle(mouseX, mouseY, maxLevel));
}

// function keyPressed() {
//   useFill = !useFill;
// }

function Particle(x, y, level) {
  this.level = level;
  this.life = 0;

  this.pos = new p5.Vector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.mult(map(this.level, 0, maxLevel, 5, 2));

  this.move = function() {
    this.life++;

    this.vel.mult(0.9);
    this.pos.add(this.vel);

    if (this.life % 10 == 0) {
      if (this.level > 0) {
        this.level -= 1;

        let newParticle = new Particle(this.pos.x, this.pos.y, this.level - 1);
        allParticles.push(newParticle);
      }
    }
  };
}

// const $ = require("jquery");
// require("jquery-ui");

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

    setTimeout(function() {
      document.getElementById("modal-splash").style.display = "none";
    }, 800);
  };
});

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
