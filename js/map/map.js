'use strict';

import './leaflet-map.js';



// Location btn
const locationBtn = document.querySelector('.filter-layers__location-btn');
if (locationBtn) {
    locationBtn.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
            enableHighAccuracy: true
        });
    });
}
function successLocation(userPosition) {
    console.log(userPosition);

    const lat = userPosition.coords.latitude;
    const lng = userPosition.coords.longitude;

    L.marker([lat, lng], { icon: userLocationIcon, alt: 'Ваше местоположение' }).bindPopup('Ваше местоположение').addTo(map);
}
function errorLocation(error) {
    console.log(error);
    console.log(error.code);
    console.log(error.message);
}




const customLayersCheckboxes = document.querySelectorAll('.filter-layers__custom-checkbox input[type=checkbox]');
let checkedCustomCheckboxesCounter = 0;
const clearFiltersBtnSpan = document.querySelector('.filter-layers__clear-button > span');
clearFiltersBtnSpan.textContent = checkedCustomCheckboxesCounter || '';
const clearFiltersBtn = document.querySelector('.filter-layers__clear-button');
const foundPointsSpan = document.querySelector('.filter-layers__found-points > span');

clearFiltersBtn.addEventListener('click', () => {
    customLayersCheckboxes.forEach(customCheckbox => {
        customCheckbox.checked = false;
    });
    checkedCustomCheckboxesCounter = 0;
    clearFiltersBtnSpan.textContent = checkedCustomCheckboxesCounter || '';

    resetLeafletControls();
    setFoundPoints(0);
});

function setFoundPoints(number) {
    foundPointsSpan.textContent = number || 0;
}




const leafletLayersCheckboxes = document.querySelectorAll('.leaflet-control-layers-overlays .leaflet-control-layers-selector');
const leafletMarkersPane = document.querySelector('.leaflet-pane .leaflet-marker-pane');

function resetLeafletControls() {
    resetLeafletLayersCheckboxes();
    clearAllLeafletMarkers();
}
function resetLeafletLayersCheckboxes() {
    leafletLayersCheckboxes.forEach(layerCheckbox => {
        layerCheckbox.checked = false;
    });
}
function clearAllLeafletMarkers() {
    leafletMarkersPane.innerHTML = '';
}
resetLeafletControls();




if (customLayersCheckboxes.length === leafletLayersCheckboxes.length) {
    console.log('%cКол-во кастомных и leaflet чекбоксов совпадает. Продолжение работы скрипта', 'font-weight: bold; color: limegreen;');

    customLayersCheckboxes.forEach((customCheckbox, index) => {
        customCheckbox.addEventListener('change', function () {
            this.checked ? checkedCustomCheckboxesCounter++ : checkedCustomCheckboxesCounter--;
            clearFiltersBtnSpan.textContent = checkedCustomCheckboxesCounter || '';

            //setFoundPoints(11)

            const leafletLayersCheckbox = leafletLayersCheckboxes[index];

            if (!leafletLayersCheckbox.checked) {
                leafletLayersCheckbox.checked = true;
                leafletLayersCheckbox.click();
                leafletLayersCheckbox.click();
            } else {
                leafletLayersCheckbox.checked = false;
                leafletLayersCheckbox.click();
                leafletLayersCheckbox.click();
            }
        });
    });

} else {
    console.error('Кол-во кастомных и leaflet чекбоксов не совпадает!');
}