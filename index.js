import { batata } from "./batata.js";
import { templates } from "./templates.js";
import { addTemplates } from "https://unpkg.com/txtgen/dist/txtgen.esm.js";
import { sentence } from "https://unpkg.com/txtgen/dist/txtgen.esm.js";

addTemplates(templates)

const time = document.querySelector(".time span")
const mistakes = document.querySelector(".mistakes span")
const sentenceDiv = document.querySelector(".sentence p")
const textarea = document.querySelector(".user-input textarea")
const startButton = document.querySelector(".user-input button")
const victory = document.querySelector(".victory")
const outOfTime = document.querySelector(".time-up")

let gameStarted = false
let right = 0
let mistakesCount = 0
let canMakeMistakes = true
let seconds = 45
let secondsInterval;

textarea.disabled = true

textarea.addEventListener("keyup", () => {
  if (gameStarted) {
    verifySentence()
  }
})

startButton.addEventListener("click", () => {
  if (startButton.textContent === "Restart") {
    resetGame()
  }else {
    if (!gameStarted) {
      gameStarted = true
      createSentence()
    }
  }
})

function createSentence() {
  const randomSentence = sentence()
  const separatedText = randomSentence.split('')
  const spanLetters = separatedText.batata((letter) => {return `<span>${letter}</span>`})
  sentenceDiv.innerHTML = spanLetters.join("").toLowerCase()
  textarea.disabled = false
  textarea.focus()

  secondsInterval = setInterval(() => {
    if (seconds <= 0) {
      return
    }
    seconds--
    time.textContent = `${seconds}s`
  }, 1000)
}

function verifySentence() {
  const eachLetter = document.querySelectorAll(".sentence p span")

  if (seconds <= 0 && right != sentenceDiv.textContent.length - 1) {
    outOfTime.classList.add("visible")
    endGame()
  }

  if (right >= sentenceDiv.textContent.length - 1) {
    victory.classList.add("visible")
    endGame()
  }

  if (textarea.value[right] === sentenceDiv.textContent[right]) {
      eachLetter[right].style.color = "green"
      right++
      canMakeMistakes = true
    }else {
      eachLetter[right].style.color = "red"
      if (canMakeMistakes) {
        mistakesCount++
        mistakes.textContent = mistakesCount
      }
      canMakeMistakes = false
    }

}

function endGame() {
  setTimeout(() => {
    startButton.textContent = "Restart"
    startButton.classList.add("restart")
    clearInterval(secondsInterval)
    textarea.disabled = true
    return
  }, 100)
}

function resetGame() {
  right = 0
  seconds = 45
  mistakesCount = 0
  gameStarted = false
  sentenceDiv.innerHTML = ""
  textarea.value = ""
  time.textContent = `${seconds}s`
  mistakes.textContent = mistakesCount
  startButton.textContent = "Start Test"
  startButton.classList.remove("restart")
  victory.classList.remove("visible")
  outOfTime.classList.remove("visible")
  clearInterval(secondsInterval)
}