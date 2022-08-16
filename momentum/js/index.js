import playList from './playList.js';

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
const weatherError = document.querySelector('.weather-error');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const ul = document.querySelector('.play-list');
// const circle = document.querySelectorAll('.circle');

const trackTitle = document.querySelector('.track-name')
const currentDuration = document.querySelector('.current-duration')
const trackDuration = document.querySelector('.track-duration');
const volumeButton = document.querySelector('.volume-button');
// const progress = document.querySelectorAll('.progress');
// const timeline = document.querySelectorAll('.timeline');
// const field = document.querySelectorAll('.field');
const volSlider = document.querySelector('.volume-slider');
const seekSlider = document.querySelector('.seek-slider');

const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const play = document.querySelector('.play');

const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

const range = {
  min: 1,
  max: 20,
}
const volumeRange = {
  min: 0,
  max: 100,
}
const durationRange = {
  min: 0,
  max: null,
  current: null,
  step: null,
}

let randomNum;
let quoteNum;
let flickrNum;
let playNum = 0;
let timerDuration = [];
let seekDuration = [];

let isTransition = true;
let isPlay = false;
let isMute = false;
let flag;


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
  localStorage.setItem('volume', volSlider.value);
}

globalThis.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('volume')) {
    volSlider.value = localStorage.getItem('volume');
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
  if (!isTransition) return;
  isTransition = false;

  if (randomNum > range.min) {
    randomNum--;
  } else {
    randomNum = range.max;
  }
  setBg();
  setTimeout(setTrue, 1000);
}

function getSlideNext() {
  if (!isTransition) return;
  isTransition = false;

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

setInterval(getWeather, 300e3)

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
  isTransition = true;
}

/*
  Block 5
*/

function randomQuoteNum(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  // if (quoteNum === number) {
  //   randomQuoteNum(min, max);
  //   return;
  // }
  // if (String(number) === localStorage.getItem('quoteNum')) {
  //   randomQuoteNum(min, max);
  //   return;
  // }

  // localStorage.setItem('quoteNum', number);

  quoteNum = number;
}

async function getQuotes() {
  const lang = 'en'
  const quotes = './js/quotes.json';
  const response = await fetch(quotes);
  const data = await response.json();

  const min = 0;
  const max = data[lang].length - 1;

  randomQuoteNum(min, max);

  // if (data[lang][quoteNum].quote.length > 100) {
  //   getQuotes();
  //   return;
  // }

  quote.textContent = data[lang][quoteNum].quote;
  author.textContent = data[lang][quoteNum].author;
}

globalThis.addEventListener('DOMContentLoaded', getQuotes);
changeQuote.addEventListener('click', getQuotes);

/*
  Block 6
*/

function createListItem() {
  // trackTitle.textContent = playList[playNum].title;
  // trackDuration.textContent = playList[playNum].duration;
  playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    ul.append(li);
  })
}

createListItem();

// globalThis.addEventListener('DOMContentLoaded', loadAudio);

const lis = document.querySelectorAll('.play-item');

const audio = new Audio();

function loadAudio() {
  console.log('load');
  audio.src = playList[playNum].src;
  trackTitle.textContent = playList[playNum].title;
  play.classList.add('pause');
  isPlay = true;
  getDuration();
  // audio.currentTime = 0;
  // seekSlider.value = 0;
  audio.play();
}

function stopAudio() {
  clearTimerDuration();

  clearUpdateSeek();

  audio.pause();
}

function clearTimerDuration() {
  timerDuration.map((a) => {
    clearInterval(a);
    timerDuration = [];
  })

  // clearInterval(timerDuration)
  // timerDuration = null;
}

function playAudio() {
  getCurrentDuration();
  setTrackDuration()

  if (!audio.src) {
    loadAudio();
    return;
  }

  play.classList.toggle('pause');

  if (isPlay) {
    isPlay = false;
    stopAudio();
  } else {
    isPlay = true;
    audio.play();
  }
}

play.addEventListener('click', playAudio);

lis.forEach((el, i) => {
  el.addEventListener('click', () => {
    if (playNum !== i) {
      playNum = i;
      loadAudio();
    } else {
      playAudio();
    }
  });
});

function playOther() {
  clearTimerDuration();
  clearUpdateSeek();
  loadAudio();
  // preLoad();
}

function playPrevAudio() {
  if (playNum > 0) {
    playNum--;
  } else {
    playNum = playList.length - 1;
  }
  playOther();
}

function playNextAudio() {
  if (playNum < playList.length - 1) {
    playNum++;
  } else {
    playNum = 0;
  }
  playOther();
}

playPrev.addEventListener('click', playPrevAudio)
playNext.addEventListener('click', playNextAudio)

audio.addEventListener('ended', playNextAudio)
// audio.addEventListener('ended', playNextAudio)

function setItemActive(event) {
  lis.forEach((li, i) => {
    const played = event.target;
    li.addEventListener('click', (event) => {
      if (played.getAttribute('src').includes(event.target.textContent)) {
        event.target.classList.add('item-active-pause');
      }
    })
    li.classList.remove('item-active-pause');
    li.classList.remove('item-active');
    if (event.target.getAttribute('src').includes(li.textContent)) {
      li.classList.add('item-active');
    }
  })
}

audio.addEventListener('playing', (event) => {
  setItemActive(event);
})

/*
  Block 7
*/

