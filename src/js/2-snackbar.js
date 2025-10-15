import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
    event.preventDefault();
const delayInput = form.querySelector('[name="delay"]');
const stateInput = form.querySelector('[name="state"]:checked');
const delay = Number(delayInput.value);
 const state = stateInput ? stateInput.value : null;

    if (isNaN(delay) || delay < 0) {
        iziToast.error({
  title: 'Error',
  message: 'Illegal operation',
  position: 'topRight',
        });
        return;
    };
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay)
    });
    promise
        .then(value => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${value}ms`,
                position: 'topRight'
            });
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${error}ms`,
                position: 'topRight',
            })
        })
})