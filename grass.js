let LivingCreature = require('./LivingCreature');

module.exports = class Grass extends LivingCreature {

    mul() {
        const newCell = random(this.chooseCell(0));

        if (this.multiplay >= 5 && newCell) {
            const newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiplay = 0;
        }
        this.multiplay++;
    }
}

// class GrassEater{
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//         this.energy = 20;
//         this.multiplay = 0;
//         this.directions = [
//             [this.x - 1, this.y - 1],
//             [this.x    , this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x - 1, this.y    ],
//             [this.x + 1, this.y    ],
//             [this.x - 1, this.y + 1],
//             [this.x    , this.y + 1],
//             [this.x + 1, this.y + 1]
//         ];

//         matrix[y][x]==2
//         grassArr.push(this) 
//     }
// }


// start()
// {
//     const GrassEaterCell = random(chooseCell(0))
//     if (GrassEaterCell == 1) {
//         eat()
//     }
//     else if(GrassEaterCell == 0){
//         move()
//     }

// };

// move()
// {
//     const newCell = random(this.chooseCell(0));

//     if (this.multiplay >= 5 && newCell) {
//         const GrassEater = new GrassEater(newCell[0], newCell[1]);
//         grassEaterArr.push(GrassEater);
//         matrix[newCell[1]][newCell[0]] = 1;
//         this.multiplay = 0;
//     }
//     this.multiplay++;

//     if (move()){
//         this.energy == -3;
//     }
// };

// die()
// {
//     if (this.energy == 0) {
//         this.matrix[y][x]==0;
//     }    
// }

// mul()
// {
//     if (this.multiplay >= 5 && newCell) {
//         const newGrassEater = new GrassEater(newCell[0], newCell[1]);
//         grassArr.push(newGrassEater);
//         matrix[newCell[1]][newCell[0]] = 1;
//         this.multiplay = 0;
//     }
//     this.multiplay++;
// }