import m from "mithril";
import mapboxgl from "mapbox-gl";
import Appsettings from "../settings/appsettings";
import Map from "./map/Map";
import gps from "../gps";
import Suggestion from "./Suggestion";
mapboxgl.accessToken = Appsettings.map.accessToken;

gps.initialize();

const Mapsettings = Appsettings.map;

// const myMap = new Map();

interface Attrs {
    showMap: boolean;
}

const Mainframe: m.Component<Attrs> = {
    onupdate: (vnode) => {
        // If this shows the map, resize the map to account for loading on other tabs (messes with positioning)
        if(vnode.attrs.showMap) { Map.mapObject.resize(); }
    },
    view: (vnode) => {
        return m('.app-window', [
            m(MapWrapper, {showMap: vnode.attrs.showMap}),
            vnode.children,
            m(Suggestion)
        ]);
    }
};

const MapWrapper: m.Component<Attrs> = {
    view: (vnode) => {
        return m('.map-wrapper', {
            oncreate: (vnode) => {
                Map.initMapBox(vnode.dom);
            },
            style: {display: vnode.attrs.showMap ? '' : 'none'}
        });
    }
};

export default Mainframe;
