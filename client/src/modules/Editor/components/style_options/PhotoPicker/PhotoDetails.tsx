import React, { FunctionComponent, useState, useEffect } from 'react';
import {Modal, Spin, Button} from 'antd';

export const PhotoDetails: FunctionComponent<any> = ({ show, img, close }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
    }, [img]);

    const onLoad = () => {
        console.log("Loaded!");
        setLoading(false);
    };

    const footer = (<div className="photo-details__footer">
        <Button size="large" onClick={close} style={{ marginRight: 15}}>Cancel</Button>
        <Button size="large" type="primary" icon="check">Select</Button>
    </div>)

    return (
        <Modal visible={show} title={null} width={1200} onCancel={close} footer={footer}>
            <div className="photo-details__wrapper">
                <img src={img} style={{display: loading ? 'none' : 'block'}} className="photo-details__img" onLoad={onLoad}/>
                {loading && <div className="details__loader"><Spin tip="Loading..."/></div>}

            </div>
        </Modal>
    )
};