class GalleryImage {
    public constructor(
        public id: number,
        public title: string,
        public url: string,
        public alt: string,
        public description: string,
        public caption: string,
        public sizes: any,
        public width: number,
        public height: number
    ) {
    }
}

export default GalleryImage;
