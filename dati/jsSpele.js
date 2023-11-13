// Pamatnes Izveide
var canvas = document.getElementById("pamatne");
var ctx = pamatne.getContext("2d");

// Izveidojam mainīgos ar sākotnējām vērtībām
var defaultSpeed = 3; //solis, par cik izmainīsies nākamās bumbas koordinātas, var uztvert par ātrumu
var dx = defaultSpeed, dy = -defaultSpeed; //sākotnējās ātruma vērtības
var ballRadius = 10;
var x = canvas.width / 2; //sākuma koordinātas
var y = canvas.height - 41 - ballRadius;
var paddleHeight = 15;
var paddleWidth = 200;
var paddleX = (canvas.width - paddleWidth) / 2;
var bumbasKrasa = "#00FFFF";
var taisnsturaPieskare = 1;
var iznicinatieKiegeli = 0;
var dzivibuSkaits = 3;
var sekundes = 0, minutes = 0, stundas = 0;
var red = "#FF0000";
var yellow = "#FFFF00";
var green = "#00FF00";
var punktuSkaits = 0;
var level = 1;

//izveido nejaušu krāsu, ko bumba iegūs, kad atsitīsies no jebkāda objekta
function colorCreate() {
	var colorR = Math.floor(Math.random() * 200 + 57);
	var colorG = Math.floor(Math.random() * 200 + 57);
	var colorB = Math.floor(Math.random() * 200 + 57);
	return ["rgb(",colorR,",",colorG,",",colorB,")"].join("");
} 

//bumbas izveide
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = bumbasKrasa;
  ctx.fill();
  ctx.closePath();
}
//kustīgā objekta izveide
function drawPaddle() {
  ctx.beginPath();
  ctx.roundRect(paddleX, canvas.height - paddleHeight - ballRadius*2, paddleWidth, paddleHeight,5);
  ctx.rect(paddleX, canvas.height - paddleHeight - ballRadius*2, paddleWidth, paddleHeight-5);
  ctx.fillStyle = "rgba(0,255,0,0.75)";
  ctx.fill();
  ctx.closePath();
}

//sarkanās līnijas izveide
function drawRedLine() {
  ctx.beginPath();
  ctx.rect(0,896,1000,900);
  ctx.fillStyle = "rgb(255,0,0)";
  ctx.fill();
  ctx.closePath();
}

//funkcija, kas nodrošina zīmēto objektu izsaukšanu
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawRedLine()
  drawBricks(rBrickColumnCount,rBricks,0,red);
  drawBricks(yBrickColumnCount,yBricks,(rBrickColumnCount*(brickHeight+brickPadding)),yellow);
  drawBricks(gBrickColumnCount,gBricks,((yBrickColumnCount*(brickHeight+brickPadding))+(rBrickColumnCount*(brickHeight+brickPadding))),green);
  collisionDetection(rBrickColumnCount,rBricks,3);
  collisionDetection(yBrickColumnCount,yBricks,2);
  collisionDetection(gBrickColumnCount,gBricks,1);
  winCheck(level1(),level2(),level3());
  document.getElementById("punktuSkaits").innerHTML = punktuSkaits;
  x += dx;
  y += dy;
