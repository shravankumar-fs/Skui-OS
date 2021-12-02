const timer = document.getElementById("timer");
let ref;
timer.addEventListener("click", () => {
  let clock = document.getElementById("timerCanvas");
  if (!clock) {
    clock = document.createElement("div");
    clock.classList.add("timerWidget");
    clock.innerHTML = `
        <div class="mainTimerWidget">
      <canvas id="timerCanvas" width="150" height="150"> </canvas>
      <button id="closeTimer">X</button>
      </div>`;
    document.getElementById("arena").appendChild(clock);
    ref = window.requestAnimationFrame(clockRun);
    document.getElementById("closeTimer").addEventListener("click", () => {
      window.cancelAnimationFrame(ref);
      clock.remove();
    });
  }
});

let clockRun = () => {
  let now = new Date();
  let context = document.getElementById("timerCanvas").getContext("2d");
  context.clearRect(0, 0, 150, 150);
  context.save();
  context.translate(75, 75);
  context.scale(0.4, 0.4);
  context.rotate(-Math.PI / 2);
  context.strokeStyle = "black";
  context.fillStyle = "white";
  context.lineWidth = 8;
  context.lineCap = "round";
  //hours
  context.save();
  for (let i = 0; i < 12; i++) {
    context.beginPath();
    context.rotate(Math.PI / 6);
    context.moveTo(100, 0);
    context.lineTo(120, 0);
    context.stroke();
  }
  context.restore();
  //mins
  context.save();
  context.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 != 0) {
      context.beginPath();
      context.moveTo(117, 0);
      context.lineTo(120, 0);
      context.stroke();
    }
    context.rotate(Math.PI / 30);
  }
  context.restore();

  let sec = now.getSeconds();
  let min = now.getMinutes();
  let hr = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr;

  context.fillStyle = "black";

  //write hours
  context.save();
  context.rotate(
    hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  context.lineWidth = 14;
  context.beginPath();
  context.moveTo(-20, 0);
  context.lineTo(80, 0);
  context.stroke();
  context.restore();

  //write mins
  context.save();
  context.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(-28, 0);
  context.lineTo(112, 0);
  context.stroke();
  context.restore();

  context.save();
  context.rotate((sec * Math.PI) / 30);
  context.strokeStyle = "#F40000";
  context.fillStyle = "#F40000";
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(-30, 0);
  context.lineTo(83, 0);
  context.stroke();
  context.beginPath();
  context.arc(0, 0, 10, 0, Math.PI * 2, true);
  context.fill();
  context.beginPath();
  context.arc(95, 0, 10, 0, Math.PI * 2, true);
  context.stroke();
  context.fillStyle = "rgba(0, 0, 0, 0)";
  context.arc(0, 0, 3, 0, Math.PI * 2, true);
  context.fill();
  context.restore();

  context.beginPath();
  context.lineWidth = 14;
  context.strokeStyle = "#325FA2";
  context.arc(0, 0, 142, 0, Math.PI * 2, true);
  context.stroke();
  context.restore();
  ref = window.requestAnimationFrame(clockRun);
};
