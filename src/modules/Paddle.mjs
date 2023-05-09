class Paddle {
    constructor(y, w, h, color, canvasWidth){
        this.x = Math.floor((canvasWidth - w) / 2);
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.middleFigureX = Math.floor(this.x + (w / 2));
    }
    draw(canvas){
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.moveTo(this.x, this.y);
        canvas.ctx.quadraticCurveTo(this.middleFigureX, this.y, this.x + this.w, this.y);
        canvas.ctx.lineTo(this.x + this.w, this.y + this.h);
        canvas.ctx.lineTo(this.x, this.y + this.h);
        canvas.ctx.closePath();
        canvas.ctx.fill();
        canvas.ctx.stroke();
    }
}
export {Paddle}