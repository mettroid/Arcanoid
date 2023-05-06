class Game {
    lives;
    paths = {};
    fps;
    constructor(canvas, images, fps){
        this.fps = fps;
        this.canvas = canvas;
        this.ctx = canvas.ctx;
        this.score = 0;
        this.collections = images;
    }
    async screen_saver(){
        let back = await createImageBitmap(this.collections[0], 0, 0, 80, 85); //background
        const pattern = this.ctx.createPattern(back, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

        let x = Math.floor(this.canvas.width / 2);

        this.ctx.strokeRect = 'black';
        this.ctx.lineWidth = 2;

        this.ctx.fillStyle = '#F5D209';
        let easy = new Path2D();                            //easy
        easy.roundRect(225, 500, 250, 50, [10,10,10,10]);
        this.ctx.fill(easy);
        this.ctx.stroke(easy);

        this.ctx.fillStyle = '#F56E09';
        let normal = new Path2D();                          //norm
        normal.roundRect(225, 570, 250, 50, [10,10,10,10]); 
        this.ctx.fill(normal);
        this.ctx.stroke(normal);

        this.ctx.fillStyle = '#F50927';
        let difficult = new Path2D();                       //normal
        difficult.roundRect(225, 640, 250, 50, [10,10,10,10]);
        this.ctx.fill(difficult); 
        this.ctx.stroke(difficult);

        this.ctx.font = '40px comic';               //buttons
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.strokeText('EASY', x, 530);
        this.ctx.strokeText('NORMAL', x, 600);
        this.ctx.strokeText('DIFFICULT', x, 670);

        this.ctx.font = '80px Arial';
        this.ctx.fillStyle = 'purple';
        this.ctx.fillText('ARCANOID', x , 300);

    }   
    game_over(canvas){

    }

}
export {Game};