import {Events} from './Events.mjs';
class EventsGame extends Events {
    btn;
    constructor(ball, paddle, canvasBottom, game, animate){
        super(canvasBottom, game, animate);
        this.paddle = paddle;
        this.ball = ball;
    }
    handleEvent(e){
        if(this.game.phase !== 'game') return;  
        this.btn = e.code;
        this[e.type](e);
        
    }
    keydown(e){
        switch(this.btn){
            case "ArrowUp":
                if(!this.game.start){
                    this.game.start = true;
                    this.ball.dx = 0;
                    this.ball.dy = 300;
                }

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
}
export {EventsGame}