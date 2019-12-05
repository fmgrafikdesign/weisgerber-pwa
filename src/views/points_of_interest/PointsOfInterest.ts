import m from "mithril";
import State from "../../state";
import Appsettings from "../../settings/appsettings";
import PointOfInterest from "../../models/PointOfInterest";
import ListLink from "../../elements/ListLink";
import Description from "../../elements/Description";
import PageTitle from "../../elements/PageTitle";

const title = "Mit Weisgerber durch St. Ingbert";
const description = "Das virtuelle Albert Weisgerber Museum im realen Stadtraum St. Ingbert - \n" +
    "Spazieren Sie auf den Spuren Weisgerbers durch St. Ingbert. An 10 Standorten erwarten Sie Info-Stelen mit Fotografien, Gemälden und Informationen rund um den St. Ingberter Künstler Albert Weisgerber. Jede Tafel ist einem Thema aus Albert Weisgerbers Leben gewidmet.";

const PointsOfInterest = {
    view: () => {
        const pois = State.PointsOfInterest;
        if (pois.length === 0) {
            return;
        }
        return m('', [
            m(PageTitle, { title }),
            m(Description, { content: description }),
            pois.map((poi: PointOfInterest) => {
                return m(ListLink, { href: Appsettings.poi_route + poi.internal_id, content: poi.id + ") " + poi.title});
            })
        ]);
    }
};

export default PointsOfInterest;