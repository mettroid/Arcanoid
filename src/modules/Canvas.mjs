class Canvas {
    constructor(id, parent){
        this.id = id;
        this.parent = parent;
        this.width = parent.clientWidth;
        this.height = parent.clientHeight;
        this.ctx = null;
    }
    create(){
        if(this.ctx !== null){
            throw new Error('Canvas already created');
        } 
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.parent.insertAdjacentElement('beforeEnd', canvas);
        this.elem = canvas;
        this.ctx = canvas.getContext('2d');
    }
}
export {Canvas};