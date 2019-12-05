import m from "mithril";
import PointOfInterest from "../models/PointOfInterest";

interface Attrs {
    poi: PointOfInterest;
    onclick: any;
    dismiss: any;
}

const SuggestionCard: m.Component<Attrs> = {
    view: (vnode) => {
        const poi = vnode.attrs.poi;
        if (!poi) {
            return;
        }
        return m('.suggestion-card.d-flex.position-relative', {onclick: vnode.attrs.onclick}, [
            poi.gallery[0] ? m('.suggestion-image-background', {style: ("background-image: url(" + poi.gallery[0].url + ")" )}) : null,
            // m('h6.suggestion-pretitle', "Nahe Stele:"),
            [m('.suggestion-card-content', [
                m('h3.suggestion-title', poi.title),
                m('.suggestion-excerpt', m.trust(poi.excerpt)),
                m('.close', {onclick: vnode.attrs.dismiss})
            ])
            ]
        ]);
    }
};

export default SuggestionCard;
