window.onload = () => {
  function keyListener(code) {    
    if(move == "x" && code == 38) {      
      // up
      move = "y";
      vx = 0;
      vy = -vel;
      return;
    }
    if(move == "x" && code == 40) {
      // down
      move = "y";
      vx = 0;
      vy = vel;
      return;
    }
    if(move == "y" && code == 37) {
      // left
      move = "x";
      vx = -vel;
      vy = 0;
      return;
    }
    if(move == "y" && code == 39) {
      // right
      move = "x";
      vx = vel;
      vy = 0;
      return;
    }
  }
  
  let stage = document.getElementById("stage");  
  let ctx = stage.getContext("2d");
  
  let score = 0;
  let pScore = document.getElementsByClassName("p-score")[0];

  document.addEventListener("keydown", () => {
    keyListener(event.keyCode);
  });

  const vel = 1;
  let move = "x";
  let vx = 1, vy = 0;
  let px = 10, py = 20;
  let lp = 20, qp = 20;
  let ax = ay = 15;

  let trail = [];
  tail = 1;

  setInterval(() => {
    px += vx;
    py += vy;

    if(px < 0) {
      px = qp - 1;
    }
    if(px > qp - 1) {
      px = 0;
    }
    if(py < 0) {
      py = qp - 1;
    }
    if(py > qp - 1) {
      py = 0;
    }

    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(0, 0, stage.width, stage.height);

    ctx.fillStyle = "red";
    ctx.fillRect(ax * lp, ay * lp, lp, lp);

    ctx.fillStyle = "green";
    for(let i = 0; i <trail.length; i++) {
      ctx.fillRect(trail[i].x * lp, trail[i].y * lp, lp, lp);
      if(trail[i].x == px && trail[i].y == py) {
        tail = 1;
        vx = vy = 0;
      }
    }

    trail.push( {x: px, y: py} );
    while(trail.length > tail) {
      trail.shift();
    }

    if(ax == px && ay == py) {
      tail++;
      score += 2;
      pScore.innerHTML = `Pontuação: ${score}`;
      ax = Math.floor(Math.random() * qp);
      ay = Math.floor(Math.random() * qp);
    }
  }, 60);

  const btnLeft = document.getElementById("left");
  btnLeft.addEventListener("click", () => {
    keyListener(37)
  });

  const btnRight = document.getElementById("right");
  btnRight.addEventListener("click", () => {
    keyListener(39)
  });

  const btnUp = document.getElementById("up");
  btnUp.addEventListener("click", () => {
    keyListener(38)
  });

  const btnDown = document.getElementById("down");
  btnDown.addEventListener("click", () => {
    keyListener(40)
  });
};