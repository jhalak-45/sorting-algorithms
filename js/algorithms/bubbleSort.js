const arrayContainer = document.getElementById('array-container');
const sortButton = document.getElementById('sort-button');
const generateButton = document.getElementById('generate-button');
const speedInput = document.getElementById('speed');
const setElementsButton = document.getElementById('set-elements-button');
const arraySizeInput = document.getElementById('array-size');
const arrayElementsInput = document.getElementById('array-elements');
const errText = document.getElementById('err');
let array = [];
let speed = parseFloat(speedInput.value) * 1000;

function generateArray(size = 15) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function setArrayElements(elements) {
    if (elements) {
        array = elements.split(',').map(Number);
        displayArray();
    } else {
        errText.innerText = "Enter array elements separated by commas.";
    }
}

function displayArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.innerText = value;
        arrayContainer.appendChild(bar);
    });
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add('comparing'); // Comparing bar
            bars[j + 1].classList.add('comparing'); // Comparing bar
            await sleep(speed);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j].innerText = array[j];
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                bars[j + 1].innerText = array[j + 1];
            }
            bars[j].classList.remove('comparing');
            bars[j + 1].classList.remove('comparing');
        }
        bars[array.length - i - 1].classList.add('sorted'); // Sorted bar
    }
    bars[0].classList.add('sorted'); // Sorted bar
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sortButton.addEventListener('click', () => {
    speed = parseFloat(speedInput.value) * 1000;
    bubbleSort().then(() => {
        displayArray();
        const bars = document.getElementsByClassName('bar');
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.add('sorted');
        }
    });
});

generateButton.addEventListener('click', () => {
    const size = parseInt(arraySizeInput.value);
    generateArray(size);
});

setElementsButton.addEventListener('click', () => {
    const elements = arrayElementsInput.value;
    setArrayElements(elements);
});

generateArray();
