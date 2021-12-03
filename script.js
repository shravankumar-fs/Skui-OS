import { openBackgroundDialog } from "./util/BackgroundPicChanger.js";

const timer = document.getElementById("timer");
const arena = document.getElementById("arena");
/** Clock */
setInterval(() => {
  let date = new Date();
  let append = date.getHours() > 11 ? "PM" : "AM";
  let h = date.getHours() % 12;
  if (h == 0) h = 12;
  let m = date.getMinutes().toString().padStart(2, "0");
  timer.innerHTML = `<i class="far fa-clock"></i>&nbsp;&nbsp;${h}:${m}&nbsp;${append}&nbsp;&nbsp;&nbsp;&nbsp;${date.toDateString()}&nbsp;&nbsp;`;
}, 1000);
window.oncontextmenu = function () {
  return false;
};
arena.oncontextmenu = function (e) {
  let children = arena.children;
  for (let i = 0; i < children.length; i++) {
    children[i].oncontextmenu = function () {
      return false;
    };
  }
  showCustomMenu(e);
  return false;
};
class RClickMenu {
  constructor(e) {
    const menu = document.createElement("div");
    menu.id = "RClickMenu";
    menu.classList.add("RClickMenu");
    menu.style.top = e.clientY + "px";
    menu.style.left = e.clientX + "px";
    menu.style.position = "absolute";
    const op1 = document.createElement("div");
    const op2 = document.createElement("div");
    const op3 = document.createElement("div");
    op1.classList.add("mOption");
    op2.classList.add("mOption");
    op3.classList.add("mOption");
    op1.innerHTML = "Refresh";
    op2.innerHTML = "Sort Icons";
    op3.innerHTML = "Change Background";
    op1.id = "refresh";
    op2.id = "t2";
    op3.id = "changeBackgroundPic";

    menu.appendChild(op1);
    menu.appendChild(op2);
    menu.appendChild(op3);
    this.item = menu;
    arena.appendChild(menu);
    setInterval(() => {
      menu.remove();
    }, 3000);

    op1.addEventListener("click", (e) => {
      clearRightMenu();
      const icon = document.createElement("div");
      icon.innerHTML = `<i class="fas fa-hourglass-end"></i>`;
      icon.classList.add("bottle");
      icon.style.top = e.clientY + "px";
      icon.style.left = e.clientX + "px";
      console.log(e);
      icon.style.animation = "bottle-rotate 0.6s ease-out";
      arena.appendChild(icon);
      setTimeout(() => {
        icon.remove();
      }, 600);
    });
    op2.addEventListener("click", () => {
      clearRightMenu();
    });
    op3.addEventListener("click", () => {
      if (document.getElementById("bckPicChanger"))
        document.getElementById("bckPicChanger").remove();
      openBackgroundDialog();
      clearRightMenu();
    });
  }
}

let showCustomMenu = function (e) {
  clearRightMenu();
  new RClickMenu(e);
};
let clearRightMenu = function () {
  if (document.getElementById("RClickMenu"))
    document.getElementById("RClickMenu").remove();
};
