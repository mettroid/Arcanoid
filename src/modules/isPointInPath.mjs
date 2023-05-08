import * as Mouse from './mouseCoords.mjs';
const check = function(event, canvas, btnEasy, btnNormal, btnDifficult){
    let coords = Mouse.getCoords(event, canvas.elem);
    return canvas.ctx.isPointInPath(btnEasy.path2D, coords.x, coords.y) && btnEasy        ||
           canvas.ctx.isPointInPath(btnNormal.path2D, coords.x, coords.y) && btnNormal    ||
           canvas.ctx.isPointInPath(btnDifficult.path2D, coords.x, coords.y) && btnDifficult;
}
export {check}