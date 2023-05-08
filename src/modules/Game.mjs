class Game {
    lives;
    constructor(canvas, images, fps, phase){
        this.fps = fps;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.score = 0;
        this.collections = images;
        this.phase = phase;
    }
    async screen_saver(btnEasy, btnNormal, btnDifficult, title){
        let imgBitMap = await createImageBitmap(this.collections[0], 0, 0, 80, 85); //background
        const pattern = this.ctx.createPattern(imgBitMap, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

        title.draw();
        btnEasy.draw();
        btnNormal.draw();
        btnDifficult.draw();
    }   
    setLives(lives){
        this.lives = lives;
    }
    game_over(canvas){

    }

}
export {Game};