let touchstartX = 0;
let touchendX = 0;
let images = [];
let currentIndex = 0;
let autoplayInterval = null;
const autoplayDelay = 1000;
const areaSelector = document.getElementById('areaSelector');
const forecastSelector = document.getElementById('forecastSelector');


function showImage(index) {
   images.forEach((img, i) => {
        img.classList.toggle('hidden', i !== index);
    });
}

function prevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    showImage(currentIndex);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function resetAutoPlay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

function handleSwipe() {
    if (touchendX < touchstartX) nextImage();
    else if (touchendX > touchstartX) prevImage();
}

function updateCarousel() {
    const selectedArea = areaSelector.value;
    const selectedForecast = forecastSelector.value;
    const forecastId = `${selectedArea}-${selectedForecast}`;
    const allForecasts = document.querySelectorAll('.forecast');

    allForecasts.forEach(fc => fc.classList.add('hidden'));

    const selectedCarousel = document.getElementById(`forecast-${forecastId}`);
    if (selectedCarousel) {
        const prevButton = document.getElementById(`prevButton-${forecastId}`);
        const nextButton = document.getElementById(`nextButton-${forecastId}`);
        const autoPlayButton = document.getElementById(`autoPlayButton-${forecastId}`);
        const playImage = document.getElementById(`playImage-${forecastId}`);
        const pauseImage = document.getElementById(`pauseImage-${forecastId}`);

        selectedCarousel.classList.remove('hidden');
        resetAutoPlay();
        playImage.hidden = false;
        pauseImage.hidden = true;
        currentIndex = 0;
        images = selectedCarousel.querySelectorAll('.forecast-image');
        showImage(currentIndex)

        prevButton.addEventListener('click', prevImage);
        nextButton.addEventListener('click', nextImage);

        autoPlayButton.addEventListener('click', function() {
            playImage.hidden = !playImage.hidden;
            pauseImage.hidden = !pauseImage.hidden;
            if (autoplayInterval) {
                resetAutoPlay();
            } else {
                autoplayInterval = setInterval(nextImage, autoplayDelay);
            }
        });

        selectedCarousel.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        });

        selectedCarousel.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        const currentUrl = new URL(window.location.href)
        currentUrl.searchParams.set('forecast', `${selectedForecast}`);
        window.history.replaceState(null, null, currentUrl.toString());
    }
}

function updateForecast() {
    const selectedArea = areaSelector.value;
    const selectedForecast = forecastSelector.value;
    if (selectedArea) {
        window.location.href = `/${selectedArea}/?forecast=${selectedForecast}`;
    }
}

areaSelector.addEventListener('change', updateForecast);
forecastSelector.addEventListener('change', updateCarousel);

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const forecastParam = urlParams.get('forecast');

    if (forecastParam) {
        forecastSelector.value = forecastParam;
    }

    if (window.location.pathname.startsWith('/adriatic')) {
        areaSelector.classList.remove('hidden');
        forecastSelector.classList.remove('hidden');
    }

    const now = new Date();
    const timezoneOffsetInHours = (now.getTimezoneOffset() / 60) * -1; // reverse sign
    const formattedNumber = `${timezoneOffsetInHours > 0 ? '+' : (timezoneOffsetInHours < 0 ? '-' : '')}${timezoneOffsetInHours}`;
    const allTimezones = document.querySelectorAll('.timezoneDifference');
    allTimezones.forEach(tz => tz.textContent = `UTC na vaš čas: ${formattedNumber}h`);

    updateCarousel();
});
