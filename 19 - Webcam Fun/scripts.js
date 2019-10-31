const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

let stream;

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: { width: 600, height: 600 }, audio: false})
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            stream = localMediaStream;
            video.play();
            console.log(111);
            // drawToCanvas();
        })
        .catch(err => {
            console.error('oh no', err);
        });
}

function drawToCanvas() {
    const { videoWidth: width, videoHeight: height } = video;

    canvas.width = width;
    canvas.height = height;
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(width / 4, height / 4, width / 2, height / 2);
        pixels = redEffect(pixels);
        ctx.putImageData(pixels, width / 4, height / 4);

    }, 16);
}

function redEffect(pixels) {
    for (let i=0; i < pixels.data.length; i+=4) {
        pixels.data[i] += 200; //red
        pixels.data[i + 1] -= 50; //green
        pixels.data[i + 2] *= 0.5; //blue
    }

    return pixels;
}

function shotsnap() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'peter-guojianglin');
    link.innerHTML = `<img src=${data} />`
    strip.insertBefore(link, strip.firstChild);
}
// getVideo();
video.addEventListener('canplay', drawToCanvas);

function stopCam() {
    if (stream !== undefined) {
        stream.getVideoTracks()[0].stop();
        stream = undefined;
    }
}

