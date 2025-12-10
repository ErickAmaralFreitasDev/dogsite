import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { PHOTO_GET } from "../Hooks/api";
import { Errorp } from "../Components/Helper/Errorp";
import { Loading } from "../Components/Helper/Loading";
import PhotoContent from "./PhotoContent";

interface PhotoApiResponse {
  photo: {
    id: number;
    author: string;
    title: string;
    date: string;
    src: string;
    peso: string;
    idade: string;
    acessos: number;
    total_comments: number;
  };
  comments: any[];
}

const Photo = () => {
    const {id} = useParams();
    const { user, loading, error, request } = useFetch<PhotoApiResponse>();

    React.useEffect(() => {
        const {url, options} = PHOTO_GET({ id: Number(id) });
        request(url, options);
    }, [id, request]);

    if (error) return <Errorp error={{ message: error }}/>
    if (loading) return <Loading/>;
    if (user)
    return (
        <section className="container mainContainer">   
            <PhotoContent single={true} user={user}/>
        </section>);
    else return null;
};

export default Photo;