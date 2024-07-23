
const menu = document.getElementById('menu');
const openBtn = document.getElementById('menubtn');
const closeBtn = document.querySelector('.close-btn');
const downloadButton = document.getElementById('download-button');

openBtn.addEventListener('click', () => {
    menu.style.width = '250px';
});

closeBtn.addEventListener('click', () => {
    menu.style.width = '0';
});

window.addEventListener('click', (event) => {
    if (event.target !== menu && event.target !== openBtn && !menu.contains(event.target)) {
        menu.style.width = '0';
    }
});

// download image
downloadButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const bars = document.querySelectorAll('#array-container .bar');
    const barWidth = 30;
    const barMargin = 2;
    const height = arrayContainer.offsetHeight;
    const width = barWidth * bars.length + barMargin * (bars.length - 1);

    canvas.width = width;
    canvas.height = height;

    bars.forEach((bar, index) => {
        const value = parseFloat(bar.style.height);
        const barHeight = value;
        const x = index * (barWidth + barMargin);
        const y = height - barHeight;
        context.fillStyle = getComputedStyle(bar).backgroundColor;
        context.fillRect(x, y, barWidth, barHeight);
        context.fillStyle = '#000';
        context.font = '14px Arial';
        context.textAlign = 'center';
        context.fillText(bar.innerText, x + barWidth / 2, y - 10);
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'sorted-array.png';
    link.click();
});
