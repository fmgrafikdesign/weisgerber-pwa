import m from "mithril";
import State from "../../state";
import Appsettings from "../../settings/appsettings";
import Text from "../../models/Text";
import ListLink from "../../elements/ListLink";
import Description from "../../elements/Description";
import PageTitle from "../../elements/PageTitle";

const title = "Texte";
const description = "Beschreibungstext folgt";

const Texte = {
    view: (vnode: m.Vnode) => {
        const texte = State.Texte;
        if(texte.length === 0) {
            return;
        }
        return m('', [
            m(PageTitle, { title }),
            m(Description, {content: description}),
            m('.text-list', texte.map((text: Text) => {
                return m(ListLink, {href: Appsettings.text_route + text.id, content: text.title});
            }))
        ]);
    }
};

export default Texte;
