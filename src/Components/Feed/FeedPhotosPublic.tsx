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
  page?: number;
  setInfinite: React.Dispatch<React.SetStateAction<boolean>>; 
}

const FeedPhotosPublic: React.FC<FeedPhotosProps> = ({ page, setModalPhoto, setInfinite }) => {

    const { user: photos, loading, error, request } = useFetch<Photo[]>();

    React.useEffect(() => {
        async function fetchPhotos() {
            const total = 6;
            const {url, options} = PHOTOS_GET({
                page, 
                total: 6
            });
            const {response, json} = await request(url, options);
            if (response && response.ok && json.length < total) {
                setInfinite(false);
            }
            console.log(json);
        }
        fetchPhotos();
    }, [request, page, setInfinite]);

    if (error) return <Errorp error={{ message: error }}/>
    if (loading) return <Loading/>;
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
};

export default FeedPhotosPublic;