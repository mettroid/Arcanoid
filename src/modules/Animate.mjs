import {has, isPlainObject} from 'lodash';
class Animate {
    FPS;
    constructor(FPS){
        this.FPS = FPS;
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
    updateFps(FPS){
        this.FPS = FPS;
    }
    getFps(){
        return this.FPS;
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
                }, curr[0].sleep);
                sleepping = true;
                return;
            }

            for(let objSettings of step){
                if(objSettings.switchOff) continue; 
                let newValue = basic[objSettings.prop] + objSettings.step;
                if(objSettings.step > 0 && newValue > objSettings.to || objSettings.step < 0 && newValue < objSettings.to){
                    newValue = objSettings.to;
                    objSettings.switchOff = true;
                }
                basic[objSettings.prop] = newValue;
            }
            if(step.every((objSettings, ind, arr)=>objSettings.switchOff)){
                return switch_curr();
            };

          }
          function switch_curr(){
             index++;
             curr = obj.changes[index];
             if(!curr){
                delete self.list[obj.subObj.name];
                return;
             }
             step = (curr[0].sleep)? null : getStep(basic, curr); 
          }
          function getStep(basic, curr){
            for(let objSettings of curr){
                let from = basic[objSettings.prop];
            
                let diff = objSettings.to - from;
                objSettings.step = diff / (self.FPS * objSettings.ms  / 1000);
                objSettings.switchOff = false;
            }
            return curr;
        }
    }
}
export {Animate};