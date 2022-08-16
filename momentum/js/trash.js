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

circle[1].onmousedown = function (event) {
  let shiftX = event.clientX - progress[1].getBoundingClientRect().right;

  console.log(event.clientX, 'clientx');

  moveAt(event.pageX);

  function moveAt(pageX) {
    // progress[1].style.width = pageX - field[1].offsetLeft + 'px';
    progress[1].style.width = pageX - shiftX - field[1].offsetLeft + 'px';

    console.log(pageX, 'pagex');
    console.log(progress[1].style.width, 'width');
  }

  function onMouseMove(event) {
    moveAt(event.pageX);
  }

  field[1].addEventListener('mousemove', onMouseMove);



  circle[1].onmouseup = function () {
    console.log('end');
    circle[1].removeEventListener('mousemove', onMouseMove);
    field[1].onmouseup = null;
  };

  circle[1].ondragstart = function () {
    console.log('start');
    return false;
  };

};
