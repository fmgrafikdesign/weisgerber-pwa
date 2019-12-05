import m from "mithril";
import Appsettings from "../../settings/appsettings";

const Imprint = {
    loadPage: () => {
        m.request({
            method: "GET",
            url: Appsettings.api.base + Appsettings.api.imprint
        }).then((data: any) => {
            Imprint.page = {title: data.title, content: data.content, receivedData: true};
        });
    },
    page: {title: "", content: "Lade...", receivedData: false},
    view: () => {
        if (!Imprint.page.receivedData) {
            return m('p', 'Lade...');
        }

        return m('.padded', [
            m('h1', Imprint.page.title),
            m('.content', m.trust(Imprint.page.content))
        ]);
    }
};
Imprint.loadPage();

export default Imprint;
