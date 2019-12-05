import m from "mithril";
import State from "../../state";
import PointOfInterest from "../../models/PointOfInterest";
import GalleryImage from "../../models/GalleryImage";
// @ts-ignore
import Glide from "@glidejs/glide";
import Appsettings from "../../settings/appsettings";

interface Attrs {
    poi_id: number;
}

const SinglePointOfInterestPage: m.Component<Attrs> = {
    view: (vnode) => {
        // Get poi info from state
        const poi: PointOfInterest | undefined = State.getPointOfInterestByInternalId(vnode.attrs.poi_id);
        if (!poi) {
            console.warn('could not retrieve a point of interest for this id.');
            return;
        }
        return [
            // m(PointOfInterestGallery, {GalleryItems: poi.gallery}),
            poi.gallery.length > 0 ? m(PointOfInterestGallery2, {GalleryItems: poi.gallery}) : null,
            m('.d-flex.flex-column.parent-height.justify-content-between', [
                m('.point-of-interest.padded', [
                    m('h1.poi-title', poi.title),
                    m('.poi-content', m.trust(poi.content)),
                    m(AdditionalTexts, {texte: poi.texte})
                ]), m(PointOfInterestNavigation, {poi})]
            ),
        ];
    }
};

interface NavigationAttrs {
    poi: PointOfInterest;
    previousPOI?: PointOfInterest;
    nextPOI?: PointOfInterest;
}

const PointOfInterestNavigation: m.Component<NavigationAttrs> = {
    view: (vnode) => {
        vnode.attrs.previousPOI = State.getPointOfInterestById(vnode.attrs.poi.id - 1);
        vnode.attrs.nextPOI = State.getPointOfInterestById(vnode.attrs.poi.id + 1);
        console.log(vnode.attrs.previousPOI);
        return m('.poi-navigation', [
            vnode.attrs.previousPOI ? m(m.route.Link,
                {
                    class: "navigation-item previous-poi d-flex align-items-center",
                    href: Appsettings.poi_route + vnode.attrs.previousPOI.internal_id
                }, m('span.previous-poi-inner', vnode.attrs.previousPOI.title)) : null,
            vnode.attrs.nextPOI ? m(m.route.Link, {
                class: "navigation-item next-poi d-flex align-items-center",
                href: Appsettings.poi_route + vnode.attrs.nextPOI.internal_id
            }, m('span.next-poi-inner', vnode.attrs.nextPOI.title)) : null,
        ]);
    }
};

interface AdditionalTextsAttr {
    texte: any;
}

const AdditionalTexts: m.Component<AdditionalTextsAttr> = {
    view: (vnode) => {
        return vnode.attrs.texte ? [
            m('h3', 'Weiteres Material:'),
            m('.poi-texte', vnode.attrs.texte.map((text: any) => {
                return m(m.route.Link, {href: Appsettings.text_route + text.ID}, text.post_title);
            }))] : null;
    }
};

interface GalleryAttrs {
    GalleryItems: GalleryImage[];
}

const PointOfInterestGallery: m.Component<GalleryAttrs> = {
    oncreate: (vnode) => {
        new Glide('.glide', {
            type: 'carousel',
            gap: 0,
            perView: 1,
            peek: {before: 0, after: 40}
        }).mount();
    },
    view: (vnode) => {
        return m('.poi-gallery',
            m('.glide',
                m('.glide__track', {"data-glide-el": "track"},
                    m('.glide__slides.parent-height', vnode.attrs.GalleryItems.map((item) => {
                        return m('li.glide__slide.parent-height', m(
                            'img.parent-height', {src: item.url}
                        ));
                    }))
                ))
        );
    }
};

const PointOfInterestGallery2: m.Component<GalleryAttrs> = {
    view: (vnode) => {
        return m('.poi-gallery',
            m('.gallery-wrapper.carousel',
                vnode.attrs.GalleryItems.map((item) => {
                    return m('.slide.parent-height', m(
                        'img.img-fluid.parent-height', {src: item.url}
                    ));
                }))
        );
    }
};

export default SinglePointOfInterestPage;
