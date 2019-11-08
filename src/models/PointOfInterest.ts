import GalleryImage from "./GalleryImage";

class PointOfInterest {
    constructor(public id: number,
                public title: string,
                public excerpt: string,
                public content: string,
                public gallery: GalleryImage[],
                public position: {lat: number, lng: number},
                public radius: number,
                public icon: string,
                public texte: []) { }
}

export default PointOfInterest;
