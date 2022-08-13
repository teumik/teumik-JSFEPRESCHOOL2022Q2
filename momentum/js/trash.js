// accurate time function

function correctShowTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;

  showDate()
}

correctShowTime();

let interval = setInterval(correctShowTime, 1000);

// locales

const locales = 'en-GB';
locales = 'ru-RU';

// duartion

function getDuration() {
  audio.setAttribute('preload', 'metadata')
  audio.addEventListener('loadedmetadata', () => {
    console.log(audio.duration);
    let seconds = Math.floor(audio.duration);
    audioList.textContent = fromSectoMin(seconds);;
  })
}

function fromSectoMin(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  return `${min}:${sec}`
}

getDuration()
