var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var bombArr = [];
var peopleArr = [];

var side = 20;

var matrix = [];

let Grass = require('./grass');
let GrassEater = require('./grassEater');
let Bomb = require('./bomb');
let Predator = require('./predator');
let People = require('./people');
const { send } = require("process");

function generator(matrixSize, GrassCount, GrassEaterCount, PredatorCount, BombCount, PeopleCount) {
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }

    }
    for (let i = 0; i < GrassCount; i++) {
        matrix.push([])
        const x = Math.round(Math.random() * (matrixSize - 1))
        const y = Math.round(Math.random() * (matrixSize - 1))
        matrix[y][x] = 1
        grassArr.push(new Grass(x, y))
    }
    for (let i = 0; i < GrassEaterCount; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1))
        const y = Math.round(Math.random() * (matrixSize - 1))
        matrix[y][x] = 2
        new GrassEater(x, y)
        grassEaterArr.push(new GrassEater(x, y))
    }
    for (let i = 0; i < PredatorCount; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1))
        const y = Math.round(Math.random() * (matrixSize - 1))
        matrix[y][x] = 3
        new Predator(x, y)
        predatorArr.push(new Predator(x, y))
    }
    for (let i = 0; i < BombCount; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1))
        const y = Math.round(Math.random() * (matrixSize - 1))
        matrix[y][x] = 4
        new Bomb(x, y)
        bombArr.push(new Bomb(x, y))
    }
    for (let i = 0; i < PeopleCount; i++) {
        const x = Math.round(Math.random() * (matrixSize - 1))
        const y = Math.round(Math.random() * (matrixSize - 1))
        matrix[y][x] = 5
        new People(x, y)
        peopleArr.push(new People(x, y))
    }
    
}


io.sockets.emit("generator", matrixSize, GrassCount, GrassEaterCount, PredatorCount, BombCount, PeopleCount)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1 
                grassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}


function game(){
    for (let g in grassArr) {
        grassArr[g].mul()
    }

    for (let e in grassEaterArr) {
        grassEaterArr[e].eat()
    }

    for (let b in predatorArr) {
        predatorArr[b].eat()
    }

    for (let p in bombArr) {
        bombArr[p].explode()
    }

    for (let p in bombArr) {
        bombArr[p].move()
    }

    for (let p in bombArr) {
        bombArr[p].move()
    }

    for(let u in peopleArr) {
        peopleArr[u].move()
    }
io.sockets.emit("send matrix", matrix);  
}

// io.socket.emit('send matrix', Nkarel)
// io.socket.emit("Mul", mul);
// io.socket.emit("Eat", eat);
// io.socket.emit("Move", move);
// io.socket.emit("Explode", explode);

// setInterval(game, 1000)

function addGrass(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y))
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater(){
    for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                if (matrix[y][x] == 2) {
                    grassEaterArr.push(new GrassEater(x, y));
                }
            }
        }  
        io.sockets.emit("send matrix", matrix); 
}

function addPredator(){
    for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                 if (matrix[y][x] == 3){
                    predatorArr.push(new Predator(x,y))
                }
            }
    }   
    io.sockets.emit("send matrix", matrix); 
}

function addBomb(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
             if (matrix[y][x] == 4){
                bombArr.push(new Bomb(x,y))
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPeople(){
     for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 5){
                peopleArr.push(new People(x,y))
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    createObject(matrix);
    socket.on("add Grass", addGrass);
    socket.on("add GrassEater", addGrassEater);
    socket.on("add Predator", addPredator);
    socket.on("add Bomb", addBomb);
    socket.on("add People", addPeople);
})

// var statistics = {};

// setInterval(function() {
//     statistics.grass = grassArr.length;
//     statistics.grassEater = grassEaterArr.length;
//     fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
//         console.log("send")
//     })
// },1000);