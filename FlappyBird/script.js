import { updateBird, setupBird, getBirdRect } from "./bird.js";

document.addEventListener("keypress", handleStart, {once: true})
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")


let lastTime
function updateLoop(time){
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime //time between animation frames
    updateBird(delta)
    console.log("time:" + time)
    console.log("LASTtime:" + lastTime)
    console.log("delta: " + delta)

    if(checkLose() == true) return handleLose();
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function checkLose(){
    const birdRect = getBirdRect();
    if(birdRect.top < 0 || birdRect.bottom > window.innerHeight) return true
    return false
}

function handleStart(){ //start the game
    title.classList.add("hide")
    setupBird()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

function handleLose(){ // stop the game
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    document.addEventListener("keypress", handleStart, {once: true})
}

