class Brick {
    constructor(x, y, w, h, {lives, scores, thing, color}){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lives = lives;
        this.scores = scores;
        this.thing = thing;
        this.color = color;
        this.damaged = false;
        console.log(this.color);
    }
    drawBrick(canvas){
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.strokeStyle = 'black';
        canvas.ctx.rect(this.x, this.y, this.w, this.h);
        canvas.ctx.fill();
        canvas.ctx.stroke();
    }
    drawCrack(canvas){
        canvas.ctx.beginPath();
        canvas.ctx.strokeStyle = "white";
        canvas.ctx.lineWidth = 2;
        canvas.ctx.moveTo(this.x + Math.floor(this.w / 2), this.y);
        canvas.ctx.lineTo(this.x + Math.floor(this.w / 2) - 10, this.y + Math.floor(this.h / 2));
        canvas.ctx.lineTo(this.x + Math.floor(this.w / 2), this.y + Math.floor(this.h / 2));
        canvas.ctx.lineTo(this.x + Math.floor(this.w / 2) - 10, this.y + this.h);
        canvas.ctx.stroke();
        canvas.ctx.closePath();
    }
    
}
export {Brick}