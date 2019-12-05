import m from "mithril";

interface Attrs {
    title: string;
}

const PageTitle: m.Component<Attrs> = {
    view: (vnode) => {
        return m('h1.t-padding.x-padding.mb-0', vnode.attrs.title);
    }
};

export default PageTitle;
