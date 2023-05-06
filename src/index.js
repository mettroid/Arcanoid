import './index.html';
import './style.scss';
import {Canvas} from './modules/Canvas.mjs';
import {Game} from './modules/Game.mjs';
import * as Wrap from './modules/wrap_promise.mjs';

let myCanvas = new Canvas('myCanvas', document.getElementById('field'), 600, 600);
myCanvas.create();

let game;
let ball, paddle;
let pictureColl;

window.onload = function(){
    if(myCanvas.ctx){
        init();
    }
}
async function init(){
    try {
        let images = await import('./modules/images.mjs'); //sprite1 sprite2 ..
        pictureColl = await Promise.all(Wrap.promise(images));
        game = new Game(myCanvas, pictureColl);
        game.screen_saver();

        
    } catch (error) {
        console.log(error.message);
    }

 
}