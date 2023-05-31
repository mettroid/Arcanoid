import { repeat } from "lodash";

class Game {
    lives = 0;
    scores = 0;
    start = false;
    constructor(canvasBasic, images, phase){
        this.canvasBasic = canvasBasic;
        this.score = 0;
        this.collections = images;
        this.phase = phase;
    }
    async screen_saver(btnEasy, btnNormal, btnDifficult, title){
        this.canvasBasic.ctx.save();
        const pattern = this.canvasBasic.ctx.createPattern(this.collections[1], 'repeat');
        this.canvasBasic.ctx.fillStyle = pattern;
        this.canvasBasic.ctx.fillRect(0,0,this.canvasBasic.elem.width,this.canvasBasic.elem.height);
        this.canvasBasic.ctx.restore();

        title.draw();
        btnEasy.draw();
        btnNormal.draw();
        btnDifficult.draw();
    }   
    setLives(lives){
        this.lives = lives;
    }
    increaseLives(lives){
        this.lives += lives;
    }
    decreaseLives(lives){
        this.lives -= lives;
    }
    setScores(scores){
        this.scores += scores;
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
    drawBack(){
        this.canvasBasic.ctx.save();
        const pattern = this.canvasBasic.ctx.createPattern(this.collections[0], 'repeat');
        this.canvasBasic.ctx.fillStyle = pattern;
        this.canvasBasic.ctx.fillRect(0, 70, this.canvasBasic.elem.width, this.canvasBasic.elem.height);
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
    winner(){
        
        this.canvasBasic.ctx.fillStyle = "rgb(10, 218, 233)";
        this.canvasBasic.ctx.fillRect(0, 0, this.canvasBasic.elem.width, this.canvasBasic.elem.height);

        this.canvasBasic.ctx.strokeStyle = "green";
        this.canvasBasic.ctx.font = '50px Arial';
        this.canvasBasic.ctx.textAlign = 'center';
        this.canvasBasic.ctx.strokeText('Вы выиграли!', this.canvasBasic.elem.width / 2, this.canvasBasic.elem.height / 2);

        this.canvasBasic.ctx.strokeStyle = "rgb(250, 9, 230)";
        this.canvasBasic.ctx.font = '40px comic';
        this.canvasBasic.ctx.textAlign = 'center';
        this.canvasBasic.ctx.strokeText(`Счёт: ${this.scores}`, this.canvasBasic.elem.width / 2, this.canvasBasic.elem.height / 2 + 50);

    }

}
export {Game};