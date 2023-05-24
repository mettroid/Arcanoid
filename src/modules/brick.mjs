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
        console.log(this.color);
    }
    draw(canvas){
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.strokeStyle = 'black';
        canvas.ctx.rect(this.x, this.y, this.w, this.h);
        canvas.ctx.fill();
        canvas.ctx.stroke();
    }
    
}
export {Brick}