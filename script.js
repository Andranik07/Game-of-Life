var socket = io();

var side = 20;


function setup() {
  createCanvas(side * 50, side * 50);
  background("#acacac");
}

function Nkarel(matrix) {  // exanaki hamar petqe (matrix , weather)
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      var obj = matrix[y][x];
      if (obj == 0) {
        fill("#acacac");
      } 
      else if (obj == 1) {
        // if(weather == "spring")
        // {
        //     fill("green");
        //     console.log("Spring");
        // }
        // else if(weather == "summer")
        // {
        //     fill("#B8FF33");
        //     console.log("Summer");
        // }
        // else if(weather == "winter")
        // {
        //     fill("white");
        //     console.log("Winter");
        // }
        // else if(weather == "autumn")
        // {
        //     fill("#ECC04B");
        //     console.log("Autumn");
        // }
        fill('#00ff00');

      } else if (obj == 2) {
        fill("#FFFF00");
      } else if (obj == 3) {
        fill("#FF0000");
      } else if (obj == 4) {
        fill("#000000");
      } else if (obj == 5) {
        fill("#000080");
      }

      rect(x * side, y * side, side, side);
    }
  }
}

// socket.on("weather", Nkarel)
socket.on("send matrix", Nkarel);

function addGrass() {
  socket.emit("add Grass");
}
function addGrassEater() {
  socket.emit("add GrassEater");
}
function addPredator() {
  socket.emit("add Predator");
}
function addBomb() {
  socket.emit("add Bomb");
}
function addpeop() {
  socket.emit("add People");
}
function addgr(){
  socket.emit("add Grass-Button")
}
function addgreater(){
  socket.emit("add GrassEater-Button")
}
function addpred(){
  socket.emit("add Predator-Button")
}