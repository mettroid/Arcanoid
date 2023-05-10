class Paddle {
    pressedLeft = false;
    pressedRight = false;
    curveX;
    curveY;
    name = 'paddle';
    constructor(x, y, w, h, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.curveY = y;
        this.color = color;
    }
    draw(canvas){
        this.curveX = Math.floor(this.x + (this.w / 2));
        this.changeDirection(canvas);
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.moveTo(this.x, this.y);
        canvas.ctx.quadraticCurveTo(this.curveX, this.curveY, this.x + this.w, this.y);
        canvas.ctx.lineTo(this.x + this.w, this.y + this.h);
        canvas.ctx.lineTo(this.x, this.y + this.h);
        canvas.ctx.closePath();
        canvas.ctx.fill();
        canvas.ctx.stroke();
    }
    changeDirection(canvas){
        if(this.pressedRight && this.x + this.w < canvas.width){
            this.x += 2;
        }
        if(this.pressedLeft && this.x > 0){
            this.x -= 2;
        }
    }
}
export {Paddle}