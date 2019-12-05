import m from "mithril";
import Layout from "../views/Layout";
import About from "../views/home/Home";
import Map from "../views/map/Map";
import PointsOfInterest from "../views/points_of_interest/PointsOfInterest";
import SinglePointOfInterestPage from "../views/point_of_interest/SinglePointOfInterestPage";
import PrivacyPolicy from "../views/privacy_policy/PrivacyPolicy";
import Appsettings from "./appsettings";
import ImageArchive from "../views/library/ImageArchive";
import Publication from "../views/publikation/Publication";
import Library from "../views/library/Library";
import Texte from "../views/library/Texte";
import SingleTextPage from "../views/library/SingleTextPage";
import Interviews from "../views/library/Interviews";
import Imprint from "../views/imprint/Imprint";

const Routes = [
    {
        name: 'Start',
        render: () => {
            return m(Layout, m(About));
        },
        route: '/start',
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
            return m(Layout, m(SinglePointOfInterestPage, {poi_id: parseInt(parameters.attrs.poi_id)}));
        },
        route: Appsettings.poi_route + ':poi_id'
    },
    {
        name: 'Text',
        render: (parameters: any) => {
            return m(Layout, m(SingleTextPage, {text_id: parseInt(parameters.attrs.text_id)}));
        },
        route: Appsettings.text_route + ':text_id'
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
        name: 'Bildarchiv',
        render :  () => {
            return m(Layout, m(ImageArchive));
        },
        route: '/bibliothek/bildarchiv',
    },
    {
        name: 'Texte',
        render :  () => {
            return m(Layout, m(Texte));
        },
        route: '/bibliothek/texte',
    },
    {
        name: 'Aktuell',
        render :  () => {
            return m(Layout, m(Publication));
        },
        route: '/aktuell',
    },
    {
        name: 'Interviews',
        render :  () => {
            return m(Layout, m(Interviews));
        },
        route: '/bibliothek/interviews',
    }
];

export default Routes;
