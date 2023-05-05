class Game {
    constructor(lives, ctx){
        this.ctx = ctx;
        this.lives = lives;
        this.score = 0;
    }
    screen_saver(img){
        this.ctx.drawImage(img, -1, -1);
    }   
    game_over(canvas){

    }
}
export {Game};