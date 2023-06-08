import {Events} from './Events.mjs';
import * as Mouse from './mouseCoords.mjs';
class EventsGame extends Events {
    btn;
    constructor(ball, paddle, canvasBasic, game, animate){
        super(canvasBasic, game, animate);
        this.paddle = paddle;
        this.ball = ball;
    }
    handleEvent(e){
        //console.log(e.type);
        if(this.game.phase !== 'game') return;  
        this.btn = e.code;
        this[e.type](e);
        
    }
    keydown(e){
        switch(this.btn){
            case "ArrowUp":
                this.startBall();
            break;
            case "ArrowLeft":
                this.paddle.pressedLeft = true;
            break;
            case "ArrowRight":
                this.paddle.pressedRight = true;
            break;
        }
    }
    keyup(e){ 
        switch(this.btn){
            case "ArrowUp":

            break;
            case "ArrowLeft":
                this.paddle.pressedLeft = false;
            break;
            case "ArrowRight":
                this.paddle.pressedRight = false;
            break;
        }
    }
    mousemove(e){
        let { x } = Mouse.getCoords(e, this.canvasBasic.elem);
        let x1 = x - this.paddle.w / 2;
        let x2 = this.canvasBasic.elem.width - this.paddle.w;
        this.paddle.tempx = Math.min(Math.max(0, x1), x2);
    }
    click(e){
        this.startBall();
    }
    startBall(){
        if(!this.game.start 
        &&  this.game.phase === 'game'){
            this.game.start = true;
            this.ball.dx = 150;
            this.ball.dy = 300;
        }
    }
}
export {EventsGame}