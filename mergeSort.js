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
    } else {
        errText.innerText = "Enter array elements separated by commas.";
    }
}

function displayArray() {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.innerText = value;
        bar.setAttribute('data-index', index);
        arrayContainer.appendChild(bar);
    });
}

async function mergeSort(arr = array, start = 0) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    const sortedLeft = await mergeSort(left, start);
    const sortedRight = await mergeSort(right, start + mid);

    return merge(sortedLeft, sortedRight, start);
}

async function merge(left, right, start) {
    const result = [];
    let leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        const leftElementIndex = start + leftIndex;
        const rightElementIndex = start + left.length + rightIndex;
        updateBar(leftElementIndex, 'comparing');
        updateBar(rightElementIndex, 'comparing');

        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
        await sleep(speed);
        updateDisplay(result.concat(left.slice(leftIndex), right.slice(rightIndex)), start);
        updateBar(leftElementIndex, '');
        updateBar(rightElementIndex, '');
    }
    
    const finalArray = result.concat(left.slice(leftIndex), right.slice(rightIndex));
    updateDisplay(finalArray, start);
    finalArray.forEach((value, index) => {
        updateBar(start + index, 'current');
    });
    await sleep(speed);
    finalArray.forEach((value, index) => {
        updateBar(start + index, 'sorted');
    });
    return finalArray;
}

function updateDisplay(arrayToDisplay, start) {
    arrayToDisplay.forEach((value, index) => {
        const bar = document.querySelector(`.bar[data-index='${start + index}']`);
        if (bar) {
            bar.style.height = `${value * 3}px`;
            bar.innerText = value;
        }
    });
}

function updateBar(index, className) {
    const bar = document.querySelector(`.bar[data-index='${index}']`);
    if (bar) {
        bar.className = `bar ${className}`;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

sortButton.addEventListener('click', () => {
    speed = parseFloat(speedInput.value) * 1000;
    mergeSort().then(() => {
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
