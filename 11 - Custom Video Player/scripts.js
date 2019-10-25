// 1. get all Element
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const controls = document.querySelector('.player__controls');
const progress = document.querySelector('.progress');
const progressFill = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skips = document.querySelectorAll('.skip');

let progressKey = false;

// 2. build out function
function onStopPropagation(e) {
    e.stopPropagation();
}
function playOrPause() {
    // console.dir(video);
    video.paused ? video.play(): video.pause();
}
function playOrPauseWithIcon() {
    playOrPause();
    toggle.textContent = video.paused ? '▶' : '▎▎';
}
function handleProgress(e) {
    if (progressKey) {
        const percent = ((e.pageX - player.offsetLeft) / progress.clientWidth);
        video.currentTime = video.duration * percent;
        progressFill.style.flexBasis = percent * 100 + '%';
    }
}

function handleRangeChange(e) {
    video[e.target.name] = e.target.value;
} 

function handleSkip(e) {
    console.dir(e.target.dataset.skip);
    video.currentTime += Number(e.target.dataset.skip);
}

// 3.hook up the event listeners

controls.addEventListener('click', onStopPropagation);
// play or pause
player.addEventListener('click', playOrPauseWithIcon);
toggle.addEventListener('click', playOrPauseWithIcon);
// progress and controls
progress.addEventListener('click', handleProgress);
progress.addEventListener('mousedown', () => progressKey = true);
progress.addEventListener('mousemove', handleProgress);
progress.addEventListener('mouseout', () => progressKey = false);

// range
ranges.forEach((range) => {
    range.addEventListener('change', handleRangeChange);
});

//skips
skips.forEach((skip) => {
    skip.addEventListener('click', handleSkip);
});

window.addEventListener('load', () => {
    progressFill.style.flexBasis = (video.currentTime / video.duration) * 100 + '%';
    ranges.forEach((range) => {
        range.value = video[range.dataset.skip];
    });
});

video.addEventListener('timeupdate', () => {
    progressFill.style.flexBasis = (video.currentTime / video.duration) * 100 + '%';
});