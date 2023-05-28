class Button {
    path2D;
    constructor(x, y, w, h, round, c, name, canvas){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.round = round;
        this.c = c;
        this.name = name;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
    }
    draw(){
        this.ctx.save();
        let x = Math.floor(this.canvas.elem.width / 2);

        this.ctx.strokeRect = 'black';
        this.ctx.lineWidth = 2;

        this.ctx.fillStyle = this.c;
        let path = new Path2D();                            //button
        path.roundRect(this.x, this.y, this.w, this.h, this.round);
        this.ctx.fill(path);
        this.ctx.stroke(path);

        this.ctx.font = '40px comic';               //buttons
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.strokeText(this.name, x, this.y + 25);
        this.path2D = path;
        this.ctx.restore();
    }
}
export {Button}