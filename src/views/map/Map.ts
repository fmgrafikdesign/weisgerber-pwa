import m from "mithril";
import mapboxgl from "mapbox-gl";
import Appsettings from "../../settings/appsettings";
const Mapsettings = Appsettings.map;
import State from "../../state";
import Suggestion from "../Suggestion";
import PointOfInterest from "../../models/PointOfInterest";

interface Attrs {
    mapObject: mapboxgl.Map;
}

const forestColor = "#d6e6df";

class Map {
    public static mapObject: mapboxgl.Map;
    public static initializedMarkers: boolean = false;

    static initMapBox (dom: any) {
        Map.mapObject = new mapboxgl.Map({
            center: [7.1152986, 49.277558],
            container: dom,
            maxZoom: 22,
            minZoom: 5,
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 14
        });
        Map.mapObject.on('load', () => {
            Map.mapObject.setPaintProperty("landuse", 'fill-color', forestColor);
            Map.mapObject.setPaintProperty("national-park", 'fill-color', forestColor);
        });

        Map.mapObject.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        console.log(Map.initializedMarkers);
        if (!Map.initializedMarkers) {
            Map.initMarkers();
        }

    }

    static initMarkers() {
        if (Map.initializedMarkers) {
            return console.info('markers initialized already');
        }
        if (!Map.mapObject) {
            return console.info('map not initialized yet, postponing marker initialization');
        }
        if (State.PointsOfInterest.length === 0) {
            return console.info('pois not retrieved yet, postponing marker initialization');
        }
        const PointsOfInterest = State.PointsOfInterest;
        console.log('initializing markers');
        // Map the POIs to a geojson feature collection.
        const features = PointsOfInterest.map((poi: PointOfInterest) => {
            return {
                geometry: {
                    coordinates: [poi.position.lng, poi.position.lat],
                    type: 'Point'
                },
                properties: {
                    content: poi.id,
                    id: poi.internal_id,
                    title: poi.title
                },
                type: "Feature"
            };
        });

        const geojson = {
            features,
            type: 'FeatureCollection'
        };

        // console.log(geojson);

        geojson.features.forEach((marker: any) => {
            const el = document.createElement('div');
            const graphic = document.createElement('div');
            el.className = "marker-wrapper";
            graphic.className = 'marker';
            el.id = marker.properties.id;
            el.innerText = marker.properties.content;
            el.appendChild(graphic);
            el.addEventListener('click', (e) => {
                // console.log('clicked marker #' + el.id);
                Suggestion.showSuggestion(parseInt(el.id));
            });

            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates)
                .addTo(Map.mapObject);
        });

        Map.initializedMarkers = true;
    }
}

export default Map;
