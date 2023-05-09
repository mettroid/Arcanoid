import {Events} from './Events.mjs';
class EventsGame extends Events {
    btn;
    constructor(paddle, canvas, game, animate){
        super(canvas, game, animate);
        this.paddle = paddle;
    }
    handleEvent(e){
        if(this.game.phase !== 'game') return;  
        this.btn = e.code;
        let event_type = e.type;
        this[event_type](e);
        
    }
    keydown(e){
        switch(this.btn){
            case "ArrowUp":

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