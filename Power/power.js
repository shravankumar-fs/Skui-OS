const logoff = document.getElementById("sys-logoff");
const shutdown = document.getElementById("sys-shutdown");
const restart = document.getElementById("sys-restart");
const container = document.getElementById("container");
const arena = document.getElementById("arena");
const overLayID = "offScreen";

function closeAllApplications() {
  let apps = arena.children;
  for (let i = 0; i < apps.length; i++) {
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
  closeAllApplications();
});

restart.addEventListener("click", () => {
  makeOverLay();
  closeAllApplications();
  setTimeout(() => {
    removeOverLay();
  }, 3000);
});
