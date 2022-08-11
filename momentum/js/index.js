const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')

const timesOfDay = ['night', 'morning', 'afternoon', 'evening']

/*
  Block 1
*/

function showDate() {
  const dateData = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' }
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

  showGreeting();
  showDate();

  setTimeout(showTime, 1000);
}

showTime();

/*
  Accurate time indication
 */


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

/*
  Block 2
 */

function getTimeOfDay() {
  const dateData = new Date();
  const hours = dateData.getHours();

  return hours;
}

function showGreeting() {
  const hour = getTimeOfDay();
  const index = Math.floor(hour / 6);
  const timeOfDay = timesOfDay[index];

  greeting.textContent = `Good ${timeOfDay}`;
}

function setPlaceholder() {
  name.placeholder = '[Enter name]';
}

setPlaceholder();

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}

globalThis.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}

globalThis.addEventListener('load', getLocalStorage);

/*
  Block 3
 */
