import React from "react";
import styles from "./FeedPhotosItem.module.css";
import Image from "../Helper/Image";

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleCLick() {
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo} onClick={handleCLick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
