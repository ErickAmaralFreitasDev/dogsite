import React from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { UserContext } from "../../UserContext";
import { PHOTO_POST } from "../../Hooks/api";

const UserPhotoPost= () => {
    const nome = useForm('username');
    const peso = useForm(false); 
    const idade = useForm(false); 
    const [img, setImg] = React.useState<File | null>(null);
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error('useContext deve estar dentro do Provider');
    }

    const { userLogin } = context;
    const { user, error, loading, request } = useFetch<any>();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!nome.validate() || !peso.validate() || !idade.validate() || !img) return;
        const formData = new FormData();
        formData.append('img', img.raw);
        formData.append('nome', nome.value);
        formData.append('peso', peso.value);
        formData.append('idade', idade.value);

        // const token = window.localStorage.getItem('token');
        // const { url, options } = PHOTO_POST({ formData, token });
        // request(url, options);
    }

    // function handleImgChange({target}) {
    //     setImg({
    //         raw: target.files[0],
    //     });
    // }

    return (
        <section className={`${styles.photoPost} animeLeft`}>
            <form onSubmit={handleSubmit}>
                <Input label='Nome' type="text" name='nome'/>
                <Input label='Peso' type="text" name='peso'/>
                <Input label='Idade' type="text" name='idade'/>
                <input type='file' name='img' id='img' onChange={handleImgChange}/>
                <Button>Enviar</Button>
            </form>
        </section>
    );
};

export default UserPhotoPost;

