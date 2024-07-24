const arrayContainer = document.getElementById('array-container');
const sortButton = document.getElementById('sort-button');
const generateButton = document.getElementById('generate-button');
const speedInput = document.getElementById('speed');
const setElementsButton = document.getElementById('set-elements-button');
const arraySizeInput = document.getElementById('array-size');
const arrayElementsInput = document.getElementById('array-elements');

let array = [];
let speed = 100;

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
        document.getElementById('err').innerText = "Enter Array Elements separated by commas.";
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

async function exchangeSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        updateBar(i, array[i], 'current');
        for (let j = i + 1; j < array.length; j++) {
            updateBar(j, array[j], 'comparing');
            await sleep(speed);
            updateBar(j, array[j], '');
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            displayArray();
            await sleep(speed);
        }
        bars[i].classList.add('sorted');
    }
    bars[array.length - 1].classList.add('sorted');
}

function updateBar(index, value, className) {
    const bar = document.getElementsByClassName('bar')[index];
    bar.style.height = `${value * 3}px`;
    bar.innerText = value;
    bar.className = `bar ${className}`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sortButton.addEventListener('click', () => {
    speed = parseFloat(speedInput.value) * 1000;
    exchangeSort().then(() => {
        const bars = document.getElementsByClassName('bar');
        for (let i = 0; i < bars.length; i++) {
            bars[i].classList.add('sorted');
            bars[i].classList.remove('current');

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
