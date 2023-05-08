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
          let curr = obj.changes[index];    //перебираемый массив анимации
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
                return;
            }

            let end_reacher = null;
            for(let objSettings of step){
                let newValue = basic[objSettings.prop] + objSettings.step;
                if(objSettings.step > 0 && newValue > objSettings.to || objSettings.step < 0 && newValue < objSettings.to){
                    newValue = objSettings.to;
                    end_reacher = true;
                }
                basic[objSettings.prop] = newValue;
            }
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
             step = curr[0].sleep? null : getStep(basic, curr); 
          }
          function getStep(basic, curr){
            for(let objSettings of curr){
                let from = basic[objSettings.prop];
            
                let diff = objSettings.to - from;
                objSettings.step = diff / (60 * objSettings.ms  / 1000);
            }
            return curr;
        }
    }
}
export {Animate};