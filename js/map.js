'use strict';

const SEVASTOPOL_COORDS = [44.556972, 33.526402];
const INITIAL_ZOOM = 12;

let batteriesIcon = L.icon({
    iconUrl: './../img/map-pin-2-fill.svg',
    iconSize: [40, 40],
});

let lightbulbsIcon = L.icon({
    iconUrl: './../img/lightbulbs-location-icon.svg',
    iconSize: [40, 40],
});

let userLocationIcon = L.icon({
    iconUrl: './../img/user-location-icon.svg',
    iconSize: [60, 60],
});




let batteriesPoints = [
    // 1
    {
        geoPosition: {
            latitude: 44.573424,
            longitude: 33.508811
        },
        category: ['batteries', 'lightbulbs'],
        address: '',
        name: 'Sunny Point',
        description: 'Lorem ipsum ahmet',
        lastChange: '22.04.2024'
    },
    //2
    {

    }
];
// console.log(batteriesPoints[0].geoPosition.latitude);

let paperPoints = [];
// paperPoints переводятся  с помощью map в markers
let paperMarkers = [];





let marker1 = L.marker([44.573424, 33.508811], { icon: batteriesIcon }).bindPopup('Информация о точке в виде попапа');
// marker1.addEventListener('click', () => {
//     console.log('marker 1 click');
// });
let marker2 = L.marker([44.570429, 33.512508], { icon: batteriesIcon }).bindPopup('Информация о точке в виде попапа');
let marker3 = L.marker([44.566482, 33.513247], { icon: batteriesIcon }).bindPopup('Информация о точке в виде попапа');
let marker4 = L.marker([44.564597, 33.514233], { icon: batteriesIcon }).bindPopup('Информация о точке в виде попапа');
let marker5 = L.marker([44.595891, 33.509263], { icon: lightbulbsIcon }).bindPopup('Информация о точке в виде попапа');
let marker6 = L.marker([44.601119, 33.513052], { icon: lightbulbsIcon }).bindPopup('Информация о точке в виде попапа');


// СЛОИ LEAFLET
let batteriesLayer = L.layerGroup([marker1, marker2, marker3, marker4]);
let lightbulbsLayer = L.layerGroup([marker5, marker6]);
let paperLayer = L.layerGroup([...paperMarkers]);
let plasticLayer = L.layerGroup([]);
let glassLayer = L.layerGroup([]);
let metalLayer = L.layerGroup([]);
let technicLayer = L.layerGroup([]);
let clothesLayer = L.layerGroup([]);




let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

let map = L.map('map', {
    center: SEVASTOPOL_COORDS,
    zoom: INITIAL_ZOOM,
    layers: [osm, batteriesLayer, lightbulbsLayer]
});

let baseMaps = {
    "OpenStreetMap": osm,
};

let overlayLayers = {
    "Батарейки": batteriesLayer,
    "Лампочки": lightbulbsLayer,
    "Бумага": paperLayer,
    "Пластик": plasticLayer,
    "Стекло": glassLayer,
    "Металл": metalLayer,
    "Техника": technicLayer,
    "Одежда": clothesLayer,
};

const layerControlOptions = {
    collapsed: false,
    hideSingleBase: true,
    position: 'topright'
}

let layerControl = L.control.layers(baseMaps, overlayLayers, layerControlOptions).addTo(map);
















const locationBtn = document.querySelector('.location-btn');

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




















const customLayersCheckboxes = document.querySelectorAll('.filter-layers__button-checkbox input[type=checkbox]');
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
    foundPointsSpan.textContent = number || '';
}




const leafletLayersCheckboxes = document.querySelectorAll('.leaflet-control-layers-overlays .leaflet-control-layers-selector');
const leafletMarkersPane = document.querySelector('.leaflet-pane .leaflet-marker-pane');
const leafletControlLayers = document.querySelector('.leaflet-control-layers');

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
// leafletControlLayers.style.display = 'none';




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























// let map = L.map('map').setView(SEVASTOPOL_COORDS, INITIAL_ZOOM);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);



// let map = L.map('map').setView(SEVASTOPOL_COORDS, INITIAL_ZOOM);

// L.tileLayer('https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=1&lang=ru_RU', {
//     maxZoom: 21,
//     //crs: L.CRS.EPSG3395,
//     attribution: '&copy; <a href="http://www.yandex.ru">Яндекс</a>',
// }).addTo(map);