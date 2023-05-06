import { Button } from "./Button.mjs";
class ButtonsCollections {
    constructor(){
        this.collection = [];
    }
    add(button){
        if(button instanceof Button){
          this.collection.push(button);  
        }
    }
    get(){
        return this.collection;
    }
}
export {ButtonsCollections};