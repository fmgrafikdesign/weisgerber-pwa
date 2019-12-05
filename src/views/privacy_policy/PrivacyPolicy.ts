import m from "mithril";
import Appsettings from "../../settings/appsettings";

const PrivacyPolicy = {
    loadPage: () => {
        m.request({
            method: "GET",
            url: Appsettings.api.base + Appsettings.api.privacy_page
        }).then((data: any) => {
            PrivacyPolicy.page = {title: data.title, content: data.content, receivedData: true};
        });
    },
    page: {title: "", content: "Lade...", receivedData: false},
    view: () => {
        if (!PrivacyPolicy.page.receivedData) {
            return m('p', 'Lade...');
        }

        return m('.padded', [
            m('h1', PrivacyPolicy.page.title),
            m('.content', m.trust(PrivacyPolicy.page.content))
        ]);
    }
};
PrivacyPolicy.loadPage();

export default PrivacyPolicy;
