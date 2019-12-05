import m from "mithril";
import Appsettings from "../../settings/appsettings";
import GalleryImage from "../../models/GalleryImage";
import PageTitle from "../../elements/PageTitle";

const ImageArchive = {
    GalleryImages: new Array<GalleryImage>(),
    overlayImage: new GalleryImage(0, "", "", "", "", "", 0, 0, 0),
    showOverlayImage: false,
    loadImageArchive: () => {
        m.request({
            method: "GET",
            url: Appsettings.api.base + Appsettings.api.image_archive
        }).then((data: any) => {
            ImageArchive.archive = {title: data.title, content: data.content, receivedData: true};
            let galleryImages: GalleryImage[] = [];
            if (data.acf && data.acf.bilder) {
                galleryImages = data.acf.bilder.map((item: any) => {
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
            ImageArchive.GalleryImages = galleryImages;
        });
    },
    archive: {title: "", content: "Lade...", receivedData: false},
    view: () => {
        if (!ImageArchive.archive.receivedData) {
            return m('p.padded', 'Lade...');
        }

        return [
            ImageArchive.overlayImage ? m(ImageOverlay, {
                    Image: ImageArchive.overlayImage,
                    show: ImageArchive.showOverlayImage
                }
            ) : null,
            m('', [
                m(PageTitle, {title: ImageArchive.archive.title}),
                // m('.image-archive', m(ImageGallery2, { GalleryImages: ImageArchive.GalleryImages } ))
                m('.image-archive-thumbnails', m(ImageGallery2, {GalleryImages: ImageArchive.GalleryImages}))
            ])];
    }
};
ImageArchive.loadImageArchive();

interface ImageGalleryAttrs {
    GalleryImages: GalleryImage[]
}

const ImageGallery: m.Component<ImageGalleryAttrs> = {
    view: (vnode) => {
        // vnode.attrs.GalleryImages
        return vnode.attrs.GalleryImages.map((image: GalleryImage) => {
            return m('img', {class: "archive-image", src: image.url});
        });
    }
};

const ImageGallery2: m.Component<ImageGalleryAttrs> = {
    view: (vnode) => {
        // vnode.attrs.GalleryImages
        return vnode.attrs.GalleryImages.map((image: GalleryImage) => {
            return m('img', {
                class: "thumbnail-image",
                src: image.sizes.thumbnail,
                onclick: (e: any) => {
                    showImageOverlay(image);
                }
            });
        });
    }
};

function showImageOverlay(image: GalleryImage) {
    ImageArchive.overlayImage = image;
    ImageArchive.showOverlayImage = true;
}

function hideImageOverlay() {
    ImageArchive.showOverlayImage = false;
}

interface ImageOverlayAttrs {
    Image: GalleryImage;
    show: boolean
}

const ImageOverlay: m.Component<ImageOverlayAttrs> = {
    view: (vnode) => {
        const Image = vnode.attrs.Image;
        console.log(vnode.attrs.Image);
        if (!Image || !vnode.attrs.show) {
            return;
        }
        return m('.image-overlay', {onclick: hideImageOverlay},
            m('.overlay-image-wrapper', {style: "width: " + Image.width + "px"}, [
                m('img.overlay-image', {src: Image.url, width: Image.width, height: Image.height}),
                m('span.image-caption', Image.title),
                m('span.image-description', Image.caption)
            ]));
    }
};

export default ImageArchive;
