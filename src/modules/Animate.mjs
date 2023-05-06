class Animate {
    list = {};
    add(obj){
        this.list[obj.name] = getClosureFn(obj);
    }
    del(){
        
    }
}