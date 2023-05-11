import { inRange } from "lodash";
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
        //this.hitWall(canvas);
        canvas.ctx.beginPath();
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        canvas.ctx.fill();
        canvas.ctx.closePath();
        
        this.x += this.dx;
        this.y += this.dy;
    }
    hitWall(canvas){
        if(this.x + this.r > canvas.elem.width || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if(this.y - this.r < 0){
            this.dy = -this.dy;
        }
    }
    hitPaddle(paddle, animate){
        if(this.y + this.r > paddle.y && inRange(this.x, paddle.x, paddle.x + paddle.w)){
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
    }
    hitBrick(collectionBricks){
        
        let bricks = collectionBricks.getColl();
        for(let i = 0; i < collectionBricks.brickColumnCount; i++){
            
            for(let j = 0; j < collectionBricks.brickRowCount; j++){
                
                let brick = bricks[i][j];
                if(!brick.visible) continue;
                if(this.y - this.r > brick.y && this.y - this.r < brick.y + brick.h || //удар в кирпич во y
                   this.y + this.r < brick.y + brick.h && this.y + this.r > brick.y){
                    if(inRange(this.x, brick.x, brick.x + brick.w)){
                        console.log('V');
                        brick.visible = false;
                        this.dy = -this.dy;
                        console.log(brick);
                    }
                }
                if(this.x + this.r < brick.x + brick.w && this.x + this.r > brick.x || //удар в кирпич по x
                   this.x - this.r > brick.x && this.x - this.r < brick.x + brick.w){
                    if(inRange(this.y, brick.y, brick.y + brick.h)){
                        console.log('X');
                        brick.visible = false;
                        this.dx = -this.dx;
                        console.log(brick);
                    }
                } 
            }
        }
    }
    outField(paddle, game){
        if(this.y + this.r > paddle.y + paddle.h){
            game.phase = 'game_over';
        }
    }
}
export {Ball}