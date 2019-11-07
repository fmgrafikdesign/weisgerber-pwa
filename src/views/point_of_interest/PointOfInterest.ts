import m from "mithril";
import State from "../../state";

interface Attrs {
    poi_id: string;
}

const PointOfInterest: m.Component<Attrs> = {
    view: (vnode) => {
        // Get poi info from state
        const poi: any = State.points_of_interest.find((poi: any) => {
            return parseInt(poi.id) === parseInt(vnode.attrs.poi_id);
        });

        if(!poi) {
            console.warn('could not retrieve a point of interest for this id.');
            return;
        }

        console.log('poi view');

        return m('.point-of-interest.padded', [
            m('h1.poi-title', poi.title),
            m('.poi-content', m.trust(poi.content))
        ]);
    }
};

export default PointOfInterest;
