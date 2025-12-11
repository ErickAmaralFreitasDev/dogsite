import React from "react";
import useFetch from "../Hooks/useFetch";
import styles from "./PhotoContent.module.css";
import { Link } from "react-router-dom";
import PhotoComments from "./PhotoComments";
import VisualizacaoIcon from "./VisualizacaoIcon";
import { UserContext } from "../UserContext";
import PhotoDelete from "./PhotoDelete";
import Image from "../Components/Helper/Image";

interface PhotoData {
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
  photo: PhotoData;
  comments: any[]; 
}

interface PhotoContentProps {
  user: PhotoContentData;
  single?: boolean; 
}

const PhotoContent: React.FC<PhotoContentProps> = ({ user, single }) => {
    const context = React.useContext(UserContext);
    const {photo, comments} = user;
    const isPhotoOwner = context?.user?.username === photo.author;

    return <div className={`${styles.photo} ${single ? styles.single : ''}`}>
        <div className={styles.img}>
            <Image src={photo.src} alt={photo.title}/>
        </div>
        <div className={styles.details}>
            <div>
                <p className={styles.author}>
                    {isPhotoOwner && <PhotoDelete id={photo.id} />}
                    <Link to={`/perfil/${user.photo.author}`}>@{user.photo.author}</Link>
                    <span className={styles.visualizacoes}>                        
                        <VisualizacaoIcon 
                            width={16}
                            height={10}
                            className={styles.icon}
                        />
                        {user.photo.acessos} views
                    </span>
                </p>
                <h1 className={styles.title}>
                    <Link to={`/foto/${user.photo.id}`}>
                        {user.photo.title}
                    </Link>
                </h1>
                <ul className={styles.atributos}>
                    <li>{user.photo.peso} kg</li>
                    <li>{user.photo.idade} anos</li>
                </ul>
            </div>
        </div>
        <PhotoComments id={user.photo.id} single={single} comments={comments} />
    </div>;
}

export default PhotoContent;