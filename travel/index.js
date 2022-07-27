alert('Добрового времени суток тебе!\n\tСпасибо, что тратишь время и проверяешь мою работу. Я это ценю!\n\tУ меня есть маленькая просьба, если тебя она не обременит, конечно. Можешь проверить мою работу через день или ближе к дедлайну? Я очень хочу разобраться и сделать нормально этот сайт. Спасибо! \n\tP.S. Это сообщение пропадет как будет все готово, я не буду тянуть до последнего, но в поезде из Батуми в Ереван сети может не быть, поэтому очень прошу дождаться 14 числа!')
// console.log("Score: 85/75\n1. Вёрстка соответствует макету. Ширина экрана 390px (48)\n\t- блок <header> (6)\n\t- секция preview (9)\n\t- секция steps (9)\n\t- секция destinations (9)\n\t- секция stories (9)\n\t- блок <footer> (6)\n2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (15)\n\t- нет полосы прокрутки при ширине страницы от 1440рх до 390px (7)\n\t- нет полосы прокрутки при ширине страницы от 390px до 320рх (8)\n3. На ширине экрана 390рх и меньше реализовано адаптивное меню (22)\n\t- при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка (2)\n\t- при нажатии на бургер-иконку плавно появляется адаптивное меню (4)\n\t- адаптивное меню соответствует макету (4)\n\t- при нажатии на крестик адаптивное меню плавно скрывается уезжая за экранпри нажатии на крестик адаптивное меню плавно скрывается уезжая за экран (4)\n\t- ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (4)\n\t- при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна (4)")

let addClass = () => {
    let elementOne = document.getElementById("pop");
    elementOne.classList.add("active");
    let elementTwo = document.getElementById("over");
    elementTwo.classList.add("active")
    let body = document.querySelector("body");
    body.style.overflow = "hidden"
}

let closePop = () => {
    let elementOne = document.getElementById("pop");
    elementOne.classList.remove("active");
    let elementTwo = document.getElementById("over");
    elementTwo.classList.remove("active");
    let elementThree = document.getElementById("log_pop");
    elementThree.classList.add("unactive");
    let elementFour = document.getElementById("reg_pop");
    elementFour.classList.add("unactive");
    let body = document.querySelector("body");
    body.style.overflow = "auto"
    let element5 = document.getElementById("log_pop");
    element5.classList.remove("none");
}

function showLog() {
    let log = document.getElementById("log_pop");
    let reg = document.getElementById("reg_pop");
    let over = document.getElementById("over");
    let body = document.querySelector("body");
    log.classList.remove("unactive");
    over.classList.add("active");
    body.style.overflow = "hidden"
    reg.classList.add("none");
    reg.classList.remove("unactive");
}

function clickReg() {
    let elementOne = document.getElementById("log_pop");
    elementOne.classList.add("none");
    let elementTwo = document.getElementById("reg_pop");
    elementTwo.classList.remove("none")
    let element3 = document.getElementById("reg_pop");
    element3.classList.remove("unactive")
    
}    

function clickLog() {
    let elementOne = document.getElementById("reg_pop");
    elementOne.classList.add("none");
    let elementTwo = document.getElementById("log_pop");
    elementTwo.classList.remove("none")
}    

