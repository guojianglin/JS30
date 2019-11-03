const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
let countDown;

const buttons = document.querySelectorAll('[data-time]');
const customForm = document.querySelector('#custom');
const text =  customForm.querySelector('[type="text"]');

function timer(seconds) {
    const now = Date.now();
    const then  = now + seconds * 1000;
    clearInterval(countDown);
    displaySecondsLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
        const secondsLeft = Math.ceil((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }

        displaySecondsLeft(secondsLeft);

    }, 1000);

}

function displaySecondsLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;

    timeLeft.textContent = `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
    document.title = `${minutes}:${sec < 10 ? '0' : ''}${sec}`;

}

function displayEndTime(timeStamp) {
    const timeThen = new Date(timeStamp);
    let hours = timeThen.getHours();
    hours = hours % 12;
    const minutes = timeThen.getMinutes();
    console.log('displayEndTime', timeEnd);
    timeEnd.textContent = `will be end at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        timer(button.dataset.time);
    });
});

customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    timer(text.value * 60);
    customForm.reset();
});