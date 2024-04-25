let gameSeq = [];
let userSeq = [];
let scores = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    // console.log("game started");
    started = true;

    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;

  h2.innerText = `Level ${level}`;

  //choose random button
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function checkAns(idx) {
  // console.log("current level: ", level);

  if (userSeq[idx] == gameSeq[idx]) {
    // console.log("same value");
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    let msg = "";
    scores.push(level);
    // console.log(scores);
    let highScore = checkHighest();
    // console.log(highScore);
    if (highScore === level) {
      msg = "Congratulations! You got Highest Score!";
    } else {
      msg = `Highest Score is ${highScore}`;
    }
    h2.innerHTML = `Game over! Your score is <b>${level}</b>.<br/>Press any key to start<br/>${msg}`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  if (started == true) {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userColor);

    checkAns(userSeq.length - 1);
  }
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function checkHighest() {
  let max = 0;
  for (score of scores) {
    if (score > max) {
      max = score;
    }
  }
  return max;
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
