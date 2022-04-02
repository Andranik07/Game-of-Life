let LivingCreature = require('./LivingCreature');

module.exports = class Bomb extends LivingCreature {
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }


    move() {
        this.getNewCoordinates()
        var found = this.chooseCell(1);
		var newCell = found[Math.floor(Math.random() * found.length)]
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            matrix[this.y][this.x] = 1;

            this.x = newX;
            this.y = newY;
        }
    
    }


    explode() {
        this.getNewCoordinates()
        var found = this.chooseCell(3);
        var newCell = found[Math.floor(Math.random() * found.length)]
          if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        for (let i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;

    }

}   