//nosacījums, kas nodrošina, lai bumba neiet pāri canvas robežām, balstoties uz koordinātām un canvas izmēriem
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
	  bumbasKrasa = colorCreate();
  }
  if(y + dy < ballRadius) {
    dy = -dy;
	  bumbasKrasa = colorCreate();
  }
  // ja bumba pieskaras laukuma apakšējai malai
  if(y + dy > canvas.height - ballRadius-4) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  bumbasKrasa = "red";
  x = canvas.width / 2;
  y = canvas.height - 41 - ballRadius;
  paddleX = (canvas.width - paddleWidth) / 2;
  dy = 0, dx = 0;
  setTimeout(() => {
    dy = -defaultSpeed; dx = defaultSpeed;
  },500);
  dzivibuSkaits--;
  dzivibasBeidzas();
  draw();
  }
  // ja bumba piskaras kustīgajam objektam
  if(x < paddleX+paddleWidth && x > paddleX && y + ballRadius > canvas.height - paddleHeight - ballRadius*2-dy && y + ballRadius < canvas.height - ballRadius*2) {

    //bumba maina virzienu atkatīgi no kuras taisnstūra objekta daļas tā atsitas
    var paddleCentre = paddleX+paddleWidth/2;
    //centrs
    if(x < paddleCentre+10 && x > paddleCentre-10){
      dx = 0;dy = -(defaultSpeed*2);
    }

    //no centra līdz vidusdaļai
    else if(x < paddleCentre+15 && x > paddleCentre-15) {
        dy = -(defaultSpeed*1.8);
        if(x < paddleCentre) {
            dx = defaultSpeed*0.2;
            dx = -(defaultSpeed*0.2);
        }else if (x > paddleCentre) {
            dx = -(defaultSpeed*0.2);
            dx = defaultSpeed*0.2;
        }
      }
      else if (x < paddleCentre + 20 && x > paddleCentre - 20) {
        dy = -(defaultSpeed * 1.6);
        if (x < paddleCentre) {
            dx = defaultSpeed * 0.4;
            dx = -(defaultSpeed * 0.4);
        } else if (x > paddleCentre) {
            dx = -(defaultSpeed * 0.4);
            dx = defaultSpeed * 0.4;
          }
      }
      else if (x < paddleCentre + 25 && x > paddleCentre - 25) {
        dy = -(defaultSpeed * 1.4);
        if (x < paddleCentre) {
            dx = defaultSpeed * 0.6;
            dx = -(defaultSpeed * 0.6);
        } else if (x > paddleCentre) {
            dx = -(defaultSpeed * 0.6);
            dx = defaultSpeed * 0.6;
        }
      }
      else if (x < paddleCentre + 30 && x > paddleCentre - 30) {
        dy = -(defaultSpeed * 1.2);
        if (x < paddleCentre) {
            dx = defaultSpeed * 0.8;
            dx = -(defaultSpeed * 0.8);
        } else if (x > paddleCentre) {
            dx = -(defaultSpeed * 0.8);
            dx = defaultSpeed * 0.8;
        }
      }

      //vidusdaļa
      else if (x < paddleCentre + 60 && x > paddleCentre - 60) {
        dy = -defaultSpeed;
        if (x < paddleCentre) {
            dx = defaultSpeed;
            dx = -(defaultSpeed);
        } else if (x > paddleCentre) {
            dx = -(defaultSpeed);
            dx = defaultSpeed;
        }
      }

      //malas
      else if (x < paddleCentre + 70 && x > paddleCentre - 70) {
        dy = -(defaultSpeed * 0.8);
        if (x < paddleCentre) {
            dx = defaultSpeed * 1.2;
            dx = -(defaultSpeed * 1.2);
        } else if (x > paddleCentre) {
            dx = -(defaultSpeed * 1.2);
            dx = defaultSpeed * 1.2;
        }
      }
      else if (x < paddleCentre + 80 && x > paddleCentre - 80) {
        dy = -(defaultSpeed * 0.6);
        if (x < paddleCentre) {
            dx = defaultSpeed * 1.4;
            dx = -(defaultSpeed * 1.4);
        } else if (x > paddleCentre) {
            dx = -(defaultSpeed * 1.4);
            dx = defaultSpeed * 1.4;
        }
      }
      else if (x < paddleCentre + 90 && x > paddleCentre - 90) {
        dy = -(defaultSpeed * 0.4);
        if (x < paddleCentre) {
            dx = defaultSpeed * 1.6;
            dx = -(defaultSpeed * 1.6);
      } else if (x > paddleCentre) {
            dx = -(defaultSpeed * 1.6);
            dx = defaultSpeed * 1.6;
        }
      }

    else if(x <= paddleCentre+100 && x >= paddleCentre-100){
        dy = -(defaultSpeed*0.2);
        if (x < paddleCentre) {
            dx = defaultSpeed * 1.8;
            dx = -(defaultSpeed * 1.8);
      } else if (x > paddleCentre) {
            dx = -(defaultSpeed * 1.8);
            dx = defaultSpeed * 1.8;
      }
    }
    
    else {console.log("error: nereģistrē, kurai taisnstūra objekta daļai pieskaras bumba");dy = -dy;}
    bumbasKrasa = colorCreate();
    taisnsturaPieskare += 1;
    document.getElementById("pieskareTaisnsturaObjektam").innerHTML = "Pieskare Taisnstūra Objektam: " + taisnsturaPieskare;
  }
}
//cikls, kurš tiek atkārtots katras 10ms, nodrošina objektu (un bumbas) pārzīmēšanu
	const drawInterval = setInterval(draw, 10);

