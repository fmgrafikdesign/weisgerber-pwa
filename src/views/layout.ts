import m from "mithril";
import Menu from "./menu";
import Mainframe from "./mainframe";

interface Attrs {
    showMap: boolean
}

const Layout: m.Component<Attrs> = {
    view: (vnode) => {
        return m('.app',
            [
                m(Mainframe, vnode.attrs, vnode.children),
                m(Menu)
            ]
            );
    }
};

export default Layout;
