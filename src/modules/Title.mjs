class Title {
    constructor(c, text, canvas){
        this.x = Math.floor(canvas.elem.width / 2);
        this.y = 250;
        this.c = c;
        this.text = text;
        this.canvas = canvas.elem;
        this.ctx = canvas.ctx;
    }
    draw(){
        this.ctx.fillStyle = this.c;
        this.ctx.font = '70px montserrat';               //buttons
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.text, this.x, this.y);
    }
}
export {Title};