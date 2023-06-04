import _ from 'lodash';

function image(){
    return new Promise(async function(resolve, reject){
        let {default: path} = await import('../images/sprites.png'); //sprites.
        let img = new Image();
        img.src = path;
        img.addEventListener('load', function(){
            resolve(img);
        });
        img.addEventListener('error', function(){
            reject(new Error('Cant be load image'));
        });            
    });
}
function sound(){
    let sounds = ["catchBall.mp3", "crashWall.mp3", "addScores.mp3"];  
    return sounds.map(function(item){
            return new Promise(async function(resolve, reject){
                    let {default: path} = await import(`../sounds/${item}`);
                    let audio = new Audio(path);
                    resolve(audio);
            });
    });
}
export {image, sound};