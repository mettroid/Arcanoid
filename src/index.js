import './index.html';
import './style.scss';
import {Canvas} from './modules/Canvas.mjs';
import {Game} from './modules/Game.mjs';
import {Title} from './modules/Title.mjs';
import {Button} from './modules/Button.mjs'
import {ButtonsCollections} from './modules/ButtonsCollections.mjs';
import {Animate} from './modules/Animate.mjs';
import * as Wrap from './modules/wrap_promise.mjs';
import {Menu} from './modules/Menu.mjs';

let myCanvas = new Canvas('myCanvas', document.getElementById('field'), 600, 600);
myCanvas.create();

let phase = 'sceen_saver';
let FPS = 60;
let game;
let menu; //объект обработчик событий мыши
let ball, paddle;
let pictureColl;
let btnEasy, btnNormal, btnDifficult;
let title;
let animate = new Animate(); // объект анимации

let currObj = null; // текущий объект кнопка

window.onload = function(){
    if(myCanvas.ctx){
        init();
    }
}
function mouseMoveHandler(e){

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
            switch(game.phase){
                case 'sceen_saver':
                    game.screen_saver(btnEasy, btnNormal, btnDifficult, title);
                    resolve();
                break;
                case 'game':
                    alert('В игре');
                    return;
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
            
            game = new Game(myCanvas, pictureColl, FPS, phase);
            title = new Title('purple', 'ARCANOID', myCanvas);
            btnEasy = new Button(225, 500, 250, 50, [10,10,10,10], '#F5D209', 'easy', myCanvas);
            btnNormal = new Button(225, 570, 250, 50, [10,10,10,10], '#F56E09', 'normal', myCanvas);
            btnDifficult = new Button(225, 640, 250, 50, [10,10,10,10], '#F50927', 'difficult', myCanvas);
            menu = new Menu(myCanvas, btnEasy, btnNormal, btnDifficult, game, animate);

            await draw();
            myCanvas.elem.addEventListener('mousemove', menu);
            myCanvas.elem.addEventListener('click', menu);
            myCanvas.elem.addEventListener('mousedown', menu);
            myCanvas.elem.addEventListener('mouseup', menu);
        
        
    } catch (error) {
        console.log(error.message);
    }

 
}