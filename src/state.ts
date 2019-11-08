import m from "mithril";
import Appsettings from "./settings/appsettings";
import Map from "./views/map/Map";
import PointOfInterest from "./models/PointOfInterest";
import GalleryImage from "./models/GalleryImage";
import PointsOfInterest from "./views/points_of_interest/PointsOfInterest";
const api = Appsettings.api;

//TODO JSON Interface, replace any

const State = {
    PointsOfInterest: new Array<PointOfInterest>(),
    getPointOfInterestById: (id: number) => {
        return State.PointsOfInterest.find((poi) => {
            return poi.id === id;
        });
    },
    load_pois: () => {
        return m.request({
            method: 'GET',
            url: (api.base + api.stelen + '?' + api.count_parameter + '=' + api.pois_to_retrieve)
        })
            .then((pois: any) => {
                CreatePointsOfInterest(pois);
            })
            .catch((e) => {
                console.log(e);
            });
    }
};

// Create PointsOfInterest from supplied JSON data. This is prone to error if the api changes.
// Should be refactored into Graph QL at some point.
function CreatePointsOfInterest(data: any) {
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
                    item.sizes
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
            poi.acf.texte
        );
        State.PointsOfInterest.push(newPointOfInterest);
    } );
    // console.log(State.PointsOfInterest);
}

export default State;
