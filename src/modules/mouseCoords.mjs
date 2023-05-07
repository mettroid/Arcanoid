const get = function(event, canvas){
        let coords = canvas.getBoundingClientRect();
        return {
            x: event.pageX - (coords.x + window.pageXOffset),
            y: event.pageY - (coords.y + window.pageYOffset) 
        }
}
export {get}