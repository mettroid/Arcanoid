import {Events} from './Events.mjs';
class EventsGame extends Events {
    constructor(paddle, canvas, game, animate){
        super(canvas, game, animate);
        this.paddle = paddle;
    }
    handleEvent(e){
        if(this.game.phase !== 'game') return;

    }
    ///if(this.game)
}
export {EventsGame}