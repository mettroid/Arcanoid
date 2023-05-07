import './index.html';
import './style.scss';
import {Canvas} from './modules/Canvas.mjs';
import {Game} from './modules/Game.mjs';
import {Title} from './modules/Title.mjs';
import {Button} from './modules/Button.mjs'
import {ButtonsCollections} from './modules/ButtonsCollections.mjs';
import {Animate} from './modules/Animate.mjs';
import * as Wrap from './modules/wrap_promise.mjs';
import * as MouseCoords from './modules/mouseCoords.mjs';

let myCanvas = new Canvas('myCanvas', document.getElementById('field'), 600, 600);
myCanvas.create();

let phase = 'sceen_saver';
let FPS = 60;
let game;
let ball, paddle;
let pictureColl;
let btnEasy, btnNormal, btnDifficult;
let title;
let coll;
let animate = new Animate();

let currObj = null;
let flag = false;



window.onload = function(){
    if(myCanvas.ctx){
        init();
    }
}
function mouseMoveHandler(e){
    let coords = MouseCoords.get(e, myCanvas.elem);
    let button = myCanvas.ctx.isPointInPath(btnEasy.path2D, coords.x, coords.y) && btnEasy     ||
                 myCanvas.ctx.isPointInPath(btnNormal.path2D, coords.x, coords.y) && btnNormal ||
                 myCanvas.ctx.isPointInPath(btnDifficult.path2D, coords.x, coords.y) && btnDifficult;

    if(!button && currObj !== null){ 
        currObj = null; 
    }
    if(!button || button === currObj || currObj !== null && button !== currObj) return;
    let nameBtn = button.name;
    animate.addObj({
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
    currObj = button;
}
function call_before_draw_frames(){
    Object.values(animate.getList()).forEach((item, ind, arr)=>{
       item();
    });
}
function draw(){
    return new Promise(function(resolve, revect){
        let miss_frame = false;
        if(FPS !== 30) FPS = 60;
        let start = performance.now();
        requestAnimationFrame(function frame_loop(time){
            if(FPS === 30) miss_frame = !miss_frame;
            if(miss_frame) requestAnimationFrame(frame_loop);
    
            console.log('!');
            myCanvas.ctx.clearRect(0,0,myCanvas.elem.width,myCanvas.elem.height);
    
            call_before_draw_frames();
            switch(phase){
                case 'sceen_saver':
                    game.screen_saver(btnEasy, btnNormal, btnDifficult, title);
                    resolve();
                break;
                case 'game':
    
                break;
                case 'game_over': 
    
                break;
            }
            if(time - start > 15000) return;
            requestAnimationFrame(frame_loop);
        });
    });

}
async function init(){
    try {
        let images = await import('./modules/images.mjs'); //sprite1 sprite2 ..
        pictureColl = await Promise.all(Wrap.promise(images));
        
        game = new Game(myCanvas, pictureColl, 60);
        title = new Title('purple', 'ARCANOID', myCanvas);
        btnEasy = new Button(225, 500, 250, 50, [10,10,10,10], '#F5D209', 'easy', myCanvas);
        btnNormal = new Button(225, 570, 250, 50, [10,10,10,10], '#F56E09', 'normal', myCanvas);
        btnDifficult = new Button(225, 640, 250, 50, [10,10,10,10], '#F50927', 'difficult', myCanvas);
        
        await draw();
        myCanvas.elem.addEventListener('mousemove', mouseMoveHandler);
       
        
        
    } catch (error) {
        console.log(error.message);
    }

 
}