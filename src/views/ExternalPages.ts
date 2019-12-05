/* A component to show pages from the backend */
import m from "mithril";

const ExternalPages = {
    loadPage: (url: string) => {
        m.request({
            method: "GET",
            url
        }).then((data: any) => {
            ExternalPages.page = {title: data.title, content: data.content, receivedData: true};
        });
    },
    oninit: (vnode: any) => {
        if(!vnode.attrs.url) {
            console.error("ExternalPage called without url argument");
        }
        ExternalPages.loadPage(vnode.attrs.url);
    },
    page: {title: "", content: "Lade...", receivedData: false},
    view: () => {
        if (!ExternalPages.page.receivedData) {
            return m('p.padded', 'Lade...');
        }

        return m('.padded', [
            m('h1', ExternalPages.page.title),
            m('.content', m.trust(ExternalPages.page.content))
        ]);
    }
};

export default ExternalPages;
