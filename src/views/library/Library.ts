import m from "mithril";
import ListLink from "../../elements/ListLink";
import Description from "../../elements/Description";
import PageTitle from "../../elements/PageTitle";

const title = "Bibliothek";
const description = "In diesem Archiv finden Sie weiterführende Informationen über den St. Ingberter Maler Albert Weisgerber. Die Texte wurden von einer studentischen Arbeitsgruppe der Hochschule der Bildenden Künste Saar erstellt. Die Zusammenstellung der Gemälde und Fotografien eröffnen einen Überblick über das Werk und Leben Weisgerbers. Interviews mit Weisgerber-Kennern laden Sie zu einem Hörerlebnis über den Künstler Albert Weisgerber und seine Heimatstadt ein.";

const Library = {
    view: (vnode: m.Vnode) => {
        return m('', [
            m(PageTitle, { title }),
            m(Description, { content: description }),
            m(ListLink, {href: "/bibliothek/texte", content: "Texte"}),
            m(ListLink, {href: "/bibliothek/bildarchiv", content: "Bildarchiv"}),
            m(ListLink, {href: "/bibliothek/interviews", content: "Interviews"}),
            ]);
    }
};

export default Library;
