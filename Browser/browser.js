import { dragElement } from "../util/draggable.js";
import { buildToolBar } from "../util/ToolBar.js";
const browser = document.getElementById("browser");
const arena = document.getElementById("arena");

/**Browser */

browser.addEventListener("click", () => {
  if (!document.getElementById("browserWindow")) {
    const browserWindow = document.createElement("div");
    browserWindow.classList.add("browserWindow");
    browserWindow.id = "browserWindow";
    const browserToolBar = buildToolBar(
      browserWindow,
      "bToolbar",
      "bToolbar",
      "Internet Browser"
    );

    const frame = document.createElement("iframe");
    frame.classList.add("browser");
    frame.src = "https://www.bing.com";
    browserWindow.appendChild(browserToolBar);
    browserWindow.appendChild(frame);
    arena.appendChild(browserWindow);

    dragElement(
      document.getElementById("browserWindow"),
      document.getElementById("bToolbar")
    );
  }
});
