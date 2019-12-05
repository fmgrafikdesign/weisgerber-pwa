import m from "mithril";
import State from "../../state";
import PointOfInterest from "../../models/PointOfInterest";
import Text from "../../models/Text";

interface Attrs {
    text_id: number
}

const SingleTextPage: m.Component<Attrs> = {
    view: (vnode) => {
        // Get poi info from state
        const text: Text | undefined = State.getTextById(vnode.attrs.text_id);
        if (!text) {
            return;
        }

        return [
            m('.text.padded', [
                m('h1.text-title', text.title),
                m('.text-content', m.trust(text.content))
            ])];
    }
};

export default SingleTextPage;
