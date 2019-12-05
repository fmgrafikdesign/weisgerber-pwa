import m from "mithril";

interface Attrs {
    content: string;
}

const Description: m.Component<Attrs> = {
    view: (vnode) => {
        return m('p.padded.mb-0', vnode.attrs.content);
    }
};

export default Description;