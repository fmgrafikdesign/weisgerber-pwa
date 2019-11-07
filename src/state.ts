import m from "mithril";
import Appsettings from "./settings/appsettings";
import Map from "./views/map/Map";
const api = Appsettings.api;

//TODO JSON Interface, replace any

const State = {
    points_of_interest: [],

    load_pois: () => {
        return m.request({
            method: 'GET',
            url: (api.base + api.stelen + '?' + api.count_parameter + '=' + api.pois_to_retrieve)
        })
            .then((pois: any) => {
                State.points_of_interest = pois;
            })
            .catch((e) => {
                console.log(e);
            })
    }
};

export default State;
