(function () {
  var target = new Date("2026-09-28T08:00:00+05:30").getTime();
  var el = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function tick() {
    var diff = Math.max(0, target - Date.now());
    var s = Math.floor(diff / 1000);
    el.days.textContent = pad(Math.floor(s / 86400));
    el.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    el.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    el.seconds.textContent = pad(s % 60);
    if (diff === 0) clearInterval(timer);
  }

  tick();
  var timer = setInterval(tick, 250);
})();
