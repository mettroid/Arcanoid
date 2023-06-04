function play(elem, name){
    elem.dispatchEvent(new CustomEvent('soundEvent', {
        detail: { name: name }
    }));
}
function stop(){

}
export {play, stop}