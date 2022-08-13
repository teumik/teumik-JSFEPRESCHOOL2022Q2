const time = document.querySelector('.time');;
const date = document.querySelector('.date');;
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error')
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote')

const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

let randomNum;
let quoteNum;

const range = {
  min: 1,
  max: 20,
}

let bool = true;

/*
  Block 1
*/

function showDate() {
  const dateData = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' }
  const locales = 'en-US';
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
  Block 2
 */

function getTimeOfDay() {
  const dateData = new Date();
  const hours = dateData.getHours();
  const index = Math.floor(hours / 6);
  const timeOfDay = timesOfDay[index];

  return timeOfDay;
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();

  greeting.textContent = `Good ${timeOfDay} `;
}

function setPlaceholder() {
  name.placeholder = '[Enter name]';
  city.placeholder = '[Enter city]';
}

setPlaceholder();

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}

globalThis.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}

globalThis.addEventListener('DOMContentLoaded', getLocalStorage);

/*
  Block 3
 */

function getRandomNum(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  randomNum = number;
}

getRandomNum(range.min, range.max);

function setBg() {
  const bgNum = randomNum.toString().padStart(2, '0');
  const timeOfDay = getTimeOfDay();

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/teumik/momentum-backgrounds/main/${timeOfDay}/${bgNum}.webp`;

  img.addEventListener('load', () => {
    body.style.backgroundImage = `url('${img.src}')`;
  });
}

setBg();

function getSlidePrev() {
  if (!bool) return;
  bool = false;

  if (randomNum > range.min) {
    randomNum--;
  } else {
    randomNum = range.max;
  }
  setBg();
  setTimeout(setTrue, 1000);
}

function getSlideNext() {
  if (!bool) return;
  bool = false;

  if (randomNum < range.max) {
    randomNum++;
  } else {
    randomNum = range.min;
  }
  setBg();
  setTimeout(setTrue, 1000);
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

/*
  Block 4
*/

function setDefaultCity() {
  const defaultCity = 'Minsk';
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = defaultCity;
  }
}

setDefaultCity();

function setCity(event) {
  getWeather();
  if (event.code === 'Enter') {
    city.blur();
  }
}

city.addEventListener('keyup', setCity);

function clearWeather() {
  weatherIcon.className = 'weather-icon owf';
  weatherError.textContent = '';
  temperature.textContent = '';
  weatherDescription.textContent = '';
  windSpeed.textContent = '';
  humidity.textContent = '';
}

async function getWeather() {
  const location = city.value;
  const lang = 'en';
  const units = 'metric';
  const apiId = '24e16254a3cf962d5f320b8ae129cc63';

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=${lang}&appid=${apiId}&units=${units}`;
  const res = await fetch(url);
  const data = await res.json();

  clearWeather();

  if (!location) {
    weatherError.textContent = `Nothing to geocode, I need your city!`;
    return;
  }
  if (data.cod === '404') {
    weatherError.textContent = `Error! Nothing to geocode for '${location}'!`;
    return;
  }

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

document.addEventListener('DOMContentLoaded', getWeather);

/*
  EXPERIMENTAL
*/

body.addEventListener('keydown', (event) => {
  if (event.target === body) {
    if (event.code === 'ArrowRight') {
      getSlideNext();
    } else if (event.code === 'ArrowLeft') {
      getSlidePrev();
    }
  }
})

function setTrue() {
  bool = true;
  console.log(bool, 'st');
}

/*
  Block 5
*/

function randomQuoteNum(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  if (quoteNum === number) {
    randomQuoteNum(min, max);
    return;
  }
  if (String(number) === localStorage.getItem('quoteNum')) {
    randomQuoteNum(min, max);
    return;
  }

  localStorage.setItem('quoteNum', number);
  quoteNum = number;
}

async function getQuotes() {
  const lang = 'ru'
  const quotes = './js/quotes.json';
  const response = await fetch(quotes);
  const data = await response.json();

  const min = 0;
  const max = data[lang].length - 1;

  randomQuoteNum(min, max);

  if (data[lang][quoteNum].quote.length > 100) {
    getQuotes();
    return;
  }

  quote.textContent = data[lang][quoteNum].quote;
  author.textContent = data[lang][quoteNum].author;
}

globalThis.addEventListener('DOMContentLoaded', getQuotes);
changeQuote.addEventListener('click', getQuotes);

/*
  Block 5
*/
