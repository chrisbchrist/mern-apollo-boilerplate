import React, { FunctionComponent, useState, useEffect } from 'react';
import {Modal, Spin, Button} from 'antd';

export const PhotoDetails: FunctionComponent<any> = ({ show, img, close, confirm, closeParent }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
    }, [img]);

    const onLoad = () => {
        setLoading(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        confirm();
        close();
        closeParent();
    }

    const footer = (<div className="photo-details__footer">
        <Button size="large" onClick={close} style={{ marginRight: 15}}>Cancel</Button>
        <Button size="large" type="primary" icon="check" onClick={handleClick}>Select</Button>
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