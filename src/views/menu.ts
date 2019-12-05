import m from "mithril";
import Appsettings from "../settings/appsettings";
import Suggestion from "./Suggestion";

const menuSettings = Appsettings.menu;
const menuItems = Appsettings.menu.items;

const menu = {
    view: () => {
        return m('.menu', m('.menu-wrapper', menuItems.map((menuItem) => {
            return m(m.route.Link, {
                class: m.route.get().includes(menuItem.route) ? 'menu-item active' : 'menu-item',
                href: menuItem.route,
                onclick: closeSuggestion
            }, [
                menuItem.icon ? m.trust(<string> menuItem.icon) : null,
                m('span.d-block', menuItem.name)
            ]);
        })));
    }
};

function closeSuggestion() {
    Suggestion.dismissSuggestion();
}

export default menu;
