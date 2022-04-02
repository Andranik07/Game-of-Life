let LivingCreature = require("./LivingCreature");

module.exports = class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 10;
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
    var newCell = Math.floor(Math.random() * found);
    if (newCell && this.energy >= 10) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 2;
      grassEaterArr.push(new GrassEater(newX, newY));
      this.energy = 5;
    }
    console.log("mul");
  }

  move() {
    this.getNewCoordinates();
    var found = this.chooseCell(0);
    var newCell = found[Math.floor(Math.random() * found.length)]

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY
		}

		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}
    console.log("move");
  }

  eat() {
    var found = this.chooseCell(1);
    var newCell = found[Math.floor(Math.random() * found.length)]

    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 2;

      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;
      this.energy++;

      for (var i in grassArr) {
        if (newX == grassArr[i].x && newY == grassArr[i].y) {
          grassArr.splice(i, 1);
          break;
        }
      }

      if (this.energy >= 10) {
        this.mul();
      } else {
        this.move();
      }
    }
    
  }

  die() {
    for (let i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
        break;
      }
    }
    matrix[this.y][this.x] = 0;
  }
};
