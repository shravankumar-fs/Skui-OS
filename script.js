const timer = document.getElementById("timer");

/** Clock */
setInterval(() => {
  let date = new Date();
  let append = date.getHours() > 11 ? "PM" : "AM";
  let h = date.getHours() % 12;
  if (h == 0) h = 12;
  let m = date.getMinutes().toString().padStart(2, "0");
  timer.innerHTML = `<i class="far fa-clock"></i>&nbsp;&nbsp;${h}:${m}&nbsp;${append}&nbsp;&nbsp;&nbsp;&nbsp;${date.toDateString()}&nbsp;&nbsp;`;
}, 1000);
