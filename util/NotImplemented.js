const error404Display = document.querySelectorAll(".notImplemented");
const arena = document.getElementById("arena");
error404Display.forEach((item) =>
  item.addEventListener("click", () => {
    createAlert();
  })
);

let createAlert = function () {
  const dialog = document.createElement("div");
  dialog.classList.add("customDialog");
  const firstLine = document.createElement("div");
  firstLine.innerHTML = `Word, Presentation, Excel are not implemented.`;
  const secondLine = document.createElement("div");
  secondLine.innerHTML = `Only added for presentation purpose <i class="far fa-grin-wink"></i>`;
  const okBtn = document.createElement("button");
  okBtn.innerHTML = `Yes, got it <i class="fas fa-fire"></i><i class="fas fa-fire"></i>`;

  dialog.appendChild(firstLine);
  dialog.appendChild(secondLine);
  dialog.appendChild(okBtn);
  arena.appendChild(dialog);
  okBtn.addEventListener("click", () => {
    setTimeout(() => {
      dialog.remove();
    }, 500);
  });
};
