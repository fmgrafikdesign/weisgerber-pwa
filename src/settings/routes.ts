import m from "mithril";
import Layout from "../views/Layout";
import About from "../views/home/Home";
import Map from "../views/map/Map";
import PointsOfInterest from "../views/points_of_interest/PointsOfInterest";
import PointOfInterest from "../views/point_of_interest/PointOfInterest";
import Imprint from "../views/imprint/Imprint";
import PrivacyPolicy from "../views/privacy_policy/PrivacyPolicy";
import Appsettings from "./appsettings";
import Library from "../views/library/Library";
import Publication from "../views/publikation/Publication";

const Routes = [
    {
        name: 'Start',
        render: () => {
            return m(Layout, m(About));
        },
        route: '/',
        show_in_bottom_nav : true
    },
    {
        name: 'Karte',
        render: () => {
            return m(Layout, {showMap: true});
        },
        route: '/karte',
        show_in_bottom_nav : true
    },
    {
        name: 'Stelen',
        render: () => {
            return m(Layout, m(PointsOfInterest));
        },
        route: Appsettings.poi_route,
        show_in_bottom_nav : true
    },
    {
        name: 'Stele',
        render: (parameters: any) => {
            return m(Layout, m(PointOfInterest, {poi_id: parameters.attrs.poi_id}));
        },
        route: Appsettings.poi_route + '/:poi_id'
    },
    {
        name: 'Impressum',
        render : () => {
            return m(Layout, m(Imprint));
        },
        route: '/impressum'
    },
    {
        name: 'Datenschutz',
        render :  () => {
            return m(Layout, m(PrivacyPolicy));
        },
        route: '/datenschutz',
    },
    {
        name: 'Bibliothek',
        render :  () => {
            return m(Layout, m(Library));
        },
        route: '/bibliothek',
    },
    {
        name: 'Publikation',
        render :  () => {
            return m(Layout, m(Publication));
        },
        route: '/publikation',
    }
];

export default Routes;
