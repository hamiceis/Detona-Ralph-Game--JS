const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.getElementById("time-left"),
    score: document.querySelector("#score"),
    live: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: 3
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimeId: setInterval(countDown, 1000),
  }
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime 

  if(state.values.currentTime <= 0 || state.values.lives <= 0) {
    clearInterval(state.actions.countDownTimeId)
    clearInterval(state.actions.timerId)
    alert("Game Over! o seu resultado foi: " + state.values.result)
  }
}

function playSound() {
  let audio = new Audio("./src/audios/kkkk.mp3")
  audio.play()
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
  })

  let randomNumber = Math.floor(Math.random() * 9)
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemy")
  state.values.hitPosition = randomSquare.id
}


function addListenerHitBox() {
  state.view.squares.forEach(square => {
    square.addEventListener("mousedown", () => {
      if(square.id === state.values.hitPosition){
        state.values.result ++ 
        state.view.score.textContent = state.values.result
        state.values.hitPosition = null
        playSound()
      }
      if(!square.className.includes("enemy")) {
        state.values.lives--
        state.view.live.textContent = `x${state.values.lives}`
      }
    })
  })
}

function init() {
  addListenerHitBox()
}


init()