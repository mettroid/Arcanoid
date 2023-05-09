class Ball {
    dx = 0;
    dy = 0;
    start = false;
    constructor(x, y, r, degStart, degEnd, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.degStart = degStart;
        this.degEnd = degEnd;
        this.color = color;
    }
    draw(canvas){
        this.ballRicochet(canvas);
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        canvas.ctx.fill();
        canvas.ctx.closePath();
        
        this.x += this.dx;
        this.y += this.dy;
    }
    ballRicochet(canvas){
        if(this.x + this.r > canvas.elem.width || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if(this.y - this.r < 0 || this.y + this.r > canvas.elem.height){
            this.dy = -this.dy;
        }
    }
}
export {Ball}