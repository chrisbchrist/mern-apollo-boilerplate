import React, { FunctionComponent } from 'react';
import { Icon, Tooltip, Divider } from 'antd';

interface ThumbnailProps {
    url: string;
    selectPhoto?: any;
    dimensions?: string;
}

export const PreviewThumbnail: FunctionComponent<ThumbnailProps> = ({url, selectPhoto, dimensions}) => {
    

    return (
        <div className="thumbnail__wrapper">
            <div className="thumbnail__img-wrapper">
                <div className="thumbnail__overlay">
                    <Tooltip title="View"> <Icon onClick={selectPhoto} type="eye" className="thumbnail__icon" style={{color: '#fff', marginRight: 15}}/></Tooltip>
                    <Tooltip title="Select"> <Icon onClick={selectPhoto} type="check" className="thumbnail__icon" style={{color: '#fff'}}/></Tooltip>
                    {dimensions && <div className="thumbnail__dimensions">{dimensions}</div>}
                </div>
            <img className="thumbnail__img" src={url}/>
            </div>
        </div>
    )
}