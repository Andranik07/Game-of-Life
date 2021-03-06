let LivingCreature = require("./LivingCreature");

module.exports = class Predator extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 15;
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }

  mul() {
    var found = this.chooseCell(0);
    var newCell = found[Math.floor(Math.random() * found.length)]

    if (newCell && this.energy >= 12) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 3;
      predatorArr.push(new Predator(newX, newY));
      this.energy = 5;
    }
    
  }

  move() {
    this.getNewCoordinates();
    var found = this.chooseCell(0);
    var newCell = found[Math.floor(Math.random() * found.length)]

    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 2;

      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;
    }
    this.energy--;
    if (this.energy <= 0) {
      this.die();
    }
   
  }

  eat() {
    var found = this.chooseCell(2);
    var newCell = found[Math.floor(Math.random() * found.length)]


    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 2;

      matrix[this.y][this.x] = 0;


      for (var i in grassArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
          
        }
      }
      this.x = newX;
      this.y = newY;
      this.energy++;

      if (this.energy >= 12) {
        this.mul();
      } else {
        this.move();
      }
    }
    
  }

  die() {
    matrix[this.y][this.x] = 0;
    for (let i in predatorArr) {
      if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
        predatorArr.splice(i, 1);
        
      }
    }
  }
};
