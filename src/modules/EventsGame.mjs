import {Events} from './Events.mjs';
class EventsGame extends Events {
    btn;
    constructor(ball, paddle, canvasBottom, canvasTop, game, animate){
        super(canvasBottom, canvasTop, game, animate);
        this.paddle = paddle;
        this.ball = ball;
    }
    handleEvent(e){
        if(this.game.phase !== 'game') return;  
        this.btn = e.code;
        this[e.type](e);
        
    }
    keydown(e){
        console.log('!');
        switch(this.btn){
            case "ArrowUp":
                if(!this.ball.start){
                    this.ball.start = true;
                    this.ball.dx = 2;
                    this.ball.dy = 2.5;
                }

            break;
            case "ArrowLeft":
                this.ball.start && (this.paddle.pressedLeft = true);
            break;
            case "ArrowRight":
                this.ball.start && (this.paddle.pressedRight = true);
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