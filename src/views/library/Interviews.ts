import m from "mithril";
import Appsettings from "../../settings/appsettings";

const title = "Interviews";
const description = "Hier finden Sie ein Gespräch mit Konrad Weisgerber, der das Leben und Werk von Albert " +
    "Weisgerber kennt. Geführt wurde das Interview von Lisa Nonninger und Laura Osthof";

// TODO Interview Page

const Interviews = {
    interviews: {title: "", content: "Lade...", receivedData: false},
    loadInterviews: () => {
        m.request({
            method: "GET",
            url: Appsettings.api.base + Appsettings.api.interviews
        }).then((data: any) => {
            Interviews.interviews = {title: data.title, content: data.content, receivedData: true};
        });
    },
    view: () => {
        if (!Interviews.interviews.receivedData) {
            return m('p.padded', 'Lade...');
        }

        return m('.padded', [
            m('h1', "Interviews"),
            m('.content', m.trust(Interviews.interviews.content))
        ]);
    }
};
Interviews.loadInterviews();

export default Interviews;
