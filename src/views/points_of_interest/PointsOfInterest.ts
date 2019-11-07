import m from "mithril";
import State from "../../state";
import Appsettings from "../../settings/appsettings";

const PointsOfInterest = {
    view: () => {
        const pois = State.points_of_interest;
        if (pois.length === 0) {
            return;
        }
        return [
            m('h1', 'points of interest'),
            pois.map((poi: any) => {
                return m(m.route.Link, {class: 'd-block', href: Appsettings.poi_route + '/' + poi.id }, poi.title)
            })
        ];
    }
};

export default PointsOfInterest;