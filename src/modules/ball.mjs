import { inRange } from "lodash";
class Ball {
    dx = 0;
    dy = 0;
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
            this.x += this.dx * correction;
            this.y += this.dy * correction;
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
    hitWall(canvasBasic, animate){
        
        if(this.x + this.rX > canvasBasic.elem.width || this.x - this.rX < 0){ //стены
            this.dx = -this.dx;
        }
        if(this.y - this.rY < 85){                                               //потолок
            this.dy = -this.dy;
        }
    }
    hitPaddle(paddle, animate, correction){
        if(this.y + this.rY + this.dy * correction > paddle.y && this.x >= paddle.x && this.x <= paddle.x + paddle.w){
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
        }    
        if(this.y + this.rY + this.dy * correction > paddle.y &&
           (this.x + this.rX + this.dx < paddle.x + paddle.w && this.x + this.rX + this.dx >= paddle.x ||
            this.x - this.rX + this.dx > paddle.x && this.x - this.rX + this.dx <= paddle.x + paddle.w)){
                    this.dx = -this.dx;              
        }
    }
    hitBrick(collectionBricks, game){
        
        let bricks = collectionBricks.getColl();
        let brick;
        for(let i = 0; i < collectionBricks.brickColumnCount; i++){
            
            for(let j = 0; j < collectionBricks.brickRowCount; j++){
                
                brick = bricks[i][j];
                if(brick.lives === 0) continue;
                if(this.y - this.rY > brick.y && this.y - this.rY <= brick.y + brick.h || //удар в кирпич во y
                   this.y + this.rY < brick.y + brick.h && this.y + this.rY >= brick.y){
                    if(this.x >= brick.x && this.x <= brick.x + brick.w){
                        //console.log('V');
                        brick.lives -= 1;
                        this.dy = -this.dy;
                        console.log(brick.color);
                    }
                }
                if(this.x + this.rX < brick.x + brick.w && this.x + this.rX >= brick.x || //удар в кирпич по x
                   this.x - this.rX > brick.x && this.x - this.rX <= brick.x + brick.w){
                    if(this.y >= brick.y && this.y <= brick.y + brick.h){
                        //console.log('X');
                        brick.lives -= 1;
                        this.dx = -this.dx;
                        console.log(brick.color);
                    }
                } 
                if(brick.lives === 0){
                    game.setScores(brick.scores);
                    collectionBricks.countDestroyedBricks++;
                    console.log(collectionBricks.countDestroyedBricks);
                }
            }
        }
    }
    outField(paddle, game){
        if(this.y + this.rY > paddle.y + paddle.h){
            game.phase = 'game_over';
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
}
export {Ball}