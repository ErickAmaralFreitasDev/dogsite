import React from "react";
import useFetch from "../Hooks/useFetch";
import styles from "./PhotoContent.module.css";
import { Link } from "react-router-dom";
import PhotoComments from "./PhotoComments";

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
}

const PhotoContent: React.FC<PhotoContentProps> = ({ user }) => {
    console.log(user);
    const {photo, comments} = user;

    return <div className={styles.photo}>
        <div className={styles.img}>
            <img src={user.photo.src} alt={user.photo.title} />
        </div>
        <div>
            <p>
                <Link to={`/perfil/${user.photo.author}`}>@{user.photo.author}</Link>
            </p>
            <span>{user.photo.acessos} views</span>
        </div>
        <h1 className="title">
            <Link to={`/foto/${user.photo.id}`}>{user.photo.title}</Link>
        </h1>
        <ul className={styles.atributos}>
            <li>{user.photo.peso} kg</li>
            <li>{user.photo.idade} anos</li>
        </ul>
        <PhotoComments id={user.photo.id} comments={comments} />
    </div>;
}

export default PhotoContent;