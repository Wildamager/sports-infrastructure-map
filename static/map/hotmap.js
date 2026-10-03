const apiKey = window.MAPBOX_TOKEN

const mymap = L.map('map_hot').setView([55.740, 37.615], 9);
var test0 = L.layerGroup();
var test1 = L.layerGroup();
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey

}).addTo(mymap);

var locations = []
var locations1 = []
$.getJSON("/static/map/hotmap.geojson", function(json) {
    console.log(json)
    for (key in json.features) {
        if (`${json.features[key].geometry.coordinates[0]}` != 'null') {
            locations.push([`${json.features[key].geometry.coordinates[0]}`, `${json.features[key].geometry.coordinates[1]}`, `${json.features[key].properties.Dostup}`])
        };

    }
    console.log(locations)
    var heat = L.heatLayer(locations).addTo(test0);
    for (key in json.features) {
        if (`${json.features[key].geometry.coordinates[0]}` != 'null') {
            locations1.push([`${json.features[key].geometry.coordinates[0]}`, `${json.features[key].geometry.coordinates[1]}`, `${json.features[key].properties.Plot_nasel}`])
        };
    }
    console.log(locations1)
    var heat = L.heatLayer(locations1).addTo(test1);
});
var overlayMaps = {
    'Тепловая карта без учета населения': test0,
    'Тепловая карта с учетом населения': test1,
};

L.control.layers(overlayMaps).addTo(mymap);