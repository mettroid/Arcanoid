import './index.html';
import './style.scss';
import {Canvas} from './modules/Canvas.mjs';
import {Game} from './modules/Game.mjs';
import {Title} from './modules/Title.mjs';
import {Button} from './modules/Button.mjs'
import {ButtonsCollections} from './modules/ButtonsCollections.mjs';
import {Animate} from './modules/Animate.mjs';
import * as Wrap from './modules/wrap_promise.mjs';
import {EventsMenu} from './modules/EventsMenu.mjs';
import {EventsGame} from './modules/EventsGame.mjs';
import {Paddle} from './modules/Paddle.mjs';
import {Ball} from './modules/ball.mjs';
import { CollectionBricks } from './modules/CollectionBricks.mjs';
import { Brick } from './modules/brick.mjs';

let myCanvasTop = new Canvas('myCanvasBottom', document.getElementById('field'));
let myCanvasBottom = new Canvas('myCanvasBottom', document.getElementById('field'));
myCanvasTop.create(1, .1, true, 2);
myCanvasBottom.create(1, 1, false, 1);

let phase = 'sceen_saver';
let FPS = 60;
let game;
let eventsMenu, eventsGame; //объект обработчик событий мыши
let ball, paddle;
let pictureColl;
let btnEasy, btnNormal, btnDifficult;
let title;
let animate = new Animate(); // объект анимации
let collectionBricks = new CollectionBricks(myCanvasTop.elem.height + 50);

window.onload = function(){
    if(myCanvasBottom.ctx &&
       myCanvasTop.ctx){
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
        let fpsCount = 0;
        requestAnimationFrame(function frame_loop(time){
            if(FPS === 30) miss_frame = !miss_frame;
            if(miss_frame) requestAnimationFrame(frame_loop);

            myCanvasBottom.ctx.clearRect(0,0,myCanvasBottom.elem.width,myCanvasBottom.elem.height);
    
            call_before_draw_frames();
            switch(game.phase){
                case 'sceen_saver':
                    game.screen_saver(btnEasy, btnNormal, btnDifficult, title);
                    resolve();
                break;
                case 'game':
                    //alert('В игре');
                    //return;
                    //game.drawTopMenu();

                    paddle.draw(myCanvasBottom);
                    ball.draw(myCanvasBottom);
                    ball.hitWall(myCanvasBottom, myCanvasTop, animate);
                    ball.hitPaddle(paddle, animate);
                    //ball.hitBrick(collectionBricks);
                    //collectionBricks.draw(myCanvasBottom);
                    ball.outField(paddle, game);
                break;
                case 'game_over': 
                    game.game_over();
                    return;
                break;
            }
            if(time - start > 60000) return;
            if(time - start >= 1000){
                console.log(fpsCount);
                fpsCount = 0;
                start = time;
            }
            fpsCount++;
            requestAnimationFrame(frame_loop);
        });
    });

}
async function init(){
    try {
        let images = await import('./modules/images.mjs'); //sprite1 sprite2 ..
            pictureColl = await Promise.all(Wrap.promise(images));
            
            game = new Game(myCanvasBottom, myCanvasTop, pictureColl, FPS, phase);
            title = new Title('purple', 'ARCANOID', myCanvasBottom);
            btnEasy = new Button(225, 500, 250, 50, [10,10,10,10], '#F5D209', 'easy', myCanvasBottom);
            btnNormal = new Button(225, 570, 250, 50, [10,10,10,10], '#F56E09', 'normal', myCanvasBottom);
            btnDifficult = new Button(225, 640, 250, 50, [10,10,10,10], '#F50927', 'difficult', myCanvasBottom);
            eventsMenu = new EventsMenu(btnEasy, btnNormal, btnDifficult, myCanvasBottom, myCanvasTop, game, animate);
            
            await draw();
            myCanvasBottom.elem.addEventListener('mousemove', eventsMenu);
            myCanvasBottom.elem.addEventListener('click', eventsMenu);
            myCanvasBottom.elem.addEventListener('mousedown', eventsMenu);
            myCanvasBottom.elem.addEventListener('mouseup', eventsMenu);

            paddle = new Paddle(310, 750, 80, 20, 10, 'blue', myCanvasBottom.elem.width);
            ball = new Ball(350, 740, 10, 10, 0, 0, Math.PI*2, "red");
            collectionBricks.fill(Brick);
            eventsGame = new EventsGame(ball, paddle, myCanvasBottom, myCanvasTop, game, animate);
            document.addEventListener('keydown', eventsGame);
            document.addEventListener('keyup', eventsGame);
        
    } catch (error) {
        console.log(error.message);
    }

 
}