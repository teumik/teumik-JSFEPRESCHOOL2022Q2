import playList from './playList.js';

// alert('Добрового времени стуок тебе! Спасибо, что тратишь время на проверку моей "работы". Если ты не имеешь возражений, я попрошу тебя проверить работу ближе к сроку окончания (если будет возмодность 20 числа). Я обещаю ее доделать и остаюсь на связи! телеграмм Доброго времени суток тебе! Спасибо, что тратишь время на проверку моей "работы". Я очень хочу ее доделать, так как мне принципиально хочется понять как выполнить поставленные задачи и понять как это работает. Если ты не имеешь возражений, я прошу тебя проверить работу ближе к сроку окончания (если будет возможность 21 числа). Я обещаю ее доделать и остаюсь на связи! Telegram @teumik, Discord teumik#1795 и везде где только можно тоже teumik. teumik');
// alert('Остался перевод. будет закончен уже 19 числа. Огромное спасибо!')

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

const trackTitle = document.querySelector('.track-name')
const currentDuration = document.querySelector('.current-duration')
const trackDuration = document.querySelector('.track-duration');
const volumeButton = document.querySelector('.volume-button');
const volSlider = document.querySelector('.volume-slider');
const seekSlider = document.querySelector('.seek-slider');
const settingsBotton = document.querySelector('.settings');
const settingsBlock = document.querySelector('.settings-block');
const tagInput = document.querySelector('.tag-input');

const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const play = document.querySelector('.play');

const timesOfDay = ['night', 'morning', 'afternoon', 'evening'];

const translate = {
  city: {
    en: 'Minsk',
    ru: 'Минск',
  },
  greeting: [
    {
      en: 'Good night',
      ru: 'Доброй ночи',
    },
    {
      en: 'Good morning',
      ru: 'Доброе утро',
    },
    {
      en: 'Good afternoon',
      ru: 'Доброго дня',
    },
    {
      en: 'Good evening',
      ru: 'Доброго вечера',
    },
  ],
  placeholder: {
    city: {
      en: '[Enter city]',
      ru: '[Введите город]',
    },
    name: {
      en: '[Enter name]',
      ru: '[Введите имя]'
    },
    tag: {
      en: 'Tags space-separated',
      ru: 'Теги через пробел',
    },
    todo: {
      en: 'New Todo [Enter]',
      ru: 'Новое дело [Enter]',
    },
  },
  text: {
    tab: {
      en: 'Tab',
      ru: 'Вкладка',
    },
    today: {
      en: 'Today',
      ru: 'Сегодня',
    },
    clear: {
      en: 'Clear',
      ru: 'Очистить',
    },
    wind: {
      en: 'Wind speed',
      ru: 'Скорость ветра',
      speed: {
        en: 'mph',
        ru: 'м/с',
      }
    },
    humidity: {
      en: 'Humidity',
      ru: 'Влажность',
    }
  },
  settings: {
    lang: {
      en: 'Language',
      ru: 'Язык',
      options: {
        en: {
          en: 'English',
          ru: 'Английский',
        },
        ru: {
          en: 'Russian',
          ru: 'Русский',
        },
      }
    },
    source: {
      en: 'Source',
      ru: 'Источник',
    },
    player: {
      en: 'Music Player',
      ru: 'Плеер',
    },
    weather: {
      en: 'Weather',
      ru: 'Погода',
    },
    time: {
      en: 'Time',
      ru: 'Время',
    },
    date: {
      en: 'Date',
      ru: 'Дата',
    },
    greeting: {
      en: 'Greeting',
      ru: 'Приветствие',
    },
    quotes: {
      en: 'Quotes',
      ru: 'Цитаты',
    },
    todo: {
      en: 'Todo',
      ru: 'Дела',
    },
  }
}

