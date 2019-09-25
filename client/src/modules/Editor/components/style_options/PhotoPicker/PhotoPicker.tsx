import React, { FunctionComponent, useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Input, Icon, Spin } from "antd";
import "./PhotoPicker.css";
const pexels = require("../../../../../../static/pexels.jpg");
import { PreviewThumbnail } from "./PreviewThumbnail";
import { PhotoDetails } from "./PhotoDetails";
import { UPDATE_USER_STYLES } from "../../../../../queries";

const { Search } = Input;

const defaultPhotos = [
  "https://res.cloudinary.com/dgeb3iekh/image/upload/c_thumb,w_200,g_face/v1569115437/glaciers.jpg",
  "https://res.cloudinary.com/dgeb3iekh/image/upload/c_thumb,w_200,g_face/v1569115393/island.jpg",
  "https://res.cloudinary.com/dgeb3iekh/image/upload/c_thumb,w_200,g_face/v1569109242/skyscrapers.jpg",
  "https://res.cloudinary.com/dgeb3iekh/image/upload/c_thumb,w_200,g_face/v1569109237/leaves.jpg",
  "https://res.cloudinary.com/dgeb3iekh/image/upload/c_thumb,w_200,g_face/v1569109230/hot-air-balloon.jpg",
  "https://res.cloudinary.com/dgeb3iekh/image/upload/c_thumb,w_200,g_face/v1558826020/astrology-astronomy-background-image-956981_1_x1s9n0.jpg"
];

export const PhotoPicker: FunctionComponent<any> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [photos, setPhotos] = useState<Array<any>>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);


  // Test of DefinePlugin variables -- It works! But TS will still flag as undefined, so it needs to be ignored
  // for the time being
  //@ts-ignore
  // const wtf: string = TEST;
  // console.log("VAR TEST", wtf);

  const getPhotos = async () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3000/photos?search=${encodeURIComponent(searchTerm)}`
      )
      .then(res => {
        console.log(res);
        setPhotos(res.data.photos);
        setLoading(false);
      });
  };

  const onSearch = (val: string) => {
    setSearchTerm(val);
  };

  useEffect(() => {
    searchTerm && getPhotos();
  }, [searchTerm]);

  useEffect(() => {
    selectedPhoto && setShowDetails(true);
  }, [selectedPhoto])

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const selectPhoto = (e: React.MouseEvent, url: string) => {
      setSelectedPhoto(url)
  };

  const choose = () => {

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
        title={
          <h4 className="photo-picker__title">
            <Icon
              type="picture"
              style={{ color: "#fff", opacity: 0.7, fontSize: 24 }}
            />{" "}
            Choose a Background Photo
          </h4>
        }
        onCancel={toggleModal}
        onOk={() => console.log("OK")}
        footer={
          <div className="pexels__wrapper">
            Photos provided by{" "}
            <a
              className="pexels__link"
              target="_blank"
              href="https://www.pexels.com"
            >
              <img className="pexels__logo" src={pexels} />
              <strong>Pexels</strong>
            </a>
          </div>
        }
      >
        <div className="photo-picker__input-wrapper">
          <p>
            You can select one of these pre-selected cover photos, or search for
            thousands of other options through the Pexels API!
          </p>
          <Search
            size="large"
            className="photo-picker__search"
            placeholder="Image keyword, e.g. nature, code"
            onSearch={onSearch}
          />
        </div>
        <div className="photo-picker__default">
          {(photos.length < 1 && !loading) &&
            defaultPhotos.map((photo, i) => (
              <PreviewThumbnail key={photo + i} url={photo} />
            ))}
          {(photos && !loading) &&
            photos.map((photo, i) => (
              <PreviewThumbnail key={photo + i} url={photo.src.tiny} selectPhoto={(e: React.MouseEvent) => selectPhoto(e, photo.src.landscape)}/>
            ))}
        </div>
        {loading && <div className="photos__loader"><Spin tip="Loading..."/></div>}
        {selectedPhoto && <PhotoDetails show={showDetails} img={selectedPhoto} close={toggleDetails}/>}
      </Modal>
    </div>
  );
};
