import m from "mithril";
import findNearest from "geolib/es/findNearest";
import State from "./state";
import Suggestion from "./views/Suggestion";

/* Mapbox handles its part, but we still need to do so for suggestions. I think. Need to check out mapbox events */

const gps = {
    permission_granted: false,
    request_permission: () => {
        if (gps.permission_granted) {
            return console.info('Permission has been granted already');
        }
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude, position.coords.longitude);
                gps.permission_granted = true;
                navigator.geolocation.watchPosition(gps.onLocationChange);
            }, function (error) {
                console.log(error);
            });
        } else {
            console.log('geolocation is not available.');
        }
    },
    findNearestPOI: (position: Position) => {
        const pois = State.points_of_interest;

        const currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        // TODO Interface POI, replace any
        const poiPositions = pois.map((poi: any) => {
            return {
                latitude: poi.acf.position.lat,
                longitude: poi.acf.position.lng
            };
        });

        // Find the closest POI
        const closest = findNearest(currentPosition, poiPositions);
        //console.log('You are closest (' + closest.distance + 'm) to POI with ID #' + pois[closest.key].id);

        // If closer than the threshold, suggest a card
        // @ts-ignore
        if(closest.distance < pois[closest.key].acf.radius) {
            // @ts-ignore
            Suggestion.suggest(pois[closest.key].id);
        }
    },
    onLocationChange: (position: Position) => {
        gps.findNearestPOI(position);
    }
};

gps.request_permission();
export default gps;
