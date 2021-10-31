import { dragElement } from "./draggable.js";
import { buildToolBar } from "./ToolBar.js";

let images = [
  "https://images.unsplash.com/photo-1634492599187-b89b0dfd1e50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1634499857029-2ba324a4e1ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1634129366530-61d3e56a84fb?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIyMnxDRHd1d1hKQWJFd3x8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1634824987562-a7c6537bd892?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1634492597965-701e867bb733?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1932&q=80",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
];
let selectedImg;
export function openBackgroundDialog() {
  let title = "Choose Background Picture";
  let prefix = "bckPicChanger";
  const bckImageBox = document.createElement("div");
  bckImageBox.id = prefix;
  bckImageBox.classList.add(prefix);

  const mainbox = document.createElement("div");
  mainbox.id = prefix + "-main";
  mainbox.classList.add(prefix + "-main");

  const galleryBox = document.createElement("div");

  galleryBox.id = prefix + "-gallery";
  galleryBox.classList.add(prefix + "-gallery");

  const prevBox = document.createElement("div");
  prevBox.id = prefix + "-preview";
  prevBox.classList.add(prefix + "-preview");

  const subtoolbar = document.createElement("div");
  subtoolbar.id = prefix + "-subtoolbar";
  subtoolbar.classList.add(prefix + "-subtoolbar");

  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.id = prefix + "-cancel";
  cancelBtn.classList.add(prefix + "-cancel");

  const chooseBtn = document.createElement("button");
  chooseBtn.innerText = "Choose";
  chooseBtn.id = prefix + "-choose";
  chooseBtn.classList.add(prefix + "-choose");

  images.forEach((img) => {
    let imgItem = document.createElement("div");
    imgItem.style.background = `url(${img})`;
    imgItem.classList.add(prefix + "-gallery-img");
    imgItem.style.backgroundSize = "cover";
    galleryBox.appendChild(imgItem);
    imgItem.addEventListener("click", () => {
      if (!selectedImg) {
        selectedImg = img;
        if (document.getElementById(prefix + "-prevIMGID"))
          document.getElementById(prefix + "-prevIMGID").remove();
        clearOtherImgStyles();
        imgItem.style.border = "2px solid black";
        const previewImg = document.createElement("div");
        previewImg.id = prefix + "-prevIMGID";
        previewImg.style.backgroundImage = `url(${img})`;
        previewImg.style.backgroundSize = "cover";
        previewImg.style.backgroundPosition = "center";
        prevBox.appendChild(previewImg);
      } else {
        if (document.getElementById(prefix + "-prevIMGID"))
          document.getElementById(prefix + "-prevIMGID").remove();
        selectedImg = undefined;
        imgItem.style.border = "";
        clearOtherImgStyles();
      }
    });
  });

  const toolbar = buildToolBar(
    bckImageBox,
    prefix + "-toolbar",
    prefix + "-toolbar",
    title
  );

  /**Appending boxes */
  mainbox.appendChild(galleryBox);
  mainbox.appendChild(prevBox);

  // subtoolbar.appendChild(cancelBtn);
  subtoolbar.appendChild(chooseBtn);

  bckImageBox.appendChild(toolbar);
  bckImageBox.appendChild(mainbox);
  bckImageBox.appendChild(subtoolbar);

  arena.appendChild(bckImageBox);

  cancelBtn.addEventListener("click", () => {
    selectedImg = undefined;
    bckImageBox.remove();
  });
  chooseBtn.addEventListener("click", () => {
    if (selectedImg) {
      const contr = document.getElementById("container");
      contr.style.backgroundImage = `url(${selectedImg})`;
      bckImageBox.remove();
    }
  });

  dragElement(
    document.getElementById(prefix),
    document.getElementById(prefix + "-toolbar")
  );
}

let clearOtherImgStyles = function () {
  let arr = document.querySelectorAll(".bckPicChanger-gallery-img");
  arr.forEach((item) => {
    item.style.border = "";
  });
};
