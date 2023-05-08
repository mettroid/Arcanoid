import * as IsPointInPath from './isPointInPath.mjs'; 
class Menu {
    currObj = null;
    constructor(canvas, btnEasy, btnNormal, btnDifficult, game, animate){
        this.btnEasy = btnEasy;
        this.btnNormal = btnNormal;
        this.btnDifficult = btnDifficult;
        this.canvas = canvas;
        this.game = game;
        this.animate = animate;
    }
    handleEvent(e){
        switch(e.type){
            case 'mousedown':
            
            break;
            case 'mouseup':

            break;
            case 'mousemove':
                
                let button = IsPointInPath.check(e, this.canvas, this.btnEasy, this.btnNormal, this.btnDifficult); // находится ли курсор над кнопкой меню
            
                if(!button && this.currObj !== null){ 
                    this.currObj = null; 
                }
                if(!button || button === this.currObj || this.currObj !== null && button !== this.currObj) return;
                let nameBtn = button.name;
                this.animate.addObj({
                        subObj: button,
                        changes: [
                                    [
                                        { prop: 'w', to: 260, ms: 500 },
                                        { prop: 'h', to: 60, ms: 500 },
                                        { prop: 'x', to: 220, ms: 500 },
                                        { prop: 'y', to: nameBtn === 'easy'? 495 : nameBtn === 'normal'? 565 :  nameBtn === 'difficult'? 635 : 0, ms: 500 }
                                    ],
                                    [ 
                                        { sleep: 100 },
                                    ],
                                    [
                                        { prop: 'w', to: 250, ms: 500 },
                                        { prop: 'h', to: 50, ms: 500 },
                                        { prop: 'x', to: 225, ms: 500 },
                                        { prop: 'y', to: nameBtn ===  'easy'? 500 : nameBtn ===  'normal'? 570 : nameBtn ===  'difficult'? 640 : 0, ms: 500 }
                                    ]
                        ]
                });
                this.currObj = button;
            break;
            case 'click':
            
            break;
        }
    }
}
export {Menu}