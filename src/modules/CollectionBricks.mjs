class CollectionBricks {
    #w = 80;
    #h = 30;
    #marginL = 40;
    #marginT = 40;
    #offsetL = 100;
    #offsetT = 130;
    #collection;
    brickRowCount = 3;
    brickColumnCount = 4;
    countDestroyedBricks = 0;
    properties = [
        { lives: 3, scores: 30, thing: "apple", color: "red" },
        { lives: 2, scores: 20, thing: "orange", color: "green" },
        { lives: 1, scores: 10, thing: "lemon", color: "yellow" }
    ];
    constructor(){
        this.#collection = [];
    }
    fill(Brick){
        let x, y, brick;
         for(let i = 0; i < this.brickColumnCount; i++){
            this.#collection[i] = [];
            for(let j = 0; j < this.brickRowCount; j++){
                x = Math.floor(this.#offsetL + (this.#marginL * i + this.#w * i));
                y = Math.floor(this.#offsetT + (this.#marginT * j + this.#h * j));
                brick = new Brick(x, y, this.#w, this.#h, this.properties[j]);
                this.#collection[i].push(brick);
            }
         }   
         console.log(this.#collection);
    }
    draw(canvas){
        let brick;
        for(let i = 0; i <  this.brickColumnCount; i++){
            for(let j = 0; j < this.brickRowCount; j++){
               brick = this.#collection[i][j];
               if(brick.lives > 0){
                  brick.drawBrick(canvas);
                  if(brick.damaged){
                    brick.drawCrack(canvas);
                  }
               }
            }
        }
    }
    getColl(){
        return this.#collection;
    }
    isAllBroken(){
        return this.brickRowCount * this.brickColumnCount === this.countDestroyedBricks;
    }
}
export {CollectionBricks}