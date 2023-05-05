const promise = function(obj){
    return Object.values(obj).map((img, ind, arr)=>{ 
        return new Promise(function(resolve, reject){
            let image = new Image();
            image.src = img;

            image.addEventListener('load', function(){
                resolve(image);
            });
            image.addEventListener('error', function(){
                reject(new Error('Image cant be load'));
            });
        });
    });
}
export {promise};