import {has} from 'lodash';
class Animate {
    constructor(){
        this.list = {};
    }
    addObj(obj){
        this.list[obj.subObj.name] = this.getClosureFn(obj);
    }
    getList(){
        return this.list;
    }
    hasObj(obj){
        return has(this.getList(), obj.name); // есть ли у объекта такой ключ
    }
    getClosureFn(obj){
          let self = this;
          let index = 0;
          let basic = obj.subObj;           //оригинальный изменяемый объект
          let curr = obj.changes[index];    //перебираемый объект анимации
          let step = getStep(basic, curr);
          let sleepping = false;

          return function animate(){
            if(sleepping) return;
            if(!step){
                setTimeout(()=>{
                    sleepping = false;
                    return switch_curr();
                }, curr.sleep);
                sleepping = true;
            }

            let end_reacher = null;
            let newValue = basic[curr.prop] + step;
            if(step < 0 && newValue < curr.to || step > 0 && newValue > curr.to){
                newValue = curr.to;
                end_reacher = true;
            }
            basic[curr.prop] = newValue;
            if(end_reacher){
                return switch_curr();
            }

          }
          function switch_curr(){
             index++;
             curr = obj.changes[index];
             if(!curr){
                delete self.list[obj.subObj.name];
                return;
             }
             step = curr.sleep? null : getStep(basic, curr); 
          }
          function getStep(basic, curr){
            let from = basic[curr.prop];
            return (curr.to - from) / (60 * curr.ms / 1000);
        }
    }
}
export {Animate};