let currentIndex = 0;
let images = [];
const areaSelector = document.getElementById('areaSelector');
const forecastSelector = document.getElementById('forecastSelector');

function showImage(index) {
   images.forEach((img, i) => {
        img.classList.toggle('hidden', i !== index);
    });
}

function updateCarousel() {
    const selectedArea = areaSelector.value;
    const selectedForecast = forecastSelector.value;
    const forecastId = `forecast-${selectedArea}-${selectedForecast}`;
    const allForecasts = document.querySelectorAll('.forecast');

    allForecasts.forEach(fc => fc.classList.add('hidden'));

    const selectedCarousel = document.getElementById(forecastId);
    if (selectedCarousel) {
        const prevButton = document.getElementById(`prevButton-${selectedArea}-${selectedForecast}`);
        const nextButton = document.getElementById(`nextButton-${selectedArea}-${selectedForecast}`);

        selectedCarousel.classList.remove('hidden');
        currentIndex = 0;
        images = selectedCarousel.querySelectorAll('.forecast-image');
        showImage(currentIndex)

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
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
    allTimezones.forEach(tz => tz.textContent = `UTC na lokalni čas: ${formattedNumber}h`);

    updateCarousel();
});
