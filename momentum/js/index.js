const time = document.querySelector('.time');
const date = document.querySelector('.date');

function showDate() {
  const dateData = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }
  const locales = 'en-US';

  // const locales = 'en-GB';
  // const locales = 'ru-RU';

  const currentDate = dateData.toLocaleDateString(locales, options);
  date.textContent = currentDate;
}


function showTime() {
  const dateData = new Date();
  const currentTime = dateData.toLocaleTimeString();
  time.textContent = currentTime;

  showDate()

  setTimeout(showTime, 1000);
}

showTime();


// Код для более точного отображения времени

/*
function correctShowTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;

  showDate()
}

correctShowTime();

let interval = setInterval(correctShowTime, 1000);
 */
