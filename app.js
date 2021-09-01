var myMap = L.map('map').setView([19.017924796791387, 72.84773688319268], 5);
const titleurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, code for leaflet\' with pawan';

const tileLayer = L.tileLayer(titleurl, {attribution});
tileLayer.addTo(myMap);


function generateList() {
    const ul = document.querySelector('.list');
    fortList.forEach((fort) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
        a.addEventListener('click', () =>{
            flyToFort(fort);
        });

        div.classList.add('fort-item');
        a.innerText = fort.properties.name;
        a.href = "#";
        p.innerText = fort.properties.rating;
        p.innerText = fort.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);

    });

}

generateList();

function makePopupContent(fort) {
    return `
    <div>
    <h4>${fort.properties.name}</h4>
    <p>${fort.properties.address}</p>
    <p2>${fort.properties.rating}</p2>
    <div class="phone-number">
    <a href="tel:${fort.properties.phone}">${fort.properties.phone}</a>
    </div>


    </div>


    `;
}
function onEachFeature(feature, layer) {
    layer.bindPopup(makePopupContent(feature), {closeButton: false, offset:L.point(0, -8)});

}


const myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [30,40],

});

const fortsLayer = L.geoJSON(fortList, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon: myIcon});

    }
});

fortsLayer.addTo(myMap);

function flyToFort(fortlocation) {
    const lat = fortlocation.geometry.coordinates[1];
    const lng = fortlocation.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 14, {
        duration: 3
    });


    setTimeout(() => {
        L.popup({ closeButton: false, offset: L.point(0, -8) })
            .setLatLng([lat, lng])
            .setContent(makePopupContent(fortlocation))
            .openOn(myMap);
    }, 3000);
}

