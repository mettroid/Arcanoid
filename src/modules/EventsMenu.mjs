import {Events} from './Events.mjs';
import {inRange} from 'lodash';
import * as IsPointInPath from './isPointInPath.mjs';
import * as Mouse from './mouseCoords.mjs';
import * as Audio from './audio.mjs';
class EventsMenu extends Events {
    currObj = null;
    startCoords = null;
    constructor(btnEasy, btnNormal, btnDifficult, canvasBasic, game, animate, audioColl){
        super(canvasBasic, game, animate);
        this.btnEasy = btnEasy;
        this.btnNormal = btnNormal;
        this.btnDifficult = btnDifficult;
        this.audioColl = audioColl;
    }
    handleEvent(e){
        if(this.game.phase !== 'sceen_saver') return;
        switch(e.type){
            case 'mousedown':
                this.startCoords = Mouse.getCoords(e, this.canvasBasic.elem);
            break;
            case 'mouseup':
                if(this.currObj === null) return;
                let currCoords = Mouse.getCoords(e, this.canvasBasic.elem);
                if(this.checkMatch(this.startCoords, currCoords) === undefined) return;

                console.log(this.audioColl);
                Audio.play(this.audioColl[0]);
                this.game.phase = 'game';
                switch(this.currObj.name){
                    case 'easy':
                        this.game.setLives(5);
                    break;
                    case 'normal':
                        this.game.setLives(3);
                    break;
                    case 'difficult':
                        this.game.setLives(1);
                    break;
                }
            break;
            case 'mousemove':
                let coords = Mouse.getCoords(e, this.canvasBasic.elem);
                let button = IsPointInPath.check(this.canvasBasic.ctx, coords, this.btnEasy, this.btnNormal, this.btnDifficult); // находится ли курсор над кнопкой меню
            
                if(!button && this.currObj !== null){ 
                    this.currObj = null; 
                }
                if(!button || button === this.currObj || this.currObj !== null && button !== this.currObj) return;
                let nameBtn = button.name;
                if(this.animate.hasObj(button)) return;
                this.animate.addObj({
                        subObj: button,
                        changes: [
                                    [
                                        { prop: 'w', to: 260, ms: 100 },
                                        { prop: 'h', to: 60, ms: 100 },
                                        { prop: 'x', to: 220, ms: 100 },
                                        { prop: 'y', to: nameBtn === 'easy'? 495 : nameBtn === 'normal'? 565 :  nameBtn === 'difficult'? 635 : 0, ms: 100 }
                                    ],
                                    [ 
                                        { sleep: 100 },
                                    ],
                                    [
                                        { prop: 'w', to: 250, ms: 100 },
                                        { prop: 'h', to: 50, ms: 100 },
                                        { prop: 'x', to: 225, ms: 100 },
                                        { prop: 'y', to: nameBtn ===  'easy'? 500 : nameBtn ===  'normal'? 570 : nameBtn ===  'difficult'? 640 : 0, ms: 100 }
                                    ]
                        ]
                });

                this.currObj = button;
            break;
        }
    }
    checkMatch(start, curr){
        let coll = [this.btnEasy, this.btnNormal, this.btnDifficult];
        return coll.find(function(btn, ind, arr){
            return inRange(start.x, btn.x, btn.x + btn.w) && inRange(start.y, btn.y, btn.y + btn.h) &&
                   inRange(curr.x, btn.x, btn.x + btn.w) && inRange(curr.y, btn.y, btn.y + btn.h)            
        });
    }
}
export {EventsMenu}