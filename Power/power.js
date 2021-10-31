const logoff = document.getElementById("sys-logoff");
const shutdown = document.getElementById("sys-shutdown");
const restart = document.getElementById("sys-restart");
const container = document.getElementById("container");
const arena = document.getElementById("arena");
const overLayID = "offScreen";

function closeAllApplications() {
  let apps = arena.children;

  for (let i = apps.length - 1; i >= 0; i--) {
    apps[i].remove();
  }
}

function makeOverLay() {
  const overlay = document.createElement("div");
  overlay.classList.add("powerOverLay");
  overlay.id = overLayID;
  container.appendChild(overlay);
}
function removeOverLay() {
  document.getElementById(overLayID).remove();
}
shutdown.addEventListener("click", () => {
  makeOverLay();

  const mDisplay = document.createElement("div");
  mDisplay.innerText = "Power Saver Mode is on";
  mDisplay.classList.add("messagePower");

  const leafDisplay = document.createElement("div");
  leafDisplay.classList.add("leafPower");
  leafDisplay.innerHTML = `<i class="fas fa-leaf"></i>`;

  const powerBtn = document.createElement("button");
  powerBtn.classList.add("turnOnPower");
  powerBtn.innerHTML = `<i class="fas fa-power-off"></i>`;

  const screen = document.getElementById(overLayID);
  screen.appendChild(mDisplay);
  screen.appendChild(leafDisplay);
  screen.appendChild(powerBtn);
  let message = "System is starting....";
  let idx = 1;
  powerBtn.addEventListener("click", () => {
    let interval = setInterval(() => {
      mDisplay.innerHTML = message.substring(0, idx);
      idx++;
      if (idx == message.length) {
        clearInterval(interval);
      }
    }, 50);
    leafDisplay.style.animation = "leaf-animate 3s ease-in ";
    setTimeout(() => {
      document.getElementById("alert").play();
    }, 100);
    powerBtn.style.backgroundColor = "green";
    setTimeout(() => {
      removeOverLay();
    }, 4000);
  });

  closeAllApplications();
});

restart.addEventListener("click", () => {
  makeOverLay();
  closeAllApplications();
  setTimeout(() => {
    document.getElementById("alert").play();
  }, 2000);
  setTimeout(() => {
    removeOverLay();
  }, 4000);
});
