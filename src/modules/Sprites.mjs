const cut = function(img){
    return [
        createImageBitmap(img, 0, 0, 82, 80),
        createImageBitmap(img, 0, 80, 87, 132)
    ];   
    
}
export {cut} 