const birdElem = document.querySelector('[data-bird]')
const BIRD_SPEED = 0.5


export function updateBird(delta){
    console.log(getTop())
    setTop(getTop() + BIRD_SPEED * delta) // use delta to make it user's frame rate dependent
}

function setTop(top){
    birdElem.style.setProperty("--bird-top", top)
}

function getTop(){
    return parseFloat(getComputedStyle(birdElem).getPropertyValue("--bird-top"))
}