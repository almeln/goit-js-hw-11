import '../css/common.css';

const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
    refs.startBtn.disabled = true;
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000, 1000);
}

refs.stopBtn.addEventListener('click', onStopBtn);

function onStopBtn() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
}

// Генерация случайного цвета
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

