const birdElem = document.querySelector('[data-bird]')
const BIRD_SPEED = 0.5
const JUMP_DURATION = 125 // how many ms our jump is going to last
let timeSinceLastJump = 300

export function setupBird(){ //put bird in the middle of screen
    setTop(window.innerHeight / 2)
    //document.removeEventListener("keydown", handleJump)
    document.addEventListener("keydown", handleJump)
}
export function updateBird(delta){// use delta to make it user's frame rate dependent
    // console.log(getTop())

    if(timeSinceLastJump < JUMP_DURATION) { //when we jump dont go down for JUMP_DURATION time
        setTop(getTop() - BIRD_SPEED * delta) // jump
        console.log(timeSinceLastJump + " " + "JUMP")
    }else{
        setTop(getTop() + BIRD_SPEED * delta) // go down
        console.log(timeSinceLastJump + " " + "DOOOWN")
    }
    timeSinceLastJump += delta
}

function setTop(top){ // set bird position
    birdElem.style.setProperty("--bird-top", top)
}

function getTop(){
    return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))
}

function handleJump(e){
    if(e.code !== "Space") return

    timeSinceLastJump = 0
}