import { dragElement } from "../../util/draggable.js";
import { buildToolBar } from "../../util/ToolBar.js";

const minesweeper = document.getElementById("minesweeper");
const arena = document.getElementById("arena");
let title = "MineSweeper";
minesweeper.addEventListener("click", () => {
  initMineSweeperBoard();
});

let mines;
let timerInterval;

function initMineSweeperBoard() {
  mines = [];
  timerInterval = undefined;
  arena.appendChild(generateBoard());
  fillBlocks();
  mineRandomBlocks();
  initTimer();
  dragElement(
    document.getElementById("mineWindow"),
    document.getElementById("mineToolbar")
  );
}
function generateBoard() {
  const mineWindow = generateMineWindow();

  mineWindow.appendChild(generateMineToolbar(mineWindow));
  mineWindow.appendChild(generateMineTimer());
  mineWindow.appendChild(generateMineContainer());

  return mineWindow;
}
function generateMineWindow() {
  const mineWindow = document.createElement("div");
  mineWindow.id = "mineWindow";
  mineWindow.classList.add("mineWindow");
  return mineWindow;
}
function generateMineToolbar(mineWindow) {
  return buildToolBar(mineWindow, "mineToolbar", "mineToolbar", title);
}
function generateMineTimer() {
  const mineTimer = document.createElement("div");
  mineTimer.id = "mineTimer";
  mineTimer.classList.add("mineTimer");
  return mineTimer;
}
function generateMineContainer() {
  const mineContainer = document.createElement("div");
  mineContainer.id = "mineContainer";
  mineContainer.classList.add("mineContainer");
  return mineContainer;
}
function initTimer() {
  const mineTimer = document.getElementById("mineTimer");

  let sec = 0;
  let min = 0;
  timerInterval = setInterval(() => {
    sec++;
    if (sec > 59) {
      sec = 0;
      min++;
    }
    mineTimer.innerHTML = `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}
function fillBlocks() {
  const container = document.getElementById("mineContainer");
  for (let i = 0; i < 64; i++) {
    const el = document.createElement("div");
    el.classList.add("brick");
    container.appendChild(el);
    el.classList.add("cover");
    mines.push(el);
    el.addEventListener("click", () => {
      let clickAd = document.getElementById("click");
      clickAd.play();
      el.classList.remove("cover");
      verifyIfBomb(el);
      reveal(i);
      checkGameWin();
    });
  }
}
function checkGameWin() {
  let won = true;
  for (let i = 0; i < 64; i++) {
    let classes = mines[i].classList;
    if (classes.contains("brick") || classes.contains("neighbour")) {
      if (classes.contains("cover")) won = false;
    }
  }
  if (won) {
    let winAd = document.getElementById("victory");
    winAd.play();
    setTimeout(() => {
      winAd.pause();
      winAd.currentTime = 0;

      let container = document.getElementById("mineContainer");
      let it = document.createElement("div");
      it.innerHTML = `<div>You Won!</div>
          <button class="retryMS" id="retryMS"><i class="fas fa-redo"></i></button>
      `;
      container.appendChild(it);
      clearInterval(timerInterval);
      it.classList = ["gameOver"];
      document.getElementById("retryMS").addEventListener("click", () => {
        document.getElementById("mineWindow").remove();
        initMineSweeperBoard();
      });
    }, 1000);
  }
}
function verifyIfBomb(el) {
  if (el.classList.contains("bomb")) {
    let bombAd = document.getElementById("bomb");
    bombAd.play();
    setTimeout(() => {
      bombAd.pause();
      bombAd.currentTime = 0;
      let container = document.getElementById("mineContainer");
      let it = document.createElement("div");
      it.innerHTML = `<div>Game Over</div>
        <button class="retry" id="retry"><i class="fas fa-redo"></i></button>
        `;
      container.appendChild(it);
      clearInterval(timerInterval);
      it.classList = ["gameOver"];
      document.getElementById("retry").addEventListener("click", () => {
        document.getElementById("mineWindow").remove();
        initMineSweeperBoard();
      });
    }, 800);
    el.style.borderRadius = "50%";
    el.style.animation = `bombanimate 0.8s ease-in-out`;
  }
}
function mineRandomBlocks() {
  for (let i = 0; i < 64; i++) {
    if (Math.random() < 0.2) {
      mines[i].innerHTML = `<i class="fas fa-bomb"></i>`;
      mines[i].classList = ["bomb"];
      mines[i].classList.add("cover");
      incrementSurrounding(i);
    }
  }
}

function incrementSurrounding(num) {
  let neighbours = getNeighbours(num);
  neighbours.forEach((i) => {
    if (mines[i].innerHTML == "") {
      mines[i].innerHTML = "1";
      mines[i].classList = ["neighbour"];
      mines[i].classList.add("cover");
    } else if (mines[i].innerHTML == `<i class="fas fa-bomb"></i>`) {
      //do nothing
    } else {
      let val = +mines[i].innerHTML + 1;
      mines[i].innerHTML = val;
      if (!mines[i].classList.contains("neighbour")) {
        mines[i].classList = ["neighbour"];
        mines[i].classList.add("cover");
      }
    }
  });
}
function getNeighbours(num) {
  let neighbours = [
    num - 1,
    num + 1,
    num - 8,
    num + 8,
    num - 7,
    num + 7,
    num - 9,
    num + 9,
  ];
  neighbours = neighbours.filter((i) => i > -1 && i < 64);
  if (num % 8 == 0) {
    neighbours = neighbours.filter((i) => i % 8 != 7);
  } else if (num % 8 == 7) {
    neighbours = neighbours.filter((i) => i % 8 != 0);
  }
  return neighbours;
}

function reveal(i) {
  if (mines[i].innerHTML == "") {
    mines[i].innerHTML = `&nbsp;`;
    revealSurrounding(i);
  }
}
function revealSurrounding(i) {
  let neighbours = getNeighbours(i);
  let flag = true;
  neighbours.forEach((n) => {
    if (mines[n].innerHTML == "") {
      flag = false;
    }
  });
  if (flag) return;
  neighbours.forEach((n) => {
    if (mines[n].innerHTML == "") {
      mines[n].innerHTML = `&nbsp;`;
      mines[n].classList.remove("cover");
      revealSurrounding(n);
    }
  });
}
