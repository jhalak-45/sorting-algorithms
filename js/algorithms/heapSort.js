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

async function heapSort() {
    const n = array.length;
    
    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [array[0], array[i]] = [array[i], array[0]];
        updateBar(0, array[0], 'swapping');
        updateBar(i, array[i], 'swapping');
        await sleep(speed);
        updateBar(0, array[0], '');
        updateBar(i, array[i], 'sorted');

        // Call heapify on the reduced heap
        await heapify(i, 0);
    }

    displayArray();
}

async function heapify(n, i) {
    const bars = document.getElementsByClassName('bar');
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        updateBar(i, array[i], 'heap');
        updateBar(largest, array[largest], 'heap');
        await sleep(speed);
        updateBar(i, array[i], '');
        updateBar(largest, array[largest], '');

        await heapify(n, largest);
    }
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
    heapSort().then(() => {
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
