import React from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { UserContext } from "../../UserContext";
import { PHOTO_POST } from "../../Hooks/api";
import { Errorp } from "../Helper/Errorp";
import {useNavigate} from 'react-router-dom';
import Head from '../Helper/Head';

interface ImgState {
  raw: File;
  preview?: string;
}

const UserPhotoPost= () => {
    const nome = useForm('username');
    const peso = useForm(false); 
    const idade = useForm(false); 
    const [img, setImg] = React.useState<ImgState | null>(null);
    const context = React.useContext(UserContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('useContext deve estar dentro do Provider');
    }

    const { userLogin } = context;
    const { user, error, loading, request } = useFetch<any>();

    React.useEffect(() => {
        if (user) {
            navigate('/conta');
        }
    }, [user, navigate]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!nome.validate() || !peso.validate() || !idade.validate() || !img) return;
        const formData = new FormData();
        formData.append('img', img.raw);
        formData.append('nome', nome.value);
        formData.append('peso', peso.value);
        formData.append('idade', idade.value);

        const token = window.localStorage.getItem('token');
        if (!token) return;
        const { url, options } = PHOTO_POST({ formData, token });
        console.log('Enviando:', { url, options, formData: Array.from(formData.entries()) });
        request(url, options);
    }

    function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { files } = event.target;
        if (files && files.length > 0) {
            setImg({
                preview: URL.createObjectURL(files[0]),
                raw: files[0]
            });
        }
    }

    return (
        <section className={`${styles.photoPost} animeLeft`}>
            <Head
                title='Posting'
            />
            <form onSubmit={handleSubmit}>
                <Input label='Nome' type="text" name='nome' {...nome}/>
                <Input label='Peso' type="number" name='peso' {...peso}/>
                <Input label='Idade' type="number" name='idade' {...idade}/>
                <input
                    className={styles.file} 
                    type='file' 
                    name='img' 
                    id='img' 
                    onChange={handleImgChange}
                />
                {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button>}
                <Errorp error={error ? { message: error } : undefined} />
            </form>
            <div>
                {img && img.preview && (
                    <div 
                        className={styles.preview} 
                        style={{backgroundImage: `url(${img.preview})`}}
                    >
                    </div>
                )}
            </div>
        </section>
    );
};

export default UserPhotoPost;

