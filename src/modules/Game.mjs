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
    game_over(){
        let x = Math.floor(this.canvas.elem.width / 2);
        let y = Math.floor(this.canvas.elem.height / 2);
        this.canvas.ctx.beginPath();
        this.canvas.ctx.fillStyle = 'red';
        this.canvas.ctx.font = '60px comic';
        this.canvas.ctx.textAlign = 'center';
        this.canvas.ctx.fillText('GAME OVER', x, y);
        this.canvas.ctx.closePath();
    }

}
export {Game};