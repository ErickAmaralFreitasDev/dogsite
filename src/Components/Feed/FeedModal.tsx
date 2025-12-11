import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../Hooks/api";
import { Errorp } from "../Helper/Errorp";
import { Loading } from "../Helper/Loading";
import PhotoContent from "../../Photo/PhotoContent";

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
  comments: any[];
}

interface FeedModalProps {
  photo: Photo;
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | null>>;
}

const FeedModal: React.FC<FeedModalProps> = ({ photo, setModalPhoto }) => {
    const {user, loading, error, request} = useFetch<PhotoContentData>();

    React.useEffect(() => {
        const {url, options} = PHOTO_GET({ id: photo.id });
        request(url, options);
    }, [request, photo]);

    function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            setModalPhoto(null);
        }
    }

    return( 
    <div className={styles.modal} onClick={handleOutsideClick}>
        {error && <Errorp error={{ message: error }} />}
        {loading && <Loading/>}
        {/* <img src={photo.src} alt={photo.title} /> */}
        {!!user && <PhotoContent user={user} />}
    </div>
    );
}

export default FeedModal;