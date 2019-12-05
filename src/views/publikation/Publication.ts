import m from "mithril";
import Appsettings from "../../settings/appsettings";

const Publication = {
    loadPublication: () => {
        m.request({
            method: "GET",
            url: Appsettings.api.base + Appsettings.api.publication
        }).then((data: any) => {
            Publication.publication = {title: data.title, content: data.content, receivedData: true};
        });
    },
    publication: {title: "", content: "Lade...", receivedData: false},
    view: () => {
        if (!Publication.publication.receivedData) {
            return m('p', 'Lade...');
        }

        return m('.padded', [
            m('h1', Publication.publication.title),
            m('.content', m.trust(Publication.publication.content))
        ]);
    }
};
Publication.loadPublication();

export default Publication;
