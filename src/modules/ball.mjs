class Ball {
    constructor(x, y, r, degStart, degEnd, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.degStart = degStart;
        this.degEnd = degEnd;
        this.color = color;
    }
    draw(canvas){
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        canvas.ctx.fill();
        canvas.ctx.closePath();
        
    }
}
export {Ball}