import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css";
const startBtnEl = document.querySelector('[data-start]');
const timerElems = document.querySelectorAll('.value');
startBtnEl.addEventListener('click', onStartBtnClick);
startBtnEl.disabled = true;
let chosenDate;
let setIntervalId;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      chosenDate = selectedDates[0];
      dateValidation(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

function onStartBtnClick() {
    setIntervalId = setInterval(startTimer, 1000)
    startBtnEl.disabled = true;
    startBtnEl.previousElementSibling.disabled = true;
}

function dateValidation(date) {
    if (date < Date.now()) {
        Notify.failure('Please choose a date in the future', {timeout: 1000});
        return
    }
    Notify.success('You are welcome', {timeout: 750});
    startBtnEl.disabled = false;
}

function startTimer() {
    const timeToEndinMs = chosenDate - Date.now();
    const timeToEnd = convertMs(timeToEndinMs);
    if (timeToEndinMs <= 1000) {
        changeTimerElems(timerElems);
        startBtnEl.previousElementSibling.disabled = false;
        clearInterval(setIntervalId);
        return
    }
    changeTimerElems(timerElems, timeToEnd)
}

function changeTimerElems(elems, time = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
}) {
    elems.forEach(el => {
        el.textContent = time[Object.keys(el.dataset)[0]].toString().padStart(2, '0')
    })
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}