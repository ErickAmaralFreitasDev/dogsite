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
}

const FeedPhotos: React.FC<FeedPhotosProps> = ({setModalPhoto}) => {

    const {user, loading, error, request} = useFetch<Photo[]>();

    React.useEffect(() => {
        async function fetchPhotos() {
            const {url, options} = PHOTOS_GET({
                page: 1, 
                total: 6, 
                user: 0
            });
            const {json} = await request(url, options);
            console.log(json);
        }
        fetchPhotos();
    }, [request]);

    if (error) return <Errorp error={{ message: error }}/>
    if (loading) return <Loading/>;
    if (user && Array.isArray(user))
    return (
        <ul className={`${styles.feed} animeLeft`}>
            {user.map(photo => (
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