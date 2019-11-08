import m from "mithril";
import findNearest from "geolib/es/findNearest";
import State from "./state";
import Suggestion from "./views/Suggestion";
import PointOfInterest from "./models/PointOfInterest";
import {getDistance} from "geolib";

/* Mapbox handles its part, but we still need to do so for suggestions. I think. Need to check out mapbox events */

const gps = {
    initialize: () => {
        gps.request_permission();
    },
    permission_granted: false,
    request_permission: () => {
        console.log("requesting permission...");
        if (gps.permission_granted) {
            return console.info('Permission has been granted already');
        }
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position.coords.latitude, position.coords.longitude);
                gps.permission_granted = true;
                navigator.geolocation.watchPosition(gps.onLocationChange);
            },  (error) => {
                console.log(error);
            });
        } else {
            console.log('geolocation is not available.');
        }
    },
    findNearestPOI: (position: Position) => {
        const pois: PointOfInterest[] = State.PointsOfInterest;

        const currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        const poiPositions = pois.map((poi: PointOfInterest) => {
            return {
                id: poi.id,
                latitude: poi.position.lat,
                longitude: poi.position.lng
            };
        });

        // Find the closest POI
        const closest = findNearest(currentPosition, poiPositions);
        // @ts-ignore
        const closestPOI: PointOfInterest = State.getPointOfInterestById(closest.id);
        const distance = getDistance(closest, currentPosition);

        // @ts-ignore
        console.log('You are closest (' + distance + 'm) to POI with ID #' + closestPOI.id);

        // If closer than the threshold, suggest a card
        if (distance < closestPOI.radius) {
            console.log('suggesting card', closestPOI.id, '...');
            Suggestion.suggest(closestPOI.id);
        }
    },
    onLocationChange: (position: Position) => {
        gps.findNearestPOI(position);
    }
};
export default gps;
