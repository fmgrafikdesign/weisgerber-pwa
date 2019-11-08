import m from "mithril";
import State from "../../state";
import PointOfInterest from "../../models/PointOfInterest";
import GalleryImage from "../../models/GalleryImage";
import SuggestionCard from "../SuggestionCard";
import Appsettings from "../../settings/appsettings";
import * as Mithril from "mithril";

interface Attrs {
    poi_id: number;
}

const SinglePointOfInterestPage: m.Component<Attrs> = {
    view: (vnode) => {
        // Get poi info from state
        const poi: PointOfInterest | undefined = State.getPointOfInterestById(vnode.attrs.poi_id);
        if (!poi) {
            console.warn('could not retrieve a point of interest for this id.');
            return;
        }

        return [
            m(PointOfInterestGallery, {GalleryItems: poi.gallery}),
            m('.point-of-interest.padded', [
                m('h1.poi-title', poi.title),
                m('.poi-content', m.trust(poi.content))
            ])];
    }
};

interface GalleryAttrs {
    GalleryItems: GalleryImage[];
}

const PointOfInterestGallery: m.Component<GalleryAttrs> = {
    view: (vnode) => {
        return m('.poi-gallery',
            vnode.attrs.GalleryItems.map((item) => {
                return m('.gallery-item.fluid', m(
                    'img', {src: item.url}
                ));
            })
        );
    }
}

export default SinglePointOfInterestPage;
