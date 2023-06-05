function play(audio){
      if(!audio.ended){ 
        audio.currentTime = 0;
      }  
      audio.play();
}
function stop(){
    
}
export {play, stop}