var express = require("express");
var app = express();
var server = require("http").Server(app); //CreateServer
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("index.html");
});
server.listen(3000);

grassArr = [];
grassEaterArr = [];
predatorArr = [];
bombArr = [];
peopleArr = [];

var n = 50;
weather = "summer"

matrix = [];

let Grass = require("./grass");
let GrassEater = require("./grassEater");
let Bomb = require("./bomb");
let Predator = require("./predator");
let People = require("./people");

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
  matrix[i] = [];
  for (let j = 0; j < n; j++) {
    matrix[i][j] = Math.floor(rand(0, 6));
  }
}

io.sockets.emit("send matrix", matrix);

function createObject() {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        grassArr.push(new Grass(x, y));
      } else if (matrix[y][x] == 2) {
        grassEaterArr.push(new GrassEater(x, y));
      } else if (matrix[y][x] == 3) {
        predatorArr.push(new Predator(x, y));
      } else if (matrix[y][x] == 4) {
        bombArr.push(new Bomb(x, y));
      } else if (matrix[y][x] == 5) {
        peopleArr.push(new People(x, y));
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function game() {
  for (let g in grassArr) {
    grassArr[g].mul();
  }

  for (let e in grassEaterArr) {
    grassEaterArr[e].eat();
  }

  for (let b in predatorArr) {
    predatorArr[b].eat();
  }

  for (let p in bombArr) {
    bombArr[p].explode();
    bombArr[p].move();
    bombArr[p].move();
  }

    for (let u in peopleArr) {
      peopleArr[u].move();
    }
    io.sockets.emit("send matrix", matrix);
  }

  setInterval(game, 1000);

  function addGrass() {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        if (matrix[y][x] == 1) {
          grassArr.push(new Grass(x, y));
        }
      }
    }
    io.sockets.emit("send matrix", matrix);
  }

  function addGrassEater() {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        if (matrix[y][x] == 2) {
          grassEaterArr.push(new GrassEater(x, y));
        }
      }
    }
    io.sockets.emit("send matrix", matrix);
  }

  function addPredator() {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        if (matrix[y][x] == 3) {
          predatorArr.push(new Predator(x, y));
        }
      }
    }
    io.sockets.emit("send matrix", matrix);
  }

  function addBomb() {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        if (matrix[y][x] == 4) {
          bombArr.push(new Bomb(x, y));
        }
      }
    }
    io.sockets.emit("send matrix", matrix);
  }

  function addpeop() {
    
    for (let i = 0; i < 8; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)  
        if (matrix[y][x] == 0) {
          matrix[y][x] = 5
          peopleArr.push(new People(x, y, 5));
  
      }
    }
    io.sockets.emit("send matrix", matrix);
  };

  function addgr(){
      for (let i = 0; i < 8; i++) {
      var x = Math.floor(Math.random() * matrix[0].length)
      var y = Math.floor(Math.random() * matrix.length)  
          if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            peopleArr.push(new People(x, y, 1));
    
        }
      }
      io.sockets.emit("send matrix", matrix);
    };

function addgreater(){
  for (let i = 0; i < 8; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)  
        if (matrix[y][x] == 0) {
          matrix[y][x] = 2
          peopleArr.push(new People(x, y, 2));
  
      }
    }
    io.sockets.emit("send matrix", matrix);
}

function addpred(){
  for (let i = 0; i < 8; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)  
        if (matrix[y][x] == 0) {
          matrix[y][x] = 3
          peopleArr.push(new People(x, y, 3));
  
      }
    }
    io.sockets.emit("send matrix", matrix);
}


// function weath(weather){
//   if(weather == "summer"){
//     weather = "autumn"
//   }else if(weather == "autumn"){
//     weather = "winter"
//   }else if(weather == "winter"){
//     weather = "spring"
//   }
//   else if(weather == "spring"){
//     weather = "summer"
//   }
//   io.sockets.emit('send matrix', matrix)
// }
// io.sockets.emit("weather", weather)
// setInterval(weath, 5000);

  io.on("connection", function (socket) {
    createObject();
    socket.on("add Grass", addGrass);
    socket.on("add GrassEater", addGrassEater);
    socket.on("add Predator", addPredator);
    socket.on("add Bomb", addBomb);
    socket.on("add People", addpeop);
    socket.on("add Grass-Button", addgr);
    socket.on("add GrassEater-Button" , addgreater);
    socket.on("add Predator-Button" , addpred);
  });

  var statistics = {};

  setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Bomb = bombArr.length;
    statistics.People = peopleArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
      console.log("send");
    });
  }, 1000);