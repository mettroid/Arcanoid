class Paddle {
    pressedLeft = false;
    pressedRight = false;
    curveX;
    curveY;
    name = 'paddle';
    constructor(x, y, w, h, r, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.curveY = y;
        this.color = color;
    }
    draw(canvas){
        this.curveX = Math.floor(this.x + this.r + (this.w / 2));
        this.changeDirection(canvas);
        canvas.ctx.save();
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.moveTo(this.x + this.r, this.y);
        canvas.ctx.quadraticCurveTo(this.curveX, this.curveY, this.x + this.w - this.r, this.y);
        canvas.ctx.arcTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r, this.r);
        canvas.ctx.arcTo(this.x + this.w, this.y + this.h, this.x + this.w - this.r, this.y + this.h, this.r);
        canvas.ctx.arcTo(this.x, this.y + this.h, this.x, this.y + this.r, this.r);
        canvas.ctx.arcTo(this.x, this.y, this.x + this.r, this.y, this.r);
        canvas.ctx.closePath();
        
        canvas.ctx.fill();
        canvas.ctx.stroke();
        canvas.ctx.restore();
    }
    changeDirection(canvas){
        if(this.pressedRight && this.x + this.w < canvas.elem.width){
            this.x += 2;
        }
        if(this.pressedLeft && this.x > 0){
            this.x -= 2;
        }
    }
}
export {Paddle}