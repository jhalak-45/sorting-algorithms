const arrayContainer = document.getElementById('array-container');
const sortButton = document.getElementById('sort-button');
const generateButton = document.getElementById('generate-button');
const speedInput = document.getElementById('speed');
const setElementsButton = document.getElementById('set-elements-button');
const arraySizeInput = document.getElementById('array-size');
const arrayElementsInput = document.getElementById('array-elements');
const errText = document.getElementById('err');

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
        errText.innerText = ""; // Clear error message
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

async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red'; // Current bar

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'yellow'; // Comparing bar
            await sleep(speed);
            bars[j + 1].style.height = `${array[j] * 3}px`;
            bars[j + 1].innerText = array[j];
            array[j + 1] = array[j];
            bars[j].style.backgroundColor = '#3498db'; // Reset to default color
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].innerText = key;
        bars[i].style.backgroundColor = '#3498db'; // Reset to default color
    }
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted'); // Sorted bar
        bars[i].style.backgroundColor = '#2ecc71'; // Green color for sorted
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sortButton.addEventListener('click', () => {
    speed = parseFloat(speedInput.value) * 1000;
    insertionSort();
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
