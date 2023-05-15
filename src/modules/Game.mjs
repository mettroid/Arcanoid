class Game {
    lives;
    constructor(canvasBottom, canvasTop, images, fps, phase){
        this.fps = fps;
        this.canvasBottom = canvasBottom;
        this.canvasTop = canvasTop;
        this.score = 0;
        this.collections = images;
        this.phase = phase;
    }
    async screen_saver(btnEasy, btnNormal, btnDifficult, title){
        let imgBitMap = await createImageBitmap(this.collections[0], 0, 0, 80, 85); //background
        const pattern = this.canvasBottom.ctx.createPattern(imgBitMap, 'repeat');
        this.canvasBottom.ctx.fillStyle = pattern;
        this.canvasBottom.ctx.fillRect(0,0,this.canvasBottom.elem.width,this.canvasBottom.elem.height);

        title.draw();
        btnEasy.draw();
        btnNormal.draw();
        btnDifficult.draw();
    }   
    setLives(lives){
        this.lives = lives;
    }
    drawTopMenu(){
         
         this.canvasTop.ctx.fillStyle = 'rgb(14, 4, 153)';
         this.canvasTop.ctx.rect(0, 0, this.canvasTop.elem.width, this.canvasTop.elem.height);
         this.canvasTop.ctx.fill();
         this.canvasTop.ctx.stroke();

         this.canvasTop.ctx.fillStyle = 'rgb(239, 6, 247)';
         this.canvasTop.ctx.font = '30px comic';
         this.canvasTop.ctx.textAlign = 'right'; 
         this.canvasTop.ctx.fillText('Lives :', Math.floor(this.canvasTop.elem.width / 2), 30);
         
         this.canvasTop.ctx.fillStyle = 'rgb(248, 224, 6)';
         this.canvasTop.ctx.fillText('Score :', Math.floor(this.canvasTop.elem.width / 2), 70, 90);
    }
    game_over(){
        let x = Math.floor(this.canvasBottom.elem.width / 2);
        let y = Math.floor(this.canvasBottom.elem.height / 2);
        this.canvasBottom.ctx.beginPath();
        this.canvasBottom.ctx.fillStyle = 'red';
        this.canvasBottom.ctx.font = '60px comic';
        this.canvasBottom.ctx.textAlign = 'center';
        this.canvasBottom.ctx.fillText('GAME OVER', x, y);
        this.canvasBottom.ctx.closePath();
    }

}
export {Game};