import m from "mithril";
import Appsettings from "./settings/appsettings";
import Map from "./views/map/Map";
import PointOfInterest from "./models/PointOfInterest";
import GalleryImage from "./models/GalleryImage";
import PointsOfInterest from "./views/points_of_interest/PointsOfInterest";
import Text from "./models/Text";
const api = Appsettings.api;

const State = {
    PointsOfInterest: new Array<PointOfInterest>(),
    Texte: new Array<Text>(),
    getPointOfInterestByInternalId: (id: number) => {
        return State.PointsOfInterest.find((poi) => {
            return poi.internal_id === id;
        });
    },
    getPointOfInterestById: (id: number) => {
        return State.PointsOfInterest.find((poi) => {
            return poi.id === id;
        });
    },
    getTextById: (id: number) => {
        return State.Texte.find((text) => {
            return text.id === id;
        });
    },
    load_pois: () => {
        return m.request({
            method: 'GET',
            // tslint:disable-next-line:max-line-length
            url: (api.base + api.stelen + '?' + api.count_parameter + '=' + api.pois_to_retrieve + '&orderby=' + api.orderby + '&order=' + api.order)
        })
            .then((pois: any) => {
                CreatePointsOfInterest(pois);
            })
            .catch((e) => {
                console.log(e);
            });
    },
    load_texte: () => {
        m.request({
            method: 'GET',
            url: (api.base + api.texte + '?' + api.count_parameter + '=' + api.pois_to_retrieve)
        })
            .then((texte: any) => {
                CreateTexte(texte);
            })
            .catch((e) => {
                console.log(e);
            });
    }
};

// Create PointsOfInterest from supplied JSON data. This is prone to error if the api changes.
// Should be refactored into Graph QL at some point.
function CreatePointsOfInterest(data: any) {
    let i = 1;
    data.forEach((poi: any) => {
        let galleryImages: GalleryImage[] = [];
        if(poi.acf.galerie) {
            galleryImages = poi.acf.galerie.map((item: any) => {
                return new GalleryImage(
                    item.id,
                    item.title,
                    item.url,
                    item.alt,
                    item.description,
                    item.caption,
                    item.sizes,
                    item.width,
                    item.height
                );
            });
        }
        const newPointOfInterest: PointOfInterest = new PointOfInterest(
            poi.id,
            poi.title,
            poi.excerpt,
            poi.content,
            galleryImages,
            { lat: poi.acf.position.lat, lng: poi.acf.position.lng},
            poi.acf.radius,
            poi.acf.icon,
            poi.acf.texte,
            i++
        );
        State.PointsOfInterest.push(newPointOfInterest);
    } );
    // console.log(State.PointsOfInterest);
}

// Create Texte from supplied JSON data. This is prone to error if the api changes.
// Should be refactored into Graph QL at some point.
function CreateTexte(data: any) {
    data.forEach((text: any) => {
        const newText: Text = new Text(
            text.id,
            text.title,
            text.excerpt,
            text.content,
        );
        State.Texte.push(newText);
    } );
    // console.log(State.PointsOfInterest);
}

export default State;
