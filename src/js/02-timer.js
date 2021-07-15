import Swal from 'sweetalert2';

const refs = {
    inputDate: document.getElementById('date-selector'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.classList.add('timer-btn');

refs.startBtn.disabled = true;
refs.inputDate.addEventListener('change', onSelectedDate);

function onSelectedDate(event) {
    const selectedDate = new Date(this.value).getTime();

    if(selectedDate <= Date.now() ) {
        return Swal.fire('Please choose a date in the future');
    } else {
        refs.startBtn.disabled = false;
    }
}

class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;

        this.init();
    }

    init() {
        const time = this.convertMs(0);
        this.onTick(time);
    }

    start() {
        if(this.isActive) {
            return;
        }
        
        const startTime = new Date(refs.inputDate.value).getTime();

        const msInThreeHours = 10800000;

        this.isActive = true;

        refs.inputDate.disabled = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime - msInThreeHours;
            const time = this.convertMs(deltaTime);

            this.onTick(time);

            if (deltaTime === 0) {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
        this.init();
    }

    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = this.pad(Math.floor(ms / day));
        // Remaining hours
        const hours = this.pad(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));
      
        return { days, hours, minutes, seconds };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateTimerInterface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateTimerInterface({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}