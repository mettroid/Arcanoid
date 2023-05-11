class Brick {
    constructor(x, y, w, h, visible, lives, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.visible = visible;
        this.lives = lives;
        this.color = color;
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