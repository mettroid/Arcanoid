class Canvas {
    constructor(id, parent){     
        let canvas = document.createElement('canvas');
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        parent.insertAdjacentElement('beforeEnd', canvas); 
        this.id = id; 
        this.elem = canvas;
        this.ctx = canvas.getContext('2d');
    }
}
export {Canvas};