// EventListener funkcija, kas reaģē uz taustiņu nospiešanu
var down = false;
document.addEventListener("keydown", event => {
  if (event.keyCode === 37 && paddleX > 0) { // Kreisā bultiņa un malas robeža
    if(down)return;
    down = true;

    key37press = setInterval(() => {if (paddleX < 0+10){return}else{paddleX -= 7}}, 10);// Pārvietojam pa kreisi
  }
  if (event.keyCode === 39 && paddleX < canvas.width - paddleWidth) { // Labā bultiņa un malas robeža
    if(down)return;
    down = true;

    key39press = setInterval(() => {if (paddleX > canvas.width - paddleWidth-10){return}else{paddleX += 7}}, 10); // Pārvietojam pa labi
  }
});

document.addEventListener("keyup", (event) => {
	if (event.keyCode === 37) { // Kreisā bultiņa un malas robeža
    clearInterval(key37press);
    down = false;
	}
	if (event.keyCode === 39) { // Labā bultiņa un malas robeža
		clearInterval(key39press);
    down = false;
	}
  });

// Dzīvības
function dzivibasBeidzas() {
  if(!dzivibuSkaits) {
    clearInterval(drawInterval);
    clearInterval(timeInterval);
    document.getElementById("statuss").innerHTML = "<del>///////</del> <strong>SPĒLES BEIGAS</strong> <del>///////</del>";
    document.getElementById("statuss").classList = "dark_red";
    document.getElementById("laiks").classList = "dark_red";
    document.getElementById("punktuSkaits").classList = "dark_green";
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "96pt Minecraftia";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("Game Over.", canvas.width/2, canvas.height/2);
      ctx.font = "32px Consolas";
      ctx.fillText("Tu zaudēji visas savas dzīvības un spēle beidzās.", canvas.width/2, canvas.height/2+128);
      ctx.fillText("Atsvaidzini lapu, ja vēlies mēģināt vēlreiz!", canvas.width/2, canvas.height/2+168);
    }, 100);
  }
  switch(dzivibuSkaits) {
    case 0: document.getElementById("dziviba1").src = "heartEmpty.png";
    case 1: document.getElementById("dziviba2").src = "heartEmpty.png";
    case 2: document.getElementById("dziviba3").src = "heartEmpty.png";
  }
}

// Skaita spēles laiku
const timeInterval = setInterval(() => {
  if(sekundes >= 59) {minutes++;sekundes = -1;}
  if(minutes >=59) {stundas++;sekundes = -1;}
  sekundes++;
  document.getElementById("laiks").innerHTML = [stundas,":",minutes,":",sekundes].join("");
}, 1000);

// Līmeņi

// Sākotnējie mainīgie priekš ķieģeļiem 
// g = Green, y = Yellow, r = Red

var brickRowCount = 11;
var rBrickColumnCount = 1; // priekš 1. līmeņa
var yBrickColumnCount = 1; // ...
var gBrickColumnCount = 2; // ...
var brickWidth = 85;
var brickHeight = 35;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 8;


var rBricks = [];
    for(var c=0; c<rBrickColumnCount; c++) {
        rBricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            rBricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
var yBricks = [];
for(var c=0; c<yBrickColumnCount; c++) {
    yBricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        yBricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
var gBricks = [];
    for(var c=0; c<gBrickColumnCount; c++) {
        gBricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            gBricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }    


function drawBricks(brickColumnCount,bricks,columnOffset,color) {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop+columnOffset;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection(brickColumnCount,bricks,iegutaisPunktuSkaits) {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          iznicinatieKiegeli += 1
          document.getElementById("iznicinatoKiegeluSkaits").innerHTML = "Iznīcinātie Ķieģeļi: " + iznicinatieKiegeli;
          return(punktuSkaits += iegutaisPunktuSkaits);
        }
      }
    }
  }
}

