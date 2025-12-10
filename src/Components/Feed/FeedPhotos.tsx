import React from "react";
import useFetch from "../../Hooks/useFetch";
import {PHOTOS_GET} from "../../Hooks/api";
import { Errorp } from "../Helper/Errorp";
import { Loading } from "../Helper/Loading";
import FeedPhotosItem from "./FeedPhotosItem";
import styles from "./FeedPhotos.module.css";

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

interface FeedPhotosProps {
  setModalPhoto: React.Dispatch<React.SetStateAction<Photo | null>>
  userId?: number; 
}

const FeedPhotos: React.FC<FeedPhotosProps> = ({ userId, setModalPhoto }) => {

    const { user: photos, loading, error, request } = useFetch<Photo[]>();

    React.useEffect(() => {
        async function fetchPhotos() {
            const {url, options} = PHOTOS_GET({
                page: 1, 
                total: 6, 
                user: userId || 0 
            });
            console.log('🔍 FeedPhotos - URL chamada:', url);
            console.log('🔍 FeedPhotos - userId:', userId);
            const {json} = await request(url, options);
            console.log(json);
        }
        fetchPhotos();
    }, [request, userId]);

    if (error) return <Errorp error={{ message: error }}/>
    if (loading) return <Loading/>;
    if (userId && Array.isArray(photos))
    return (
        <ul className={`${styles.feed} animeLeft`}>
            {photos?.map(photo => (
                <FeedPhotosItem 
                    key={photo.id} 
                    photo={photo} 
                    setModalPhoto={setModalPhoto}
                />
            ))}
        </ul>
    );
    else return null;
};

export default FeedPhotos;