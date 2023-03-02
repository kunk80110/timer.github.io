let seconds = 0;
let minutes = 0;
let hours = 0;
const timer = document.getElementById('timer');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const startBtn = document.getElementById('startBtn');

const Timer = {
  interval: '',
  switchedOn: '',
  setClock: function () {
    if (!this.switchedOn) {
      this.interval = setInterval(() => addCounter(), 1000);
      this.switchedOn = true;
      btns.switchOff(startBtn);
      btns.switchOn(stopBtn);
      btns.switchOn(clearBtn);
      if ((startBtn.innerText = 'START')) {
        startBtn.innerText = 'CONTINUE';
      }
    }
  },
  stopClock: function () {
    clearInterval(this.interval);
    this.interval = '';
    this.switchedOn = false;
    btns.switchOff(stopBtn);
    btns.switchOn(startBtn);
  },
};

const startTimer = Timer.setClock.bind(Timer);
const stopTimer = Timer.stopClock.bind(Timer);

const btns = {
  switchOff: function (button) {
    button.disabled = true;
  },
  switchOn: function (button) {
    button.disabled = false;
  },
};

const addCounter = () => {
  ++seconds;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes == 60) {
    minutes = 0;
    hours++;
  }

  timer.innerHTML = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${seconds < 10 ? `0${seconds}` : seconds}`;
};

const clearTimer = () => {
  [seconds, minutes, hours] = [0, 0, 0];
  timer.innerHTML = `00 : 00 : 00`;
  stopTimer();
  btns.switchOff(clearBtn);
  startBtn.innerText = 'START';
};
