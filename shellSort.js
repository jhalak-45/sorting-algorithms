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

async function shellSort() {
    const n = array.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j = i;
            updateBar(j, array[j], 'current');
            while (j >= gap && array[j - gap] > temp) {
                updateBar(j, array[j], 'comparing');
                array[j] = array[j - gap];
                updateBar(j - gap, array[j - gap], 'comparing');
                updateBar(j, array[j], 'comparing');
                await sleep(speed);
                updateBar(j, array[j], '');
                j -= gap;
            }
            array[j] = temp;
            updateBar(j, array[j], 'current');
            await sleep(speed);
            updateBar(j, array[j], '');
        }
        gap = Math.floor(gap / 2);
    }

    displayArray();
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
    shellSort().then(() => {
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
