import m from "mithril";
import Appsettings from "../settings/appsettings";

const menuSettings = Appsettings.menu;
const menuItems = Appsettings.menu.items;

const menu = {
    view: () => {
        return m('.menu', m('.menu-wrapper', menuItems.map((menuItem) => {
            // @ts-ignore
            return m(m.route.Link, {
                class: 'menu-item',
                href: menuItem.route
            }, menuItem.name);
        })));
    }
};

export default menu;
