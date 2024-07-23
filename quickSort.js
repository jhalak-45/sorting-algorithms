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

async function quickSort(arr = array, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
    displayArray();
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    const bars = document.getElementsByClassName('bar');

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = 'red';
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            updateBar(i, arr[i]);
            updateBar(j, arr[j]);
        }
        await sleep(speed);
        bars[j].style.backgroundColor = '#3498db';
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    updateBar(i + 1, arr[i + 1]);
    updateBar(high, arr[high]);
    return i + 1;
}

function updateBar(index, value) {
    const bar = document.getElementsByClassName('bar')[index];
    bar.style.height = `${value * 3}px`;
    bar.innerText = value;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sortButton.addEventListener('click', () => {
    speed = parseFloat(speedInput.value) * 1000;
    quickSort().then(() => {
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
