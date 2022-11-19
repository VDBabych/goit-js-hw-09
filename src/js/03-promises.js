import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css";

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const step = Number(e.target.elements.step.value);
  const amount = Number(e.target.elements.amount.value);
  let delay = Number(e.target.elements.delay.value);
  formEl.reset();
  for (let i = 1; i <= amount; i += 1){
    processPromise(createPromise(i, delay));
    delay += step
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      shouldResolve ? fulfill({ position, delay }) : reject({ position, delay });
    }, delay)
  })
}

function processPromise(promise) {
  promise.then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
