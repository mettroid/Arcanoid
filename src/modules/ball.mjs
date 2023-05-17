import { inRange } from "lodash";
class Ball {
    dx = 0;
    dy = 0;
    start = false;
    constructor(x, y, rX, rY, rotate, degStart, degEnd, color){
        this.x = x;
        this.y = y;
        this.rX = rX;
        this.rY = rY;
        this.rotate = rotate;
        this.degStart = degStart;
        this.degEnd = degEnd;
        this.color = color;
    }
    draw(canvasBasic){
        canvasBasic.ctx.save();
        canvasBasic.ctx.beginPath();
        canvasBasic.ctx.fillStyle = this.color;
        //canvasBasic.ctx.ellipse(this.x, this.y, this.rX, this.rY, this.rotate, this.degStart, this.degEnd);
        canvasBasic.ctx.arc(this.x, this.y, this.rX, 0, Math.PI * 2);
        canvasBasic.ctx.fill();
        canvasBasic.ctx.stroke();
        canvasBasic.ctx.closePath();
        canvasBasic.ctx.restore();

        this.x += this.dx;
        this.y += this.dy;
    }
    hitWall(canvasBasic, animate){
        
        if(this.x + this.rX > canvasBasic.elem.width || this.x - this.rX < 0){ //стены
            this.dx = -this.dx;
        }
        if(this.y - this.rY < 85){                                               //потолок
            this.dy = -this.dy;
        }
    }
    hitPaddle(paddle, animate){
        if(this.y + this.rY > paddle.y){

            if(this.x > paddle.x &&
               this.x < paddle.x + paddle.w){
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
             } else if (this.x + this.rX < paddle.x + paddle.w && this.x + this.rX > paddle.x ||
                        this.x - this.rX > paddle.x && this.x - this.rX < paddle.x + paddle.w){
                            this.dx = -this.dx;               
             }

        }
    }
    hitBrick(collectionBricks){
        
        let bricks = collectionBricks.getColl();
        for(let i = 0; i < collectionBricks.brickColumnCount; i++){
            
            for(let j = 0; j < collectionBricks.brickRowCount; j++){
                
                let brick = bricks[i][j];
                if(!brick.visible) continue;
                if(this.y - this.rY > brick.y && this.y - this.rY < brick.y + brick.h || //удар в кирпич во y
                   this.y + this.rY < brick.y + brick.h && this.y + this.rY > brick.y){
                    if(inRange(this.x, brick.x, brick.x + brick.w)){
                        //console.log('V');
                        brick.visible = false;
                        this.dy = -this.dy;
                        //console.log(brick);
                    }
                }
                if(this.x + this.rX < brick.x + brick.w && this.x + this.rX > brick.x || //удар в кирпич по x
                   this.x - this.rX > brick.x && this.x - this.rX < brick.x + brick.w){
                    if(inRange(this.y, brick.y, brick.y + brick.h)){
                        //console.log('X');
                        brick.visible = false;
                        this.dx = -this.dx;
                        //console.log(brick);
                    }
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