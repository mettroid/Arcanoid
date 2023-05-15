import { inRange } from "lodash";
class Ball {
    dx = 0;
    dy = 0;
    start = false;
    squeezeHorizontal = false;
    squeezeVertical = false;
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
    draw(canvasBottom){
        canvasBottom.ctx.beginPath();
        canvasBottom.ctx.fillStyle = this.color;
        canvasBottom.ctx.ellipse(this.x, this.y, this.rX, this.rY, this.rotate, this.degStart, this.degEnd);
        canvasBottom.ctx.fill();
        canvasBottom.ctx.stroke();
        canvasBottom.ctx.closePath();
        
        this.x += this.dx;
        this.y += this.dy;
    }
    hitWall(canvasBottom, canvasTop, animate){
        if(this.x + this.rX > canvasBottom.elem.width || this.x - this.rX < 0){
            if(this.squeezeHorizontal) return;
            if(this.squeezeVertical){ 
                this.dx = -this.dx;
                return;
            } else {
                let ms = 50 / Math.abs(this.dx);
                animate.addObj({
                    subObj: this,
                    changes: [
                        [
                            { prop: 'rX', to: 7, ms }
                        ],
                        [
                            { prop: 'dx' }
                        ],
                        [
                            { prop: 'rX', to: 10, ms }
                        ]
                    ]
                });
                this.delay('squeezeHorizontal', ms * 2);
            };
            this.squeezeHorizontal = true;
        }
        if(this.y - this.rY < canvasTop.elem.height){
            if(this.squeezeVertical) return;
            if(this.squeezeHorizontal){
                this.dy = -this.dy;
                console.log(this.dy);
            } else {
                let ms = 50 / Math.abs(this.dx);
                animate.addObj({
                    subObj: this,
                    changes: [
                        [
                            { prop: 'rY', to: 5, ms }
                        ],
                        [
                            { prop: 'dy' }
                        ],
                        [
                            { prop: 'rY', to: 10, ms }
                        ]
                    ]
                });
                this.delay('squeezeVertical', ms * 2);
            }


            this.squeezeVertical = true;
        }
    }
    hitPaddle(paddle, animate){
        if(this.y + this.rY > paddle.y && inRange(this.x, paddle.x, paddle.x + paddle.w)){
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
                if(this.y - this.rY > brick.y && this.y - this.rY < brick.y + brick.h || //удар в кирпич во y
                   this.y + this.rY < brick.y + brick.h && this.y + this.rY > brick.y){
                    if(inRange(this.x, brick.x, brick.x + brick.w)){
                        console.log('V');
                        brick.visible = false;
                        this.dy = -this.dy;
                        console.log(brick);
                    }
                }
                if(this.x + this.rX < brick.x + brick.w && this.x + this.rX > brick.x || //удар в кирпич по x
                   this.x - this.rX > brick.x && this.x - this.rX < brick.x + brick.w){
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
        if(this.y + this.rY > paddle.y + paddle.h){
            game.phase = 'game_over';
        }
    }
    delay(squeeze, ms){
        setTimeout(()=>{
            this[squeeze] = false;
        }, ms);
    }
}
export {Ball}