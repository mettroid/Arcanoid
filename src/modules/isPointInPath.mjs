const check = function(ctx, coords, btnEasy, btnNormal, btnDifficult){    
    return ctx.isPointInPath(btnEasy.path2D, coords.x, coords.y) && btnEasy        ||
           ctx.isPointInPath(btnNormal.path2D, coords.x, coords.y) && btnNormal    ||
           ctx.isPointInPath(btnDifficult.path2D, coords.x, coords.y) && btnDifficult;
}
export {check}