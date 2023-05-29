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
import * as Picture from './modules/Picture.mjs';
import * as Sprites from './modules/Sprites.mjs';

let canvasBasic = new Canvas('canvasBasic', document.getElementById('field'));
canvasBasic.create(1, 1, false, 1);

let audioCtx;
let phase = 'sceen_saver';
let game;
let eventsMenu, eventsGame; //объект обработчик событий мыши
let ball, paddle;
let pictureColl;
let btnEasy, btnNormal, btnDifficult;
let title;
let animate = new Animate(); // объект анимации
let collectionBricks = new CollectionBricks();



window.onload = function(){
    if(canvasBasic.ctx){
            initGame();
            initAudio();
    }
}
function call_before_draw_frames(){
    Object.values(animate.getList()).forEach((item, ind, arr)=>{
       item();
    });
}
function draw(){
    return new Promise(function(resolve, reject){
        let deltaTime = 0;
        let lastUpdate = performance.now();
        let correction = 0;
        let myGame;
        let flag = false;
        function frame_loop(currentTime){
            myGame = requestAnimationFrame(frame_loop);
            deltaTime = currentTime - lastUpdate;
            correction = deltaTime / 1000;
            animate.updateCorrection(deltaTime);
            //console.log(deltaTime);
            call_before_draw_frames();
                canvasBasic.ctx.clearRect(0,0,canvasBasic.elem.width,canvasBasic.elem.height);

                
                switch(game.phase){
                    case 'sceen_saver':
                        game.screen_saver(btnEasy, btnNormal, btnDifficult, title);
                        resolve();
                    break;
                    case 'game':
                       
                        
                        ball.hitWall(canvasBasic, animate);
                        ball.hitPaddle(paddle, animate, correction);
                        ball.hitBrick(collectionBricks, game);
                        
                        game.drawBack();
                        game.drawTopMenu();
                        paddle.draw(canvasBasic, correction);
                        ball.draw(canvasBasic, correction, game, paddle);
                        collectionBricks.draw(canvasBasic);

                        if(collectionBricks.isAllBroken()){
                            if(!flag){
                                setTimeout(function(){
                                    game.phase = 'winner';
                                }, 1000);
                            }
                        } else {
                            ball.outField(paddle, game);
                        }
                        
                    break;
                    case 'winner':
                        game.winner();    
                    break;
                    case 'game_over': 
                        game.game_over();
                    break;
                }      

                
                lastUpdate = currentTime;
        };
        requestAnimationFrame(frame_loop);
    });

}
async function initGame(){
    try {
            let {default: path} = await import('./images/sprites.png'); //sprites.
            let picture = await Picture.load(path);
            pictureColl = await Promise.all(Sprites.cut(picture));
            console.log(pictureColl[0]);
            game = new Game(canvasBasic, pictureColl, phase);
            title = new Title("rgb(23, 241, 3)", 'ARCANOID', canvasBasic);
            btnEasy = new Button(225, 500, 250, 50, [10,10,10,10], '#F5D209', 'easy', canvasBasic);
            btnNormal = new Button(225, 570, 250, 50, [10,10,10,10], '#F56E09', 'normal', canvasBasic);
            btnDifficult = new Button(225, 640, 250, 50, [10,10,10,10], '#F50927', 'difficult', canvasBasic);
            eventsMenu = new EventsMenu(btnEasy, btnNormal, btnDifficult, canvasBasic, game, animate);
            
            await draw();
            canvasBasic.elem.addEventListener('mousemove', eventsMenu);
            canvasBasic.elem.addEventListener('click', eventsMenu);
            canvasBasic.elem.addEventListener('mousedown', eventsMenu);
            canvasBasic.elem.addEventListener('mouseup', eventsMenu);
           
            paddle = new Paddle(310, 750, 80, 20, 10, 'white', canvasBasic.elem.width);
            ball = new Ball(350, 740, 10, 10, 0, 0, Math.PI*2, "red");
            collectionBricks.fill(Brick);
            eventsGame = new EventsGame(ball, paddle, canvasBasic, game, animate);
            document.addEventListener('keydown', eventsGame);
            document.addEventListener('keyup', eventsGame);
        
    } catch (error) {
        console.log(error.message);
    }
}
function initAudio(){
    try {
        audioCtx = new AudioContext();
    } catch(error){
        console.log('you need webaudio support');
    }
}
