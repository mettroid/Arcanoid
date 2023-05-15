import {has, isPlainObject} from 'lodash';
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

            if(isPlainObject(step)){
                basic[step.prop] = -basic[step.prop];
                //console.log(basic[step.prop]);
                return switch_curr();
            }

            let end_reacher = null;
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
                end_reacher = true;
            };
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
             step = (curr[0].sleep)? null : 
                    (curr[0].prop === 'dx' || curr[0].prop === 'dy')? curr[0] : //если свойство у нас инвертируемое то вернём объект с ним
                    getStep(basic, curr); 
          }
          function getStep(basic, curr){
            for(let objSettings of curr){
                let from = basic[objSettings.prop];
            
                let diff = objSettings.to - from;
                objSettings.step = diff / (60 * objSettings.ms  / 1000);
                objSettings.switchOff = false;
            }
            return curr;
        }
    }
}
export {Animate};