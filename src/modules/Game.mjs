class Game {
    lives;
    scores = 0;
    constructor(canvasBasic, images, phase){
        this.canvasBasic = canvasBasic;
        this.score = 0;
        this.collections = images;
        this.phase = phase;
    }
    async screen_saver(btnEasy, btnNormal, btnDifficult, title){
        let imgBitMap = await createImageBitmap(this.collections[0], 0, 0, 80, 85); //background
        const pattern = this.canvasBasic.ctx.createPattern(imgBitMap, 'repeat');
        this.canvasBasic.ctx.fillStyle = pattern;
        this.canvasBasic.ctx.fillRect(0,0,this.canvasBasic.elem.width,this.canvasBasic.elem.height);

        title.draw();
        btnEasy.draw();
        btnNormal.draw();
        btnDifficult.draw();
    }   
    setLives(lives){
        this.lives = lives;
    }
    drawTopMenu(){
         this.canvasBasic.ctx.save();
         this.canvasBasic.ctx.fillStyle = 'rgb(14, 4, 153)';
         this.canvasBasic.ctx.fillRect(0, 0, this.canvasBasic.elem.width, 85);
        
         this.canvasBasic.ctx.fillStyle = 'rgb(239, 6, 247)';
         this.canvasBasic.ctx.font = '30px comic';
         this.canvasBasic.ctx.textAlign = 'center'; 
         this.canvasBasic.ctx.fillText(`Lives : ${this.lives}`, Math.floor(this.canvasBasic.elem.width / 2), 30, 120);
         
         this.canvasBasic.ctx.fillStyle = 'rgb(248, 224, 6)';
         this.canvasBasic.ctx.fillText(`Score : ${this.scores}`, Math.floor(this.canvasBasic.elem.width / 2), 65, 120);
         this.canvasBasic.ctx.restore();
        
    }
    game_over(){
        let x = Math.floor(this.canvasBasic.elem.width / 2);
        let y = Math.floor(this.canvasBasic.elem.height / 2);
        this.canvasBasic.ctx.beginPath();
        this.canvasBasic.ctx.fillStyle = 'red';
        this.canvasBasic.ctx.font = '60px comic';
        this.canvasBasic.ctx.textAlign = 'center';
        this.canvasBasic.ctx.fillText('GAME OVER', x, y);
        this.canvasBasic.ctx.closePath();
    }

}
export {Game};