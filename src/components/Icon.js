import L from 'leaflet';

export default function Icon() {

 const markerGreen = new L.Icon({
    iconUrl: require('../img/markerGreen.png'),
    iconRetinaUrl: require('../img/markerGreen.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

};


