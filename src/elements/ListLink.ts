import m from "mithril";

interface Attrs {
    href: string;
    content: string;
}

const ListLink: m.Component<Attrs> = {
    view: (vnode) => {
        return m(m.route.Link, {class: 'd-block list-link', href: vnode.attrs.href}, vnode.attrs.content);
    }
};

export default ListLink;