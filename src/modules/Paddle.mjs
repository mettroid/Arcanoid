class Paddle {
    pressedLeft = false;
    pressedRight = false;
    curveX;
    curveY;
    name = 'paddle';
    vx = 200;
    defaultSet = {};
    constructor(x , y, w, h, r, color){
        this.defaultSet.x = x;
        this.defaultSet.y = y;
        this.defaultSet.w = w;
        this.defaultSet.h = h;
        this.defaultSet.r = r;
        this.defaultSet.color = color;
         
        this.setInitValues(this.defaultSet);
    }
    setInitValues({ x, y, w, h, r, color}){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.curveY = y;
        this.color = color;
    }
    draw(canvas, correction){
        
        this.changeDirection(canvas, correction);
        this.curveX = this.x + (this.w / 2);
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

        canvas.ctx.beginPath();
        canvas.ctx.strokeStyle = "lime";
        canvas.ctx.moveTo(this.curveX, this.curveY);
        canvas.ctx.lineTo(this.curveX, this.curveY + 30);
        canvas.ctx.stroke();
        canvas.ctx.closePath();
    }
    changeDirection(canvas, correction){
        if(this.pressedRight && this.x + this.w < canvas.elem.width){
            this.x += this.vx * correction;
        }
        if(this.pressedLeft && this.x > 0){
            this.x -= this.vx * correction;
        }
    }
}
export {Paddle}