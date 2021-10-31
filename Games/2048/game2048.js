import { dragElement } from "../../util/draggable.js";
import { buildToolBar } from "../../util/ToolBar.js";

const arena = document.getElementById("arena");
const game2048 = document.getElementById("game2048");
let title = "2048";

const createWindow = () => {
  const window = document.createElement("div");
  window.id = "g2048Window";
  window.classList.add("g2048Window");

  const toolbar = buildToolBar(window, "g2048Toolbar", "g2048Toolbar", title);
  window.appendChild(toolbar);
  arena.appendChild(window);
  dragElement(window, toolbar);
  return window;
};

const createStats = () => {
  const stats = document.createElement("div");
  stats.id = "g2048Stats";
  stats.classList.add("g2048Stats");
  return stats;
};
const createContainer = () => {
  const container = document.createElement("div");
  container.id = "g2048Container";
  container.classList.add("g2048Container");
  return container;
};
const create2048 = () => {
  const window = createWindow();
  const stats = createStats();
  const container = createContainer();
  window.appendChild(stats);
  window.appendChild(container);
};

document.getElementById("timer").addEventListener("click", create2048);
