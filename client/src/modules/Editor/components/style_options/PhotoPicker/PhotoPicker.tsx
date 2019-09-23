import React, { FunctionComponent, useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Input, Icon } from "antd";
import "./PhotoPicker.css";
const pexels = require("../../../../../../static/pexels.jpg");
import { PreviewThumbnail } from "./PreviewThumbnail";

const { Search } = Input;

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [photos, setPhotos] = useState<Array<any>>([]);

  console.log("API", process.env);

  const getPhotos = async () => {
      axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=15&page=1`)
  };

  const onSearch = (val: string) => {
    setSearchTerm(val);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="photo-picker__wrapper">
      <Button type="primary" icon="picture" onClick={toggleModal}>
        Background Photo
      </Button>
      <Modal
    okText="Create"
    visible={showModal}
    width={875}
    className="photo-picker__modal"
    title={<h4 className="photo-picker__title"><Icon type="picture" style={{ color: '#fff', opacity: 0.7, fontSize: 24}}/> Choose a Background Photo</h4>}
    onCancel={toggleModal}
    onOk={() => console.log("OK")}
    footer={
        <div className="pexels__wrapper">
            Dynamic photos through{" "}
            <a
                className="pexels__link"
                target="_blank"
                href="https://www.pexels.com"
            >
                <img className="pexels__logo" src={pexels}/>
                <strong>Pexels</strong>
            </a>
        </div>
    }
      >
          <div className="photo-picker__input-wrapper">
              <p>You can select one of our gorgeous pre-selected cover photos, or search for thousands of other options through the Pexels API!</p>
              <Search size="large" className="photo-picker__search" placeholder="Image keyword, e.g. nature, code" onSearch={onSearch}/>
          </div>
          <div className="photo-picker__default">
              {defaultPhotos.map(photo => (<PreviewThumbnail url={photo}/>))}

          </div>
      </Modal>
    </div>
  );
};
