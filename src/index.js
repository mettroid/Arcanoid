import './index.html';
import './style.scss';
import {Canvas} from './modules/Canvas.mjs';
import {Game} from './modules/Game.mjs';
import {Title} from './modules/Title.mjs';
import {Button} from './modules/Button.mjs'
import * as Wrap from './modules/wrap_promise.mjs';

let myCanvas = new Canvas('myCanvas', document.getElementById('field'), 600, 600);
myCanvas.create();

let phase = 'sceen_saver';
let FPS = 30;
let game;
let ball, paddle;
let pictureColl;
let btnEasy, btnNormal, btnDifficult;
let title;

window.onload = function(){
    if(myCanvas.ctx){
        init();
    }
}
function mouseMoveHandler(e){
    game.paths
}
function draw(){
    let miss_frame = false;
    if(FPS !== 30) FPS = 60;
    let start = performance.now();
    requestAnimationFrame(function frame_loop(time){
        if(FPS === 30) miss_frame = !miss_frame;
        if(miss_frame) requestAnimationFrame(frame_loop);

        console.log('!');
        myCanvas.ctx.clearRect(0,0,myCanvas.elem.width,myCanvas.elem.height);
        //call_before_draw_frames();
        switch(phase){
            case 'sceen_saver':
                game.screen_saver(btnEasy, btnNormal, btnDifficult, title);
            break;
            case 'game':

            break;
            case 'game_over': 

            break;
        }
        if(time - start > 500) return;
        requestAnimationFrame(frame_loop);
    });
}
async function init(){
    try {
        let images = await import('./modules/images.mjs'); //sprite1 sprite2 ..
        pictureColl = await Promise.all(Wrap.promise(images));
        game = new Game(myCanvas, pictureColl, 60);
        btnEasy = new Button(225, 500, 250, 50, [10,10,10,10], '#F5D209', 'easy', myCanvas);
        btnNormal = new Button(225, 570, 250, 50, [10,10,10,10], '#F56E09', 'normal', myCanvas);
        btnDifficult = new Button(225, 640, 250, 50, [10,10,10,10], '#F50927', 'easy', myCanvas);
        title = new Title('purple', 'ARCANOID', myCanvas);
        //myCanvas.elem.addEventListener('mousemove', mouseMoveHandler);
        requestAnimationFrame(draw);
        
    } catch (error) {
        console.log(error.message);
    }

 
}