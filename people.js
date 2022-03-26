let LivingCreature = require('./LivingCreature');

module.exports = class People extends LivingCreature {
    constructor(x,y){
        super(x,y)
        this.energy = 10;
        this.directions = [];
        const people = document.getElementById("button")
        people.addEventListener('click', ()=>{
            this.add()
        })
    }
    
        getNewCoordinates(){
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x    , this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y    ],
                [this.x + 1, this.y    ],
                [this.x - 1, this.y + 1],
                [this.x    , this.y + 1],
                [this.x + 1, this.y + 1]
            ];
        }

        add(){
            var found = this.chooseCell(0);
            var newCell = random(found);
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            peopleArr.push(new People(newX, newY));
        }

        mul() 
        {
            var found = this.chooseCell(0);
            var newCell = random(found);
            if (newCell && this.energy >= 12) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;
                peopleArr.push(new People(newX , newY));
                this.energy = 5;
            }
            console.log('mul');
            
        }

        move()
        {
            this.getNewCoordinates()
            var found = this.chooseCell(0);
            var newCell = random(found); 
            if (newCell){
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;

                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
            }
            this.energy--;
            if (this.energy < 0) 
            {
                this.die();
            }
            console.log('move');
            
        }
        
        eat(){

            var found = this.chooseCell(4);
            var newCell = random(found);

            if(newCell){
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;

                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.energy++;

                for(var i in grassArr){
                    if(newX== grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i , 1);
                        break
                    }
                }
                
                if(this.energy >= 15){
                    this.mul();
                }
                else{
                    this.move();
                }
            }   
            console.log('eat');          
        }

        die() 
        {
            for (let i in peopleArr){
                if (this.x == peopleArr[i].x && this.y == peopleArr[i].y){
                    peopleArr.splice(i , 1);
                    break;
                }
            }
            matrix[this.y][this.x] = 0;
            
        }
    }   