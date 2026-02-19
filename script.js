let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;
let timer = null;
let isWork = true;
let sessionCount = 0;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const modeEl = document.getElementById("mode");
const sessionsEl = document.getElementById("sessions");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      timer = null;

      if (isWork) {
        sessionCount++;
        sessionsEl.textContent = sessionCount;
        timeLeft = breakTime;
        modeEl.textContent = "Break Time ☕";
      } else {
        timeLeft = workTime;
        modeEl.textContent = "Work Time 💻";
      }

      isWork = !isWork;
      startTimer();
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isWork = true;
  timeLeft = workTime;
  modeEl.textContent = "Work Time";
  updateDisplay();
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

updateDisplay();
