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
