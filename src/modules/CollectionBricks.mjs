class CollectionBricks {
    #w = 50;
    #h = 30;
    #marginL = 5;
    #marginT = 5;
    #offsetL = 10;
    #offsetT = 10;
    #collection;
    #brickRowCount = 3;
    #brickColumnCount = 5;
    constructor(){ 
        this.#collection = [];
    }
    fill(Brick){
         for(let i = 0; i < this.#brickColumnCount; i++){
            this.#collection[i] = [];
            for(let j = 0; j < this.#brickRowCount; j++){
                let x = Math.floor(this.#offsetL + (this.#marginL * i + this.#w * i));
                let y = Math.floor(this.#offsetT + (this.#marginT * j + this.#h * j));
                let brick = new Brick(x, y, this.#w, this.#h, true, 2, 'purple');
                this.#collection[i].push(brick);
            }
         }   
         console.log(this.#collection);
    }
    draw(canvas){
        for(let i = 0; i <  this.#brickColumnCount; i++){
            for(let j = 0; j < this.#brickRowCount; j++){
               let brick = this.#collection[i][j];
               //console.log(brick);
               if(brick.visible && brick.lives > 0){
                  brick.draw(canvas);
               }
            }
        }
    }
}
export {CollectionBricks}