function getDuration() {
  console.log('getdur');
  audio.setAttribute('preload', 'metadata')
  audio.addEventListener('loadedmetadata', () => {
    const seconds = Math.floor(audio.duration);
    trackDuration.textContent = fromSecToMin(seconds);
    console.log('get dur load meta');
    timerDuration.push(setInterval(getCurrentDuration, 500));
    setTrackDuration();
  })

  if (flag) {
    console.log('HERE I COME ONCE');
    timerDuration.push(setInterval(getCurrentDuration, 500));
    flag = false;
  }
}

function getCurrentDuration() {
  console.log('current time update interval');
  const seconds = parseInt(audio.currentTime, 10);
  currentDuration.textContent = fromSecToMin(seconds);
}

function fromSecToMin(num) {
  const min = Math.floor(num / 60);
  const sec = num % 60;
  return `${min}:${sec.toString().padStart(2, 0)}`
}

function setMute() {
  if (isMute) {
    volSlider.value = localStorage.getItem('volume');
    isMute = false;
  } else {
    localStorage.setItem('volume', volSlider.value);
    volSlider.value = volumeRange.min;
    isMute = true;
  }
  changeVolume();
  volumeButton.classList.toggle('mute');
}

volumeButton.addEventListener('click', setMute);

volSlider.addEventListener('mousedown', function () {
  // changeVolume();
  volSlider.addEventListener('mouseup', changeVolume)
  volSlider.addEventListener('mousemove', changeVolume);
});

volSlider.addEventListener('change', function () {
  if (volSlider.value === '0') {
    isMute = true;
    volumeButton.classList.add('mute');
  } else {
    isMute = false;
    volumeButton.classList.remove('mute');
  }
})

function changeVolume() {
  audio.volume = volSlider.value / volumeRange.max;
}

function setVolume() {
  volSlider.min = volumeRange.min;
  volSlider.max = volumeRange.max;
  volSlider.step = volumeRange.step;
  if (localStorage.getItem('volume')) {
    getLocalStorage();
  } else {
    volSlider.value = Math.round((volumeRange.min + volumeRange.max) / 2);
  }
  changeVolume();
}

globalThis.addEventListener('DOMContentLoaded', setVolume);


function setTrackDuration() {
  console.log('set');

  durationRange.max = Math.floor(audio.duration);
  durationRange.step = Math.floor(audio.duration);
  seekSlider.min = durationRange.min;
  seekSlider.max = durationRange.max;

  seekDuration.push(setInterval(updateSeek, 500));
}

function updateSeek() {
  console.log('int');
  seekSlider.value = parseInt(audio.currentTime, 10);
}

function clearUpdateSeek() {
  seekDuration.map((a) => {
    clearInterval(a);
    seekDuration = [];
  })
}

seekSlider.addEventListener('mousedown', function (event) {
  clearUpdateSeek();

  seekSlider.addEventListener('mouseup', changeSeek)
  seekSlider.addEventListener('mouseup', setTrackDuration)
  seekSlider.addEventListener('mousemove', () => {
  })
});


function changeSeek(event) {
  console.log('change');

  durationRange.max = Math.floor(audio.duration);
  seekSlider.max = durationRange.max;


  console.log(seekSlider.value, 'val');
  console.log(seekSlider.min, 'min');
  console.log(seekSlider.max, 'max');


  console.log(seekSlider.value, 'val');

  audio.currentTime = seekSlider.value;

  console.log(audio.currentTime, 'currtime');
  console.log(audio.duration, 'duration');
}

trackTitle.addEventListener('mousedown', () => {
  console.log(audio.currentTime);
})

function preLoad() {
  audio.src = playList[playNum].src;
  audio.load();
  audio.setAttribute('preload', 'metadata');
  audio.addEventListener('loadedmetadata', () => {
    console.log('wait');
    seekSlider.max = parseInt(audio.duration, 10);
    trackDuration.textContent = fromSecToMin(parseInt(audio.duration, 10));
  })
  trackTitle.textContent = playList[playNum].title;

  audio.currentTime = 0;
  seekSlider.value = 0;

  setTrackDuration();
  getDuration();
}

globalThis.addEventListener('DOMContentLoaded', preLoad);

const rangeInputs = document.querySelectorAll('input[type="range"]')

function handleInputChange(e) {
  let target = e.target

  const min = target.min
  const max = target.max
  const val = target.value

  console.log(min, max, val);

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
  console.log(target.style.backgroundSize);
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange);
  globalThis.addEventListener('DOMContentLoaded', setSize);
})

function setSize() {
  rangeInputs[0].style.backgroundSize = '0%';
  rangeInputs[1].style.backgroundSize = volSlider.value + '%';
}



/*
  Block 8
*/
/*
  Block 9
*/

async function getLinkUnsplash() {
  const clientId = 'UrrZVZoXO3TuaXUbWdh7Ri63AZgPz_WkoYHZsc0fXSM';
  const orientation = 'landscape';
  const query = getTimeOfDay();

  const url = `https://api.unsplash.com/photos/random?orientation=${orientation}&query=${query}&client_id=${clientId}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data.urls.regular);
}

// getLinkUnsplash();

function randomFlickrNum(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  flickrNum = number;
}

async function getLinkFlickr() {
  const apiKey = 'c3cf36fd7fddb1b32e389240c2d283f0';
  const tag = getTimeOfDay();
  const tagMode = 'all';
  const extra = 'url_h';

  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&tag_mode=${tagMode}&extras=${extra}&format=json&nojsoncallback=1`;

  const response = await fetch(url);
  const data = await response.json();

  const photos = data.photos.photo.filter(el => el.url_h).sort((a, b) => a.id - b.id);
  const max = photos.length - 1;

  randomFlickrNum(0, max);

  console.log(photos[flickrNum].url_h);
}

// getLinkFlickr();
