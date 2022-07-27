alert('28.07.22 3:24 Добрового времени суток тебе!\n\tСпасибо, что тратишь время и проверяешь мою работу. Я это ценю!\n\tУ меня есть маленькая просьба, если тебя она не обременит, конечно. Можешь проверить мою работу через день или ближе к дедлайну? Я очень хочу разобраться и сделать нормально этот сайт. Спасибо! \n\tP.S. Это сообщение пропадет как будет все готово, я не буду тянуть до последнего, но в поезде из Батуми в Ереван сети может не быть, поэтому очень прошу дождаться 14 числа!')
// console.log("Score: 85/75\n1. Вёрстка соответствует макету. Ширина экрана 390px (48)\n\t- блок <header> (6)\n\t- секция preview (9)\n\t- секция steps (9)\n\t- секция destinations (9)\n\t- секция stories (9)\n\t- блок <footer> (6)\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (15)\n\t- нет полосы прокрутки при ширине страницы от 1440рх до 390px (7)\n\t- нет полосы прокрутки при ширине страницы от 390px до 320рх (8)\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню (22)\n\t- при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка (2)\n\t- при нажатии на бургер-иконку плавно появляется адаптивное меню (4)\n\t- адаптивное меню соответствует макету (4)\n\t- при нажатии на крестик адаптивное меню плавно скрывается уезжая за экранпри нажатии на крестик адаптивное меню плавно скрывается уезжая за экран (4)\n\t- ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (4)\n\t- при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна (4)")

let addClass = () => {
  let pop = document.getElementById("pop");
  let over = document.getElementById("over");
  let body = document.querySelector("body");
  pop.classList.add("active");
  over.classList.add("active")
  body.style.overflow = "hidden"
}

let closePop = () => {
  let pop = document.getElementById("pop");
  let over = document.getElementById("over");
  let body = document.querySelector("body");
  let log = document.getElementById("log_pop");
  let reg = document.getElementById("reg_pop");
  pop.classList.remove("active");
  over.classList.remove("active");
  body.style.overflow = "auto"
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
  body.style.overflow = "hidden"
  log.classList.remove("unactive");
  reg.classList.add("none");
  reg.classList.remove("unactive");
}

function clickReg() {
  let log = document.getElementById("log_pop");
  let reg = document.getElementById("reg_pop");
  log.classList.add("none");
  reg.classList.remove("none")

}

function clickLog() {
  let reg = document.getElementById("reg_pop");
  let log = document.getElementById("log_pop");
  reg.classList.add("none");
  log.classList.remove("none")
}

function alertData() {
  let inputs = document.getElementsByClassName('form__input');
  let formLog = document.getElementById('form_log')
  let formReg = document.getElementById('form_reg')
  let data = `E-mail: ${inputs[0].value}\nPassword: ${inputs[1].value}`;
  formLog.reset();
  formReg.reset();
  alert(data);
}

// Slider