var repeatLevel1 = true, repeatLevel2 = true, repeatLevel3 = true;
function winCheck(level1punktuSkaits,level2punktuSkaits,level3punktuSkaits) {

  if (punktuSkaits === level1punktuSkaits && repeatLevel1) { 
    repeatLevel1 = false;
    level++;
    document.getElementById('limenis').innerHTML = level + ". Līmenis";
    x = canvas.width / 2; //sākuma koordinātas
    y = canvas.height - 41 - ballRadius;
    paddleX = (canvas.width - paddleWidth) / 2;
    rBrickColumnCount = 1;
    yBrickColumnCount = 4;
    gBrickColumnCount = 1;
    defaultSpeed += 1;
    dzivibuSkaits = 3;
    dy = 0, dx = 0;
    setTimeout(() => {
      dy = -defaultSpeed; dx = -defaultSpeed;
    },2000);
    console.log('progress to level 2');

    rBricks = [];
    for(var c=0; c<rBrickColumnCount; c++) {
      rBricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
        rBricks[c][r] = { x: 0, y: 0, status: 1 };
    }}
    yBricks = []; 
    for(var c=0; c<yBrickColumnCount; c++) {  
      yBricks[c] = [];  
      for(var r=0; r<brickRowCount; r++) {  
        yBricks[c][r] = { x: 0, y: 0, status: 1 };  
    }} 
    gBricks = []; 
      for(var c=0; c<gBrickColumnCount; c++) {  
        gBricks[c] = [];  
        for(var r=0; r<brickRowCount; r++) {  
          gBricks[c][r] = { x: 0, y: 0, status: 1 };  
    }}   

  }
  if (punktuSkaits === level2punktuSkaits && repeatLevel2) {
    repeatLevel2 = false;
    level++;
    dy = 0, dx = 0;
    setTimeout(() => {
      dy = -defaultSpeed; dx = defaultSpeed;
    },2000);
    x = canvas.width / 2; //sākuma koordinātas
    y = canvas.height - 41 - ballRadius;
    paddleX = (canvas.width - paddleWidth) / 2;
    rBrickColumnCount = 4;
    yBrickColumnCount = 2;
    gBrickColumnCount = 0;
    defaultSpeed += 1;
    dzivibuSkaits = 3;
    console.log('progress to level 3');
    document.getElementById('limenis').innerHTML = level + ". Līmenis";

    rBricks = [];
    for(var c=0; c<rBrickColumnCount; c++) {
      rBricks[c] = [];
      for(var r=0; r<brickRowCount; r++) {
        rBricks[c][r] = { x: 0, y: 0, status: 1 };
    }}
    yBricks = []; 
    for(var c=0; c<yBrickColumnCount; c++) {  
      yBricks[c] = [];  
      for(var r=0; r<brickRowCount; r++) {  
        yBricks[c][r] = { x: 0, y: 0, status: 1 };  
    }} 
    gBricks = []; 
      for(var c=0; c<gBrickColumnCount; c++) {  
        gBricks[c] = [];  
        for(var r=0; r<brickRowCount; r++) {  
          gBricks[c][r] = { x: 0, y: 0, status: 1 };  
    }}   

  } else if (punktuSkaits === level3punktuSkaits && repeatLevel3) {
    repeatLevel3 = false;
    clearInterval(timeInterval);
    clearInterval(drawInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "96pt Minecraftia";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("WINNER", canvas.width/2, canvas.height/2);
    ctx.font = "24pt Consolas";
    ctx.fillStyle = "white";
    ctx.fillText("Tu ieguvi visus iespējamos punktus un uzvarēji spēli!", canvas.width/2, canvas.height/2+64);
    ctx.font = "30pt Consolas";
    ctx.fillText("Tu spēli pabeidzi šādā laikā:", canvas.width/2, canvas.height/2+128);
    ctx.fillStyle = "yellow";
    ctx.font = "72pt Minecraftia";
    ctx.fillText([stundas,":",minutes,":",sekundes].join(""), canvas.width/2, canvas.height/2+256);
    
    document.getElementById("statuss").innerHTML = "///////////<strong>UZVARA</strong>///////////";
    document.getElementById("statuss").classList = "yellow";
    document.getElementById("laiks").classList = "yellow";
    document.getElementById("punktuSkaits").classList = "dark_green";
  }

}
function level1() {
  let rBrickColumnCount = 1;
  let yBrickColumnCount = 1;
  let gBrickColumnCount = 2;
  return((rBrickColumnCount*brickRowCount)*3+(yBrickColumnCount*brickRowCount)*2+(gBrickColumnCount*brickRowCount));
}

function level2() {
  let rBrickColumnCount = 1;
  let yBrickColumnCount = 4;
  let gBrickColumnCount = 1;
  return((rBrickColumnCount*brickRowCount)*3+(yBrickColumnCount*brickRowCount)*2+(gBrickColumnCount*brickRowCount)+level1());
}

function level3() {
  let rBrickColumnCount = 4;
  let yBrickColumnCount = 2;
  let gBrickColumnCount = 0;
  return((rBrickColumnCount*brickRowCount)*3+(yBrickColumnCount*brickRowCount)*2+(gBrickColumnCount*brickRowCount)+level2());
}