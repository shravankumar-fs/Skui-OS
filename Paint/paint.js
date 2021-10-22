import { dragElement } from "../util/draggable.js";
import { buildToolBar } from "../util/ToolBar.js";
const arena = document.getElementById("arena");
const paint = document.getElementById("paint");
let ctx;
let size = 5;
let isPressed = false;
let color;
let x;
let y;

paint.addEventListener("click", () => {
  const paintWindow = document.createElement("div");
  paintWindow.classList.add("paintWindow");
  paintWindow.id = "paintWindow";
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  canvas.height = "300";
  canvas.width = "450";
  canvas.classList.add("paintCanvas");

  const paintToolBar = buildToolBar(
    paintWindow,
    "paintToolBar",
    "paintToolBar",
    "Paint"
  );
  const paintToolBox = document.createElement("div");
  paintToolBox.classList.add("paintToolBox");
  const dec = document.createElement("button");
  dec.classList.add("paintButton");
  dec.id = "decrease";
  dec.innerHTML = "-";
  const inc = document.createElement("button");
  inc.classList.add("paintButton");
  inc.id = "increase";
  inc.innerHTML = "+";

  const sizeEl = document.createElement("span");
  sizeEl.innerHTML = size;

  const colorEl = document.createElement("input");
  colorEl.type = "color";
  colorEl.id = "color";
  const clear = document.createElement("button");
  clear.classList.add("paintButton");
  clear.id = "clear";
  clear.innerHTML = "X";

  inc.addEventListener("click", () => {
    size += 1;
    if (size > 20) size = 20;
    updateSizeOnScreen(sizeEl);
  });

  dec.addEventListener("click", () => {
    size -= 2;
    if (size < 1) size = 1;
    updateSizeOnScreen(sizeEl);
  });

  paintToolBox.appendChild(dec);
  paintToolBox.appendChild(sizeEl);
  paintToolBox.appendChild(inc);
  paintToolBox.appendChild(colorEl);
  paintToolBox.appendChild(clear);
  ctx = canvas.getContext("2d");
  paintWindow.appendChild(paintToolBar);
  paintWindow.appendChild(canvas);
  paintWindow.appendChild(paintToolBox);

  arena.appendChild(paintWindow);
  initCanvas(canvas);
  colorEl.addEventListener("change", (e) => {
    color = e.target.value;
  });

  clear.addEventListener("click", () =>
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  );
  dragElement(
    document.getElementById("paintWindow"),
    document.getElementById("paintToolBar")
  );
});

function initCanvas(canvas) {
  canvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
  });

  document.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
      const x2 = e.offsetX;
      const y2 = e.offsetY;

      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);

      x = x2;
      y = y2;
    }
  });
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = getColor();
  ctx.fill();
}
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = getColor();
  ctx.lineWidth = size * 2;
  ctx.stroke();
}
function getColor() {
  return color;
}
function updateSizeOnScreen(sizeEL) {
  sizeEL.innerText = size;
}
