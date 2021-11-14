import { updateBird, setupBird } from "./bird.js";

document.addEventListener("keypress", handleStart, {once: true})
const title = document.querySelector("[data-title]")

let lastTime
function updateLoop(time){
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime //time between animation frames
    updateBird(delta)
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}


function handleStart(){ //start the game
    title.classList.add("hide")
    setupBird()
    window.requestAnimationFrame(updateLoop)
}

function handleLose(){ // stop the game

}

