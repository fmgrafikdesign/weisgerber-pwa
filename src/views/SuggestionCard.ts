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
        if(!poi) { return; }
        return m('.suggestion-card', { onclick: vnode.attrs.onclick }, [
            // poi.media.medium ? m('img.suggestion-image', {src: poi.media.medium}) : null,
            m('h3.suggestion-title', poi.title),
            m('.suggestion-excerpt', m.trust(poi.excerpt)),
            m('.close-suggestion', { onclick: vnode.attrs.dismiss })
        ]);
    }
};

export default SuggestionCard;
