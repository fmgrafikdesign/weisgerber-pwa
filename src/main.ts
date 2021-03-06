import m from "mithril";
import Appsettings from "./settings/appsettings";
import Routes from "./settings/routes";
import State from "./state";
import Map from "./views/map/Map";

if(State.PointsOfInterest.length === 0) {
    // First load points of interest, then populate the map with them.
    State.load_pois()
        .then(() => {
            Map.initMarkers();
        });
}

if(State.Texte.length === 0) {
    State.load_texte();
}

// Compute routes
const arrayToObject = (array: any) => {
    if (!Array.isArray(array) ) { array = []; }
    return array.reduce((obj: any, item: any) => {
        obj[item.route] = item;
        return obj;
    }, {});
};

const computedRoutes = arrayToObject(Routes);

m.route(document.body, "/start", computedRoutes);