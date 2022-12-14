import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { ImageData } from '../../types/Gallery';
import './GalleryThumb.css';

const apiUrl: string = process.env.API_URL || '';

type GalleryThumbProps = {
    path: string;
    modificationTime: number;
    title: string;
    image: ImageData;
    marginPx: number;
}

const GalleryThumb = forwardRef<HTMLImageElement, GalleryThumbProps>(({ image, marginPx, path }, ref) => {
    const style = {
        width: `${image.galleryDimensions!.width}px`,
        height: `${image.galleryDimensions!.height}px`,
        margin: `${marginPx}px`,
    };

    let imageDesc = image.exif.title || '';

    if (image.exif.dateTaken) {
        const exifDate = new Date(image.exif.dateTaken);
        imageDesc += ` (${exifDate.toLocaleDateString('default', { month: 'short' })} ${exifDate.getFullYear()})`;
    }

    return (
        <Link to={`./${image.fileName}`} replace={true} className='thumbContainer' style={style}>
            <img
                src={`${apiUrl}/gallery/image/${path}/${image.fileName}?id=${image.sourceModificationTime}`}
                alt={image.fileName}
                ref={ref}
            />
            <div className='overlay'>{imageDesc}</div>
        </Link>
    );
});

export default GalleryThumb;
