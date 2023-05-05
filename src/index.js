import './index.html';
import './style.scss';
import {Canvas} from './modules/Canvas.mjs';
import {Game} from './modules/Game.mjs';
import * as Wrap from './modules/wrap_promise.mjs';

let myCanvas = new Canvas('myCanvas', document.getElementById('field'), 600, 600);
myCanvas.create();

let game;
let ball, paddle;

window.onload = function(){
    if(myCanvas.ctx){
        init();
    }
}
async function init(){
    try {
        let images = await import('./modules/images.mjs');
        let picColl = await Promise.all(Wrap.promise(images));
        game = new Game(3, myCanvas.ctx);
        game.screen_saver(picColl[1]);

        
    } catch (error) {
        console.log(error.message);
    }

 
}