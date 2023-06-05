import * as Audio from './audio.mjs';
class Ball {
    dx = 0;
    dy = 0;
    tempx = 0;
    tempy = 0;
    defaultSet = {};
    constructor( x, y, rX, rY, rotate, degStart, degEnd, color ){
        this.defaultSet.x = x;
        this.defaultSet.y = y;
        this.defaultSet.rX = rX;
        this.defaultSet.rY = rY;
        this.defaultSet.rotate = rotate;
        this.defaultSet.degStart = degStart;
        this.defaultSet.degEnd = degEnd;
        this.defaultSet.color = color;

        this.setInitValues(this.defaultSet);
    }  
    setInitValues({ x, y, rX, rY, rotate, degStart, degEnd, color }){
        this.x = x;
        this.y = y;
        this.rX = rX;
        this.rY = rY;
        this.rotate = rotate;
        this.degStart = degStart;
        this.degEnd = degEnd;
        this.color = color;     
    }
    draw(canvasBasic, correction, game, paddle){ 
        if(game.start){
            this.x = this.tempx;
            this.y = this.tempy;
        } else {
            this.x = paddle.curveX;
        }      


        canvasBasic.ctx.save();
        canvasBasic.ctx.beginPath();
        canvasBasic.ctx.fillStyle = this.color;
        canvasBasic.ctx.ellipse(this.x, this.y, this.rX, this.rY, this.rotate, this.degStart, this.degEnd);
        canvasBasic.ctx.fill();
        canvasBasic.ctx.stroke();
        canvasBasic.ctx.closePath();
        canvasBasic.ctx.restore();


    }
    hitWall(canvasBasic, sound, animate){
        
        if(this.tempx + this.rX >= canvasBasic.elem.width || this.tempx - this.rX <= 0){ //стены
            this.tempx = this.x;
            this.dx = -this.dx;
            
            Audio.play(sound);
        }
        if(this.tempy - this.rY <= 85){                                               //потолок
            this.tempy = this.y;
            this.dy = -this.dy;

            Audio.play(sound);
        }
    }
    hitPaddle(paddle, sound, animate){
        if(this.tempy + this.rY >= paddle.y && this.tempx >= paddle.x && this.tempx <= paddle.x + paddle.w){
            this.tempx = this.x;
            this.tempy = this.y;
            this.dy = -this.dy;
            animate.addObj({
                subObj: paddle,
                changes: [
                    [
                        { prop: 'curveY', to: 760, ms: 100 }
                    ],
                    [
                        { prop: 'curveY', to: 750, ms: 100 }
                    ]
                ]
            });  
            Audio.play(sound);
        } else if(this.tempy + this.rY > paddle.y &&
           (this.tempx + this.rX < paddle.x + paddle.w && this.tempx + this.rX >= paddle.x ||
            this.tempx - this.rX > paddle.x && this.tempx - this.rX <= paddle.x + paddle.w)){
                this.tempx = this.x;
                this.tempy = this.y;
                this.dx = -this.dx;              
        }
    }
    hitBrick(collectionBricks, sound, game){
        
        let bricks = collectionBricks.getColl();
        let brick;
        for(let i = 0; i < collectionBricks.brickColumnCount; i++){
            
            for(let j = 0; j < collectionBricks.brickRowCount; j++){
                
                brick = bricks[i][j];
                if(brick.lives === 0) continue;
                if(this.tempy - this.rY > brick.y && this.tempy - this.rY <= brick.y + brick.h || //удар в кирпич во y
                   this.tempy + this.rY < brick.y + brick.h && this.tempy + this.rY >= brick.y){
                    if(this.tempx >= brick.x && this.tempx <= brick.x + brick.w){
                        //console.log('V');
                        !brick.damaged && (brick.damaged = true);
                        brick.lives -= 1;
                        this.tempx = this.x;
                        this.tempy = this.y;
                        this.dy = -this.dy;
                        Audio.play(sound[4]);
                        console.log(brick.color);
                    }
                }
                if(this.tempx + this.rX < brick.x + brick.w && this.tempx + this.rX >= brick.x || //удар в кирпич по x
                   this.tempx - this.rX > brick.x && this.tempx - this.rX <= brick.x + brick.w){
                    if(this.tempy >= brick.y && this.tempy <= brick.y + brick.h){
                        //console.log('X');
                        !brick.damaged && (brick.damaged = true);
                        brick.lives -= 1;
                        this.tempx = this.x;
                        this.tempy = this.y;
                        this.dx = -this.dx;
                        Audio.play(sound[4]);
                        console.log(brick.color);
                    }
                } 
                if(brick.lives === 0){
                    game.setScores(brick.scores);
                    collectionBricks.countDestroyedBricks++;
                    Audio.play(sound[3]);
                    console.log(collectionBricks.countDestroyedBricks);
                }
            }
        }
    }
    outField(paddle, game){
        if(this.y + this.rY > paddle.y + paddle.h){
            game.decreaseLives(1);
            if(game.lives > 0){
                this.setInitValues(this.defaultSet);
                paddle.setInitValues(paddle.defaultSet);
                game.start = false;
            } else {
                game.phase = 'game_over';
            }
        }
    }
    delay(squeeze, ms, val, temp){
        setTimeout(()=>{
            //console.log(temp);
            //let res = temp.slice(4);
            val = -val;
            this[squeeze] = false;
            this[temp] = val;
        }, ms);
    }
    moveBall(correction){
        this.tempx = this.x + this.dx * correction;
        this.tempy = this.y + this.dy * correction;
    }
}
export {Ball}