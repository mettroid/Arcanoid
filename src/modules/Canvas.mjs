class Canvas {
    constructor(id, parent){
        this.id = id;
        this.parent = parent;
    }
    create(width, height, hidden, zIndex){
        let canvas = document.createElement('canvas');
        canvas.width = this.parent.clientWidth * width;
        canvas.height = this.parent.clientHeight * height;
        canvas.hidden = hidden; 
        canvas.style.position = 'absolute';
        canvas.style.zIndex = zIndex; 
        this.parent.insertAdjacentElement('beforeEnd', canvas);
        this.elem = canvas;
        this.ctx = canvas.getContext('2d');
    }
}
export {Canvas};