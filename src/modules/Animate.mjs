import {has, isPlainObject} from 'lodash';
class Animate {
    correction;
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
    updateCorrection(correction){
        this.correction = correction;
    }
    getFps(){
        //return this.FPS;
    }
    getClosureFn(obj){
          let self = this;
          let index = 0;
          let basic = obj.subObj;           //оригинальный изменяемый объект
          let curr = obj.changes[index];    //перебираемый массив анимации
          let currNorm = setDiff(basic, curr);
          let sleepping = false;
        
          return function animate(){
            if(sleepping) return;
            if(!currNorm){
                setTimeout(()=>{
                    sleepping = false;
                    return switch_curr();
                }, curr[0].sleep);
                sleepping = true;
                return;
            }

            for(let objSettings of currNorm){
                if(objSettings.switchOff) continue; 
                let newValue = basic[objSettings.prop] + objSettings.diff * (self.correction / objSettings.ms);
                if(objSettings.diff > 0 && newValue > objSettings.to || objSettings.diff < 0 && newValue < objSettings.to){
                    newValue = objSettings.to;
                    objSettings.switchOff = true;
                }
                basic[objSettings.prop] = newValue;
            }
            if(currNorm.every((objSettings, ind, arr)=>objSettings.switchOff)){
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
             currNorm = (curr[0].sleep)? null : setDiff(basic, curr); 
          }
          function setDiff(basic, curr){
            let from;
            for(let objSettings of curr){
                from = basic[objSettings.prop];
                objSettings.diff = objSettings.to - from;
            }
            return curr;
        }
    }
}
export {Animate};