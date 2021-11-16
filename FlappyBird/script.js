import { updateBird, setupBird, getBirdRect } from "./bird.js"
import {
    updatePipes,
    setupPipes,
    getPassedPipesCount,
    getPipeRects,
} from "./pipe.js"

document.addEventListener("keypress", handleStart, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")
const allscores = document.querySelector("[data-scores]")

let interval
let lastTime
let timings = []
function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
    const delta = time - lastTime
    updateBird(delta)
    updatePipes(delta)
    // console.log(lastTime)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoop)
}

function checkLose() {
    const birdRect = getBirdRect()
    const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function handleStart() {
 interval = window.performance.now();
    title.classList.add("hide")
    setupBird()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame(updateLoop)
}

function handleLose() {
    var end = window.performance.now();
    var dur = end - interval;
    var sec = Number(((dur/1000) % 60).toFixed(2));
    timings.push(sec)
    console.warn(timings)
    setTimeout(() => {
        title.classList.remove("hide")
        subtitle.classList.remove("hide")
        subtitle.textContent = `${getPassedPipesCount()} Pipes, your timing: ${ sec }`
        allscores.textContent =`All scores: ${ timings } seconds`
        document.addEventListener("keypress", handleStart, { once: true })
    }, 100)
}