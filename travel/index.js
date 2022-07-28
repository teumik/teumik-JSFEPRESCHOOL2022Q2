// alert('28.07.22 3:24 Добрового времени суток тебе!\n\tСпасибо, что тратишь время и проверяешь мою работу. Я это ценю!\n\tУ меня есть маленькая просьба, если тебя она не обременит, конечно. Можешь проверить мою работу через день или ближе к дедлайну? Я очень хочу разобраться и сделать нормально этот сайт. Спасибо! \n\tP.S. Это сообщение пропадет как будет все готово, я не буду тянуть до последнего, но в поезде из Батуми в Ереван сети может не быть, поэтому очень прошу дождаться 14 числа!')
console.log("Score: 125/100\n1. Слайдер изображений в секции destinations (50)\n\t- На десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку (20)\n\t- Три точки внизу отображают 'номер слайда', то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) (20)\n\t- Анимации плавного перемещения для слайдера (10)\n2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап (50)\n\t- логин попап соответствует верстке его закрытие происходит при клике вне попапа (25)\n\t- логин попап имеет 2 инпута (email и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег) (25)\n3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение) (25)");

let addClass = () => {
  let pop = document.getElementById("pop");
  let over = document.getElementById("over");
  let body = document.querySelector("body");
  pop.classList.add("active");
  over.classList.add("active");
  body.style.overflow = "hidden";
}

let closePop = () => {
  let pop = document.getElementById("pop");
  let over = document.getElementById("over");
  let body = document.querySelector("body");
  let log = document.getElementById("log_pop");
  let reg = document.getElementById("reg_pop");
  pop.classList.remove("active");
  over.classList.remove("active");
  body.style.overflow = "auto";
  log.classList.add("unactive");
  log.classList.remove("none");
  reg.classList.add("unactive");
}

function showLog() {
  let over = document.getElementById("over");
  let body = document.querySelector("body");
  let log = document.getElementById("log_pop");
  let reg = document.getElementById("reg_pop");
  over.classList.add("active");
  body.style.overflow = "hidden";
  log.classList.remove("unactive");
  reg.classList.add("none");
  reg.classList.remove("unactive");
}

function clickReg() {
  let log = document.getElementById("log_pop");
  let reg = document.getElementById("reg_pop");
  log.classList.add("none");
  reg.classList.remove("none");

}

function clickLog() {
  let reg = document.getElementById("reg_pop");
  let log = document.getElementById("log_pop");
  reg.classList.add("none");
  log.classList.remove("none");
}

function alertData() {
  let inputs = document.getElementsByClassName('form__input');
  let formLog = document.getElementById('form_log');
  let formReg = document.getElementById('form_reg');
  let data = `E-mail: ${inputs[0].value}\nPassword: ${inputs[1].value}`;

  if (inputs[0].value && inputs[1].value) {
    formLog.reset();
    formReg.reset();
    alert(data);
  }
}

let imgs = document.querySelectorAll('.country-preview');
let scroll = document.querySelector('.country-scroll');
let imgOne = imgs[0];
let imgTwo = imgs[1];
let imgThree = imgs[2];
let dots = document.querySelectorAll('.dot_item');
let arrLeft = document.querySelector('.arrow-container-left');
let arrRight = document.querySelector('.arrow-container-right');


imgOne.addEventListener('click', function () {
  scroll.classList.add('left');
  dots[1].classList.remove('active');
  dots[0].classList.add('active');
});
imgTwo.addEventListener('click', function () {
  scroll.classList.remove('left');
  scroll.classList.remove('right');
  dots[0].classList.remove('active');
  dots[1].classList.add('active');
  dots[2].classList.remove('active');
});
imgThree.addEventListener('click', function () {
  scroll.classList.add('right');
  dots[1].classList.remove('active');
  dots[2].classList.add('active');
});

arrLeft.addEventListener('click', function () {
  if (scroll.classList.contains('right')) {
    scroll.classList.add('middle');
    scroll.classList.remove('right');
    scroll.classList.remove('left');
    dots[0].classList.remove('active');
    dots[1].classList.add('active');
    dots[2].classList.remove('active');
    arrRight.classList.remove('active');
    return;
  } else if (scroll.classList.contains('middle')) {
    scroll.classList.add('left');
    scroll.classList.remove('middle');
    scroll.classList.remove('right');
    dots[0].classList.add('active');
    dots[1].classList.remove('active');
    dots[2].classList.remove('active');
    arrLeft.classList.add('active');
    return;
  } else if (!scroll.classList.contains('middle' || 'right' || 'left')) {
    scroll.classList.add('left');
    scroll.classList.remove('right');
    dots[0].classList.add('active');
    dots[1].classList.remove('active');
    dots[2].classList.remove('active');
    arrLeft.classList.add('active');
    return;
  }
});

arrRight.addEventListener('click', function () {
  if (scroll.classList.contains('left')) {
    scroll.classList.add('middle');
    scroll.classList.remove('left');
    scroll.classList.remove('right');
    dots[0].classList.remove('active');
    dots[1].classList.add('active');
    dots[2].classList.remove('active');
    arrLeft.classList.remove('active');
    return;
  } else if (scroll.classList.contains('middle')) {
    scroll.classList.add('right');
    scroll.classList.remove('middle');
    scroll.classList.remove('left');
    dots[0].classList.remove('active');
    dots[1].classList.remove('active');
    dots[2].classList.add('active');
    arrRight.classList.add('active');
    return;
  } else if (!scroll.classList.contains('middle' || 'right' || 'left')) {
    scroll.classList.add('right');
    scroll.classList.remove('left');
    dots[0].classList.remove('active');
    dots[1].classList.remove('active');
    dots[2].classList.add('active');
    arrRight.classList.add('active');
    return;
  }
});