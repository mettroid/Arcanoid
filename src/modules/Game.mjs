class Game {
    lives;
    paths = {};
    fps;
    constructor(canvas, images, fps){
        this.fps = fps;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.score = 0;
        this.collections = images;
    }
    async screen_saver(btnEasy, btnNormal, btnDifficult, title){
        let back = await createImageBitmap(this.collections[0], 0, 0, 80, 85); //background
        const pattern = this.ctx.createPattern(back, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

        title.draw();
        btnEasy.draw();
        btnNormal.draw();
        btnDifficult.draw();

    }   
    game_over(canvas){

    }

}
export {Game};