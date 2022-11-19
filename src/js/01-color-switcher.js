const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = startBtnEl.nextElementSibling;
let setIntervalID = null;

pageInit();

startBtnEl.addEventListener('click', () => {
    changeBodyColor();
    setIntervalID = setInterval(changeBodyColor, 1000);
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
});

stopBtnEl.addEventListener('click', () => {
    clearInterval(setIntervalID);
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;
})

function pageInit() {
    stopBtnEl.disabled = true;
}

function changeBodyColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
