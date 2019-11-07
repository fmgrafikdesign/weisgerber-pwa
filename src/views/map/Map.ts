import m from "mithril";
import mapboxgl from "mapbox-gl";
import Appsettings from "../../settings/appsettings";
const Mapsettings = Appsettings.map;
import State from "../../state";
import Suggestion from "../Suggestion";

interface Attrs {
    mapObject: mapboxgl.Map;
}

class Map {
    public static mapObject: mapboxgl.Map;
    public static initializedMarkers: boolean = false;

    static initMapBox (dom: any) {
        Map.mapObject = new mapboxgl.Map({
            center: [7.1122986, 49.279558],
            container: dom,
            maxZoom: 22,
            minZoom: 5,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 13
        });
        Map.mapObject.on('load', function () {

        });

        Map.mapObject.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        console.log(Map.initializedMarkers);
        if (!Map.initializedMarkers) Map.initMarkers();

    };

    static initMarkers() {
        //console.log(map.mapObject);
        if (Map.initializedMarkers) {
            return console.info('markers initialized already');
        }
        if (!Map.mapObject) {
            return console.info('map not initialized yet, postponing marker initialization');
        }
        if (State.points_of_interest.length === 0) {
            return console.info('pois not retrieved yet, postponing marker initialization');
        }
        const points_of_interest = State.points_of_interest;
        console.log('initializing markers');

        // TODO: Interface POI, replace any
        // Map the POIs to a geojson feature collection.
        const features = points_of_interest.map((poi: any) => {
            return {
                type: "Feature",
                geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(poi.acf.position.lng), parseFloat(poi.acf.position.lat)]
                },
                properties: {
                    title: poi.title,
                    id: poi.id
                }
            }
        });

        const geojson = {
            features,
            type: 'FeatureCollection'
        };

        console.log(geojson);

        geojson.features.forEach((marker: any) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.id = marker.properties.id;
            el.addEventListener('click', (e) => {
                // console.log('clicked marker #' + el.id);
                Suggestion.showSuggestion(el.id);
            });

            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(Map.mapObject);
        });

        Map.initializedMarkers = true;
    }
}

export default Map;
