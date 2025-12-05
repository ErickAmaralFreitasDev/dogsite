import React from "react";
import styles from "./FeedPhotosItem.module.css";
import Image from "../Helper/Image";

interface Photo {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: number;
  total_comments: number;
}

interface PhotoContentData {
  photo: Photo;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | null>>;
}

interface FeedPhotosItemProps {
  photo: Photo;
  user: PhotoContentData;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | null>>;
}

const FeedPhotosItem: React.FC<FeedPhotosItemProps> = ({ photo, setModalPhoto }) => {
    function handleClick() {
        setModalPhoto(photo);
    }

    return <li className={styles.photo} onClick={handleClick}>
        <Image src={photo.src} alt={photo.title}/>
        <span className={styles.view}>{photo.title}</span>
    </li>;
}

export default FeedPhotosItem;