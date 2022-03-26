// var matrix = [];

// var side = 20;
// var grassArr = [];
// var grassEaterArr = [];
// var predatorArr = [];
// var bombArr = [];
// var peopleArr = [];


// function generator(){
//     for (y = 0; y<8; y++){
//             matrix.push([]);
//         for(x=0 ; x<8 ;x++){
//             matrix[y].push(Math.round(Math.random() * 3 ));
//         }
//     }
//  console.log(matrix);

// }

// function generator(matrixSize, GrassCount, GrassEaterCount, PredatorCount, BombCount, PeopleCount) {
//     for (let i = 0; i < matrixSize; i++) {
//         matrix.push([])
//         for (let j = 0; j < matrixSize; j++) {
//             matrix[i].push(0)

//         }

//     }
//     for (let i = 0; i < GrassCount; i++) {
//         matrix.push([])
//         const x = Math.round(Math.random() * (matrixSize - 1))
//         const y = Math.round(Math.random() * (matrixSize - 1))
//         matrix[y][x] = 1
//         grassArr.push(new Grass(x, y))
//     }
//     for (let i = 0; i < GrassEaterCount; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1))
//         const y = Math.round(Math.random() * (matrixSize - 1))
//         matrix[y][x] = 2
//         new GrassEater(x, y)
//         grassEaterArr.push(new GrassEater(x, y))
//     }
//     for (let i = 0; i < PredatorCount; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1))
//         const y = Math.round(Math.random() * (matrixSize - 1))
//         matrix[y][x] = 3
//         new Predator(x, y)
//         predatorArr.push(new Predator(x, y))
//     }
//     for (let i = 0; i < BombCount; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1))
//         const y = Math.round(Math.random() * (matrixSize - 1))
//         matrix[y][x] = 4
//         new Bomb(x, y)
//         bombArr.push(new Bomb(x, y))
//     }
//     for (let i = 0; i < PeopleCount; i++) {
//         const x = Math.round(Math.random() * (matrixSize - 1))
//         const y = Math.round(Math.random() * (matrixSize - 1))
//         matrix[y][x] = 5
//         new People(x, y)
//         peopleArr.push(new People(x, y))
//     }
// }

var socket = io()

var side = 20;


function setup() {
    frameRate(8);
    socket.on("generator", generator);
    createCanvas(side * matrix[0].length, side * matrix[0].length);
    background('#acacac');
    // for (let y = 0; y < matrix.length; y++) {
    //     for (let x = 0; x < matrix.length; x++) {
    //         if (matrix[y][x] == 1) {
    //             grassArr.push(new Grass(x, y))
    //         }
    //         else if (matrix[y][x] == 2) {
    //             grassEaterArr.push(new GrassEater(x, y));
    //         }
    //         else if (matrix[y][x] == 3){
    //             predatorArr.push(new Predator(x,y))
    //         }
    //         else if (matrix[y][x] == 4){
    //             bombArr.push(new Bomb(x,y))
    //         }
    //         else if (matrix[y][x] == 5){
    //             peopleArr.push(new People(x,y))
    //         }

    //     }

    // }
}

function Nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                fill("#00ff00");
            }
            else if (matrix[y][x] == 2) {
                fill("#FFFF00")
            }
            else if (matrix[y][x] == 3) {
                fill("#FF0000")
            }
            else if (matrix[y][x] == 4) {
                fill("#000000")
            }
            else if (matrix[y][x] == 5) {
                fill("#000080")
            }

            rect(x * side, y * side, side, side);
        }
    }   
}

socket.on('send matrix', Nkarel)
 


function addGrass() {
    socket.emit("add Grass")
}
function addGrassEater() {
    socket.emit("add GrassEater")
}
function addPredator() {
    socket.emit("add Predator")
}
function addBomb(){
    socket.emit("add Bomb")
}
function addPeople(){
    socket.emit("add People")
}