const range = {
  min: 1,
  max: 20,
}
const rangeFlickr = {
  min: 0,
  max: 0,
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

let github = true;
let unsplash = false;
let flickr = false;

let lang = localStorage.getItem('lang') || 'en';

let tags;

tags = tagInput.value || getTimeOfDay();

tagInput.addEventListener('change', getTag)
tagInput.addEventListener('keypress', getTagEnter)

function getTag() {
  tags = tagInput.value;
  if (flickr) {
    getLinkFlickr();
  }
  if (unsplash) {
    getLinkUnsplash();
  }
}

function getTagEnter(event) {
  if (event.code === 'Enter') {
    getTag();
  }
}

const inputTagClear = document.querySelector('.tag-clear')
inputTagClear.addEventListener('click', clearTag)

function clearTag(event) {
  tagInput.value = '';
}

/*
  Block 1
*/

function showDate() {
  const dateData = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' }

  const locales = lang;

  const currentDate = dateData.toLocaleDateString(locales, options);

  date.textContent = currentDate;
}

function showTime() {
  const dateData = new Date();
  const currentTime = dateData.toLocaleTimeString();
  time.textContent = currentTime;

  getTimeOfDay();

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
  let timeOfDay = timesOfDay[index];
  const greet = translate.greeting[index][lang];

  greeting.textContent = greet;

  return timeOfDay;
}

function setPlaceholder() {
  name.placeholder = translate.placeholder.name[lang];
  city.placeholder = translate.placeholder.city[lang];
}

setPlaceholder();

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('volume', volSlider.value);
  localStorage.setItem('github', github)
  localStorage.setItem('unsplash', unsplash)
  localStorage.setItem('flickr', flickr)
}

globalThis.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('volume')) {
    volSlider.value = localStorage.getItem('volume');
  }
  if (localStorage.getItem('github')) {
    github = JSON.parse(localStorage.getItem('github'));
  }
  if (localStorage.getItem('unsplash')) {
    unsplash = JSON.parse(localStorage.getItem('unsplash'));
  }
  if (localStorage.getItem('flickr')) {
    flickr = JSON.parse(localStorage.getItem('flickr'));
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
  if (unsplash) {
    getLinkUnsplash();
    return;
  }

  if (flickr) {
    getLinkFlickr();
    return
  }

  const bgNum = randomNum.toString().padStart(2, '0');
  const timeOfDay = getTimeOfDay();

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/teumik/momentum-backgrounds/main/${timeOfDay}/${bgNum}.webp`;

  img.addEventListener('load', () => {
    body.style.backgroundImage = `url('${img.src}')`;
  });
}

globalThis.addEventListener('DOMContentLoaded', setBg)

function getSlidePrev() {
  if (!isTransition) return;
  isTransition = false;

  if (unsplash) {
    getLinkUnsplash();
  }

  if (flickr) {
    if (flickrNum > rangeFlickr.min) {
      flickrNum--;
    } else {
      flickrNum = rangeFlickr.max;
    }
    getFlickrImage();
  }

  if (github) {
    if (randomNum > range.min) {
      randomNum--;
    } else {
      randomNum = range.max;
    }
    setBg();
  }

  setTimeout(setTrue, 100);
}

function getSlideNext() {
  if (!isTransition) return;
  isTransition = false;

  if (unsplash) {
    getLinkUnsplash();
  }

  if (flickr) {
    if (flickrNum < rangeFlickr.max) {
      flickrNum++;
    } else {
      flickrNum = rangeFlickr.min;
    }
    getFlickrImage();
  }

  if (github) {
    if (randomNum < range.max) {
      randomNum++;
    } else {
      randomNum = range.min;
    }
    setBg();
  }

  setTimeout(setTrue, 1000);
}

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

/*
  Block 4
*/

function setDefaultCity() {
  const loc = localStorage.getItem('city');

  if (loc === '') {
    city.value = translate.city[lang];
    return;
  }

  if (loc) {
    city.value = loc;
    if (loc === translate.city.en || loc === translate.city.ru) {
      city.value = translate.city[lang];
    }
    return;
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

  let units;

  if (lang === 'en') {
    units = 'imperial';
  } else {
    units = 'metric';
  }

  const apiId = '24e16254a3cf962d5f320b8ae129cc63';

  let language = lang;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=${language}&appid=${apiId}&units=${units}`;
  const res = await fetch(url);
  const data = await res.json();

  clearWeather();

  if (!location) {
    if (lang === 'en') {
      weatherError.textContent = `Nothing to geocode, I need your city!`;
      return;
    } else {
      weatherError.textContent = 'Нет данных для определения геопозиции, мне нужен город!'
    }
  }

  if (data.cod === '404') {
    if (lang === 'en') {
      weatherError.textContent = `Error! Nothing to geocode for '${location}'!`;
      return;
    } else {
      weatherError.textContent = `Ошибка! Невозможно найти '${location}'`;
    }
  }

  const w = translate.text.wind[lang];
  const s = translate.text.wind.speed[lang];
  const h = translate.text.humidity[lang];
  let t;

  if (lang === 'en') {
    t = '°F'
  } else {
    t = '°C';
  }

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}${t}`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `${w}: ${Math.round(data.wind.speed)} ${s}`;
  humidity.textContent = `${h}: ${data.main.humidity}%`;
}

document.addEventListener('DOMContentLoaded', getWeather);

setInterval(getWeather, 300e3)

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

  if (number === quoteNum) {
    randomQuoteNum(min, max);
  } else {
    quoteNum = number;
  }
}

async function getQuotes() {
  const quotes = './js/quotes.json';
  const response = await fetch(quotes);
  const data = await response.json();

  const min = 0;
  const max = data[lang].length - 1;

  randomQuoteNum(min, max);

  quote.textContent = data[lang][quoteNum].quote;
  author.textContent = data[lang][quoteNum].author;
}

globalThis.addEventListener('DOMContentLoaded', getQuotes);
changeQuote.addEventListener('click', getQuotes);

/*
  Block 6
*/

function createListItem() {
  playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = el.title;
    ul.append(li);
  })
}

createListItem();

const lis = document.querySelectorAll('.play-item');

const audio = new Audio();

function loadAudio() {
  audio.src = playList[playNum].src;
  trackTitle.textContent = playList[playNum].title;
  play.classList.add('pause');
  isPlay = true;
  setTimeProgress();
  getDuration();
  setSize();

  getCurrentDuration();
  setTrackDuration();

  audio.play();
}

function stopAudio() {
  clearUpdateSeek();

  clearTimerDuration();

  clearTimeProgress();

  audio.pause();
}

function clearTimerDuration() {
  timerDuration.map((a) => {
    clearInterval(a);
    timerDuration = [];
  })
}

function playAudio() {
  setTimeProgress();
  getCurrentDuration();
  setTrackDuration();

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
  seekSlider.value = 0;
  clearTimerDuration();
  clearUpdateSeek();
  clearTimeProgress();
  loadAudio();
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
  audio.setAttribute('preload', 'metadata')
  audio.addEventListener('loadedmetadata', () => {
    const seconds = Math.floor(audio.duration);
    trackDuration.textContent = fromSecToMin(seconds);
    timerDuration.push(setInterval(getCurrentDuration, 500));
  })

  timerDuration.push(setInterval(getCurrentDuration, 500));
  getCurrentDuration();
  if (flag) {
    timerDuration.push(setInterval(getCurrentDuration, 500));
    flag = false;
  }
}

function getCurrentDuration() {
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

  handleInputChange(volSlider);
}

volumeButton.addEventListener('click', setMute);

volSlider.addEventListener('mousedown', function () {
  volSlider.addEventListener('mouseup', changeVolume)
  volSlider.addEventListener('mousemove', changeVolume);
});

volSlider.addEventListener('change', checkMute);

globalThis.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('volume') === '0') {
    isMute = true;
    volumeButton.classList.add('mute');
    return;
  }
});

function checkMute() {
  if (volSlider.value === '0') {
    isMute = true;
    volumeButton.classList.add('mute');
  } else {
    isMute = false;
    volumeButton.classList.remove('mute');
  }
}

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
    volSlider.value = localStorage.getItem('volume') || Math.round((volumeRange.min + volumeRange.max) / 2);
  }
  changeVolume();
}

globalThis.addEventListener('DOMContentLoaded', setVolume);

checkMute()

function setTrackDuration() {
  durationRange.max = Math.floor(audio.duration);
  durationRange.step = Math.floor(audio.duration);
  seekSlider.min = durationRange.min;
  seekSlider.max = durationRange.max;

  seekDuration.push(setInterval(updateSeek, 500));
}

function updateSeek() {
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
  showTimePlay(event);
  clearTimerDuration();
  seekSlider.addEventListener('mouseup', changeSeek)
  seekSlider.addEventListener('mouseup', setTrackDuration)
  seekSlider.addEventListener('mouseup', getDuration)
  seekSlider.addEventListener('mouseup', showTimePlay)
  seekSlider.addEventListener('mouseup', getCurrentDuration)
  seekSlider.addEventListener('mousemove', showTimePlay)
});

function showTimePlay(event) {
  currentDuration.textContent = fromSecToMin(event.target.value);
}

function changeSeek(event) {
  durationRange.max = Math.floor(audio.duration);
  seekSlider.max = durationRange.max;
  audio.currentTime = seekSlider.value;
}

function preLoad() {
  audio.src = playList[playNum].src;
  audio.load();
  audio.setAttribute('preload', 'metadata');
  audio.addEventListener('loadedmetadata', () => {
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
  let target = e.target || e;
  const min = target.min || 0;
  const max = target.max;
  const val = target.value || 0;

  if (val / max * 100 >= parseInt(target.style.backgroundSize, 10) + 10) {
    target.style.backgroundSize = val / max * 100 + '%';
    return;
  }

  target.style.backgroundSize = val / max * 100 + '%';
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange);
})

function setSize() {
  rangeInputs[0].style.backgroundSize = '0%';
  rangeInputs[1].style.backgroundSize = volSlider.value + '%';
}

globalThis.addEventListener('DOMContentLoaded', setSize);

let timeProgress = [];

function showTimeProgress() {
  handleInputChange(seekSlider);
}
function setTimeProgress() {
  showTimeProgress();
  timeProgress.push(setInterval(showTimeProgress, 500));
}

setTimeProgress();

function clearTimeProgress() {
  timeProgress.map((a) => {
    clearInterval(a);
    timeProgress = [];
  })
}

/*
  Block 9
*/

async function getLinkUnsplash() {
  const clientId = 'UrrZVZoXO3TuaXUbWdh7Ri63AZgPz_WkoYHZsc0fXSM';
  const orientation = 'landscape';
  const query = tags || getTimeOfDay();

  const url = `https://api.unsplash.com/photos/random?orientation=${orientation}&query=${query}&client_id=${clientId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const img = new Image();
    img.src = data.urls.regular;

    img.addEventListener('load', () => {
      body.style.backgroundImage = `url('${img.src}')`;
    });
  } catch (error) {
    if (lang === 'en') {
      alert('Image limit reached or tag is invalid!\nPlease choose another source in settings or type another tag.')
    } else {
      alert('Достигнут лимит изображений или введен некоректный тег!\nПожалуйста, выберите другой источник в настройках или введите другой тег.')
    }
  }
}

function randomFlickrNum(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  flickrNum = number;
}

let photos;

async function getLinkFlickr() {
  const apiKey = 'c3cf36fd7fddb1b32e389240c2d283f0';
  const tag = tags || getTimeOfDay();
  const tagMode = 'all';
  const extra = 'url_h';

  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&tag_mode=${tagMode}&extras=${extra}&format=json&nojsoncallback=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    photos = data.photos.photo.filter(el => el.url_h).sort((a, b) => a.id - b.id);
    const max = photos.length - 1;

    randomFlickrNum(0, max);

    rangeFlickr.max = max;

    const img = new Image();
    img.src = photos[flickrNum].url_h;

    img.addEventListener('load', () => {
      body.style.backgroundImage = `url('${img.src}')`;
    });

  } catch (error) {
    if (lang === 'en') {
      alert('Image limit reached or tag is invalid!\nPlease choose another source in settings or type another tag.')
    } else {
      alert('Достигнут лимит изображений или введен некоректный тег!\nПожалуйста, выберите другой источник в настройках или введите другой тег.')
    }
  }
}

function getFlickrImage() {
  const img = new Image();
  img.src = photos[flickrNum].url_h;

  img.addEventListener('load', () => {
    body.style.backgroundImage = `url('${img.src}')`;
  });
}

/*
  Block 10
*/

settingsBotton.addEventListener('mousedown', showSettings)
document.addEventListener('mousedown', closeSettings)

function showSettings(event) {
  settingsBlock.classList.toggle('none');
}

function closeSettings(event) {
  if (!event.target.closest('.settings-container')) {
    settingsBlock.classList.add('none');
  }
}

const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const addButton = document.querySelector('.todo-add');
const todoUl = document.querySelector('.todo-ul');
const inputText = document.querySelector('.todo-input.text');
const todoSelect = document.querySelector('.todo-select')

todoButton.addEventListener('mousedown', showTodo)
document.addEventListener('mousedown', closeTodo)

function showTodo(event) {
  todoList.classList.toggle('none');
}

function closeTodo(event) {
  if (!event.target.closest('.todo-container')) {
    todoList.classList.add('none');
  }
}

let numItem = 1;

function createTodoItem() {
  if (!inputText.value) {
    return;
  }

  const li = document.createElement('li');
  li.classList.add('todo-item');
  const input = document.createElement('input');
  input.classList.add('todo-input');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', `item${numItem}`);
  input.setAttribute('id', `item${numItem}`);
  const label = document.createElement('label');
  label.classList.add('todo-label');
  label.setAttribute('for', `item${numItem}`);
  const button = document.createElement('button');
  button.classList.add('delete', 'none')
  li.append(input, ' ', label, ' ', button);
  label.textContent = ' ' + inputText.value;
  todoUl.append(li);
  inputText.value = '';
  numItem++;
}

addButton.addEventListener('mousedown', createTodoItem)
addButton.addEventListener('mousedown', autoTodoScroll)
inputText.addEventListener('keypress', pressEnter)

function pressEnter(event) {
  if (event.key === "Enter") {
    createTodoItem();
  }
  autoTodoScroll();
}

function autoTodoScroll() {
  todoBlock.forEach((el, i) => {
    el.scrollTop = el.scrollHeight;
  })
}

const options = document.querySelectorAll('.todo-option');
const todoBlock = document.querySelectorAll('.todo-block');
const todoAdd = document.querySelector('.todo-input-container')
let selectedNum = 0;

todoSelect.addEventListener('change', detectSelected)
globalThis.addEventListener('DOMContentLoaded', setTodoTab)

function detectSelected() {
  options.forEach((el, i) => {
    if (el.selected) {
      selectedNum = i;
      if (el.textContent === 'Done') {
        todoAdd.style.display = 'none';
      } else {
        todoAdd.style.display = '';
      }
    }
  })
  setTodoTab();
}

function setTodoTab() {
  todoBlock.forEach((el, i) => {
    if (i !== selectedNum) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  })
}

function deleteElement(event) {
  if (event.target.classList.contains('delete')) {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
  }
}

todoUl.addEventListener('click', deleteElement);

const clearButton = document.querySelector('.clear-button');

clearButton.addEventListener('click', clearList);

function clearList(event) {
  while (todoUl.firstChild) {
    todoUl.removeChild(todoUl.firstChild);
  }
  numItem = 0;
}

todoUl.addEventListener('click', makeChecked)

function makeChecked(event) {
  if (event.target.classList.contains('todo-input') && event.target.type === 'checkbox') {
    if (event.target.checked) {
      event.target.setAttribute('checked', 'true')
    } else {
      event.target.removeAttribute('checked')
    }
  }
}

function set() {
  if (todoUl.innerHTML) {
    localStorage.setItem('numItem', numItem);
  }
  localStorage.setItem('todoes', todoUl.innerHTML);
}

function get() {
  if (localStorage.getItem('numItem')) {
    numItem = localStorage.getItem('numItem');
  }
  if (localStorage.getItem('todoes')) {
    todoUl.innerHTML = localStorage.getItem('todoes');
  }
}

globalThis.addEventListener('beforeunload', set);
globalThis.addEventListener('DOMContentLoaded', get);

const formList = document.querySelector('.form-list');

formList.addEventListener('click', setBlockNone)

function setBlockNone(event) {
  if (event.target.classList.contains('settings-input')) {
    document.querySelector(`.${event.target.value}`).classList.toggle('none-top');
  }
}

const settingsSelect = document.querySelectorAll('.settings-select')

settingsSelect.forEach(el => {
  el.addEventListener('change', changeSmth);
})

function changeSmth(event) {
  switch (event.target.value) {
    case 'github':
      github = true;
      unsplash = false;
      flickr = false;
      break;
    case 'unsplash':
      github = false;
      unsplash = true;
      flickr = false;
      break;
    case 'flickr':
      github = false;
      unsplash = false;
      flickr = true;
      break;
    default:
      break;
  }

  setBg();
}

formList.addEventListener('click', makeCheckedSettings)

function makeCheckedSettings(event) {
  if (event.target.classList.contains('settings-input')) {
    if (event.target.checked) {
      event.target.setAttribute('checked', 'true')
    } else {
      event.target.removeAttribute('checked')
    }
  }
}

const inputsSettings = document.querySelectorAll('.settings-input');

function setSettings(event) {
  const result = [];
  inputsSettings.forEach(el => {
    result.push(el.checked);
  })
  localStorage.setItem('settings', result)
}

function getSettings(event) {
  const settings = localStorage.getItem('settings');
  if (settings) {
    const arr = settings.split(',');
    for (let i = 0; i < arr.length; i++) {
      inputsSettings[i].checked = JSON.parse(arr[i]);
    }
  }
  settingsLoadCheck();
}

globalThis.addEventListener('beforeunload', setSettings);
globalThis.addEventListener('DOMContentLoaded', getSettings);

function settingsLoadCheck(event) {
  inputsSettings.forEach(el => {
    if (!el.checked) {
      document.querySelector(`.${el.value}`).classList.toggle('none-top');

    }
  })
}

const settingsOptions = document.querySelectorAll('.settings-option');

const optionLang = document.querySelector('.lang-detect')

optionLang.addEventListener('change', setLang)

function setLang(event) {
  lang = optionLang.value;
  changeLang();
}

function changeLang() {
  getWeather();
  getQuotes();
  getTimeOfDay();
  showDate();
  setDefaultCity();
  setPlaceholder();
  inputText.placeholder = translate.placeholder.todo[lang];
  document.querySelector('.todo-label').textContent = translate.text.tab[lang];
  options[0].textContent = translate.text.today[lang];
  clearButton.textContent = translate.text.clear[lang];
  tagInput.placeholder = translate.placeholder.tag[lang];
  translateSettings();
}

function translateSettings() {
  const labels = document.querySelectorAll('.settings-label');
  labels.forEach(el => {
    el.textContent = translate.settings[el.getAttribute('for')][lang];
  })
  const optionLang = document.querySelectorAll('.lang-detect .settings-option');
  optionLang.forEach(el => {
    el.textContent = translate.settings.lang.options[el.value][lang];
  })
}

function setOption(event) {
  localStorage.setItem('lang', optionLang.value);

  const obj = {};
  settingsOptions.forEach(el => {
    if (el.selected) {
      obj[el.value] = el.selected
    }
  })
  localStorage.setItem('options', JSON.stringify(obj))
}

function getOption(event) {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  }

  const settings = localStorage.getItem('options');
  if (settings) {
    const obj = JSON.parse(settings);
    for (let key in obj) {
      document.querySelector(`.settings-option[value=${key}]`).selected = obj[key];
    }
  }

  changeLang();
}

globalThis.addEventListener('beforeunload', setOption);
globalThis.addEventListener('DOMContentLoaded', getOption);
