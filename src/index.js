import './index.html';
import './style.scss';
import {Canvas} from './modules/Canvas.mjs';
import {Game} from './modules/Game.mjs';
import * as Wrap from './modules/wrap_promise.mjs';

let myCanvas = new Canvas('myCanvas', document.getElementById('field'), 600, 600);
myCanvas.create();

let phase = 'sceen_saver';
let FPS = 30;
let game;
let ball, paddle;
let pictureColl;

window.onload = function(){
    if(myCanvas.ctx){
        init();
    }
}
function draw(){
    let miss_frame = false;
    if(FPS !== 30) FPS = 60;

    requestAnimationFrame(function frame_loop(){
        if(FPS === 30) miss_frame = !miss_frame;
        if(miss_frame) requestAnimationFrame(frame_loop);

        //call_before_draw_frames();
        switch(phase){
            case 'sceen_saver':
                game.screen_saver();
            break;
            case 'game':

            break;
            case 'game_over': 

            break;
        }
    });
}
async function init(){
    try {
        let images = await import('./modules/images.mjs'); //sprite1 sprite2 ..
        pictureColl = await Promise.all(Wrap.promise(images));
        game = new Game(myCanvas, pictureColl, 60);
        
        requestAnimationFrame(draw);
        
    } catch (error) {
        console.log(error.message);
    }

 
}