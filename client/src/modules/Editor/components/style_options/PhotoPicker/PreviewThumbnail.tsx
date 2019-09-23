import React, { FunctionComponent } from 'react';

export const PreviewThumbnail: FunctionComponent<any> = ({url}) => {

    return (
        <div className="thumbnail__wrapper">
            <div className="thumbnail__img-wrapper">
            <img className="thumbnail__img" src={url}/>
            </div>
        </div>
    )
}