
import React, { useEffect, useState } from 'react';

import { fetchImageUrl, getCachedImage } from '../../modules';

const ImageCache = {};

export const ProgressiveImage = React.memo( ({ src, id }) => {
    const [imgToRender, setImgToRender] = useState(src);

    console.log('progressive image')

    useEffect(() => {
        const loadHighQualityImage = async () => {
            const highQualityImage = await getCachedImage(id, false);
            if (highQualityImage) {
                setImgToRender(highQualityImage); 
            }
        };

        loadHighQualityImage();
    }, []);

    return (
        <img src={imgToRender} alt="Random from Picsum" />
    );
});