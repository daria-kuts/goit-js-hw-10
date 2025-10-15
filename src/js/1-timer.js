import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const timerInput = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

let userSelectedDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

        if (selectedDates[0] < new Date()) {
            iziToast.error({
  title: 'Error',
  message: 'Please choose a date in the future',
  position: 'topRight',
});
            startBtn.disabled = true;
        } else {
            userSelectedDate = selectedDates[0];
            startBtn.disabled = false;
      }
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(timerInput, options);

startBtn.addEventListener('click', clickStart);

function clickStart(event) {
    
    startBtn.disabled = true;
    timerInput.disabled = true;
    setInterval(() => {
        const diff = userSelectedDate - new Date();
        if (diff <= 0) {
            timerDisplay(0);
            startBtn.disabled = true;
          timerInput.disabled = false;
          clearInterval()
            return;
        }
        timerDisplay(diff);
    },1000);
};

function timerDisplay(ms) {
const { days, hours, minutes, seconds } = convertMs(ms);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
};

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
