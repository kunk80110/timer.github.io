const dark = 'DARK';
const light = 'LIGHT';

const OBJECTS = {
  BACKGROUND: document.getElementById('wrap'),
  TIMER: document.getElementById('timer'),
  TIMER_BORDER: document.getElementById('timer_inner'),
  STOPBTN: document.getElementById('stopBtn'),
  CLEARBTN: document.getElementById('clearBtn'),
  STARTBTN: document.getElementById('startBtn'),
  CHANGETHEMEBTN: document.getElementById('changeThemeBtn'),
};

const render = () => {
  if (SETTINGS.THEME == dark) {
    SETTINGS.THEME = light;
    OBJECTS.BACKGROUND.classList = ['bg_light'];
    OBJECTS.TIMER.classList = ['h1_light'];
    OBJECTS.TIMER_BORDER.classList = ['timer_light'];
    OBJECTS.STOPBTN.classList = ['button_light'];
    OBJECTS.CLEARBTN.classList = ['button_light'];
    OBJECTS.STARTBTN.classList = ['button_light'];
    OBJECTS.CHANGETHEMEBTN.classList = ['button_light'];
  } else if (SETTINGS.THEME == light) {
    SETTINGS.THEME = dark;
    OBJECTS.BACKGROUND.classList = ['bg_dark'];
    OBJECTS.TIMER.classList = ['h1_dark'];
    OBJECTS.TIMER_BORDER.classList = ['timer_dark'];
    OBJECTS.STOPBTN.classList = ['button_dark'];
    OBJECTS.CLEARBTN.classList = ['button_dark'];
    OBJECTS.STARTBTN.classList = ['button_dark'];
    OBJECTS.CHANGETHEMEBTN.classList = ['button_dark'];
  } else {
    alert(
      'Error at func:render(). Please write a message to telegram @wildovaniy_tech'
    );
  }
};

const SETTINGS = {
  THEME: dark,
  TICK: 100,
  METHODS: {
    changeTheme() {
      if (this.THEME == dark) {
        this.THEME = light;
      } else {
        this.THEME = dark;
      }
    },
  },
};

let hundredseconds = 0;
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
      this.interval = setInterval(() => addCounter(), SETTINGS.TICK);
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
  ++hundredseconds;
  if (hundredseconds == 10) {
    hundredseconds = 0;
    seconds++;
  }
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes == 60) {
    minutes = 0;
    hours++;
  }

  timer.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}.${hundredseconds}`;
};

const clearTimer = () => {
  [hundredseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  timer.innerHTML = `00:00:00.0`;
  stopTimer();
  btns.switchOff(clearBtn);
  startBtn.innerText = 'START';
};
