import React, { FunctionComponent, useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Input } from 'antd';

const defaultPhotos = [
    "https://res.cloudinary.com/dgeb3iekh/image/upload/v1569115437/glaciers.jpg",
    "https://res.cloudinary.com/dgeb3iekh/image/upload/v1569115393/island.jpg",
    "https://res.cloudinary.com/dgeb3iekh/image/upload/v1569109242/skyscrapers.jpg",
    "https://res.cloudinary.com/dgeb3iekh/image/upload/v1569109237/leaves.jpg",
    "https://res.cloudinary.com/dgeb3iekh/image/upload/v1569109230/hot-air-balloon.jpg",
    "https://res.cloudinary.com/dgeb3iekh/image/upload/v1558826020/astrology-astronomy-background-image-956981_1_x1s9n0.jpg"
];

export const PhotoPicker: FunctionComponent<any> = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

  return (
      <div className="photo-picker__wrapper">
          <Button type="primary" icon="picture">Background Photo</Button>
          <Modal okText="Create"
                 visible={showModal}
                 width={600}
                 title="Choose a Background Photo"
                 onCancel={toggleModal}
                 onOk={() => console.log("OK")}
                 footer={null}
                 >
          </Modal>
      </div>
  );
};
