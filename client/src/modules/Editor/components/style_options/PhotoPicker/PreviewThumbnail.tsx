import React, { FunctionComponent } from 'react';
import { Icon } from 'antd';

interface ThumbnailProps {
    url: string;
}

export const PreviewThumbnail: FunctionComponent<ThumbnailProps> = ({url}) => {

    return (
        <div className="thumbnail__wrapper">
            <div className="thumbnail__img-wrapper">
                <div className="thumbnail__overlay">
                    <Icon type="eye" className="thumbnail__icon" style={{color: '#fff'}}/>
                </div>
            <img className="thumbnail__img" src={url}/>
            </div>
        </div>
    )
}