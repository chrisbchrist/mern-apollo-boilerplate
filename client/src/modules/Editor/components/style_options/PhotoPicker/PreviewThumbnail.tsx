import React, { FunctionComponent } from 'react';
import { Icon, Tooltip } from 'antd';

interface ThumbnailProps {
    url: string;
    selectPhoto?: any;
}

export const PreviewThumbnail: FunctionComponent<ThumbnailProps> = ({url, selectPhoto}) => {

    return (
        <div className="thumbnail__wrapper">
            <div className="thumbnail__img-wrapper">
                <div className="thumbnail__overlay">
                    <Tooltip title="View"> <Icon onClick={selectPhoto} type="eye" className="thumbnail__icon" style={{color: '#fff'}}/></Tooltip>
                </div>
            <img className="thumbnail__img" src={url}/>
            </div>
        </div>
    )
}