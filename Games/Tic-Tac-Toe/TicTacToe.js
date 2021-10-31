import { dragElement } from "../../util/draggable.js";
import { buildToolBar } from "../../util/ToolBar.js";

const arena = document.getElementById("arena");
const game2048 = document.getElementById("tictactoe");
let title = "Tic Tac Toe";

const createWindow = () => {
  const window = document.createElement("div");
  window.id = "TicTacToeWindow";
  window.classList.add("TicTacToeWindow");

  const toolbar = buildToolBar(
    window,
    "TicTacToeToolbar",
    "TicTacToeToolbar",
    title
  );
  window.appendChild(toolbar);
  arena.appendChild(window);
  dragElement(window, toolbar);
  return window;
};

const createContainer = () => {
  const container = document.createElement("div");
  container.id = "TicTacToeContainer";
  container.classList.add("TicTacToeContainer");
  return container;
};

const checkIfDraw = () => {
  let draw = true;
  for (let i = 0; i < 9; i++) {
    if (
      document.getElementById("TicTacToeContainer").children[i].innerHTML == ""
    ) {
      draw = false;
    }
  }
  return draw;
};

const targetValue = (nodes, set, i) => {
  return nodes[set[i]].innerHTML;
};

const checkWhoWon = () => {
  if (checkIfDraw()) {
    return "Match Draw!";
  }
  let sets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const allChildren = document.getElementById("TicTacToeContainer").children;
  for (let index = 0; index < sets.length; index++) {
    let set = sets[index];
    if (
      targetValue(allChildren, set, 0) == targetValue(allChildren, set, 1) &&
      targetValue(allChildren, set, 0) == targetValue(allChildren, set, 2) &&
      targetValue(allChildren, set, 0) != ""
    ) {
      if (targetValue(allChildren, set, 0) == "X") {
        return "You Won!";
      } else {
        return "You Lost!";
      }
    }
  }

  return "Progress";
};
const invokePCMarkit = () => {
  const allSquares = document.getElementById("TicTacToeContainer").children;
  let unmarked = [];
  for (let i = 0; i < allSquares.length; i++) {
    if (allSquares[i].classList.contains("squareTTT")) {
      unmarked.push(allSquares[i]);
    }
  }
  let selected = Math.floor(Math.random() * unmarked.length);
  const target = unmarked[selected];
  target.classList.remove("squareTTT");
  target.classList.add("squareTTTMarkedPC");
  target.innerHTML = "O";
  return checkWhoWon();
};
const markIt = (square) => {
  square.innerHTML = "X";
  square.classList.remove("squareTTT");
  square.classList.add("squareTTTMarked");
  return checkWhoWon();
};
const declareResult = (resultString) => {
  document.querySelector(".center").remove();
  const resOverLay = document.createElement("div");
  resOverLay.classList.add("result");
  resOverLay.innerHTML = `<div>${resultString}</div>
  <button class="retryTTT" id="retryTTT"><i class="fas fa-redo"></i></button>`;
  document.getElementById("TicTacToeWindow").appendChild(resOverLay);
  document.getElementById("retryTTT").addEventListener("click", () => {
    document.getElementById("TicTacToeWindow").remove();
    createTicTacToe();
  });
};
const fillContainer = () => {
  const container = document.getElementById("TicTacToeContainer");
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.classList.add("squareTTT");
    container.appendChild(square);
    square.addEventListener("click", () => {
      if (square.classList.contains("squareTTT")) {
        let clickAd = document.getElementById("click");
        clickAd.play();
        let result = markIt(square);
        if (result != "Progress") {
          declareResult(result);
        } else {
          result = invokePCMarkit();
          if (result != "Progress") {
            declareResult(result);
          }
        }
      }
    });
  }
};
function createTicTacToe() {
  const window = createWindow();
  // const stats = createStats();
  const container = createContainer();
  // window.appendChild(stats);
  window.appendChild(container);
  const center = document.createElement("div");
  center.classList.add("center");
  window.appendChild(center);
  fillContainer();
}

document.getElementById("tictactoe").addEventListener("click", () => {
  if (!document.getElementById("TicTacToeWindow")) createTicTacToe();
});
