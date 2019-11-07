import m from "mithril";

interface Attrs {
    poi: any;
    onclick: any;
    dismiss: any;
}

const SuggestionCard: m.Component<Attrs> = {
    view: (vnode) => {
        if(!vnode.attrs.poi) { return; }
        return m('.suggestion-card', { onclick: vnode.attrs.onclick }, [
            vnode.attrs.poi.media.medium ? m('img.suggestion-image', {src: vnode.attrs.poi.media.medium}) : null,
            m('h3.suggestion-title', vnode.attrs.poi.title),
            m('.suggestion-excerpt', m.trust(vnode.attrs.poi.excerpt)),
            m('.close-suggestion', { onclick: vnode.attrs.dismiss })
        ]);
    }
};

export default SuggestionCard;
