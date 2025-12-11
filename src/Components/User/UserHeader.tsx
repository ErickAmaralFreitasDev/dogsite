import React from "react";
import UserHeaderNev from "./UserHeaderNev";
import styles from "./UserHeader.module.css";
import { useLocation } from "react-router-dom"; 

const UserHeader = () => {
    const [title, setTitle] = React.useState('');
    const location = useLocation();

    React.useEffect(() => {
        setTitle(location.pathname);
        switch (location.pathname) {
            case '/conta':
                setTitle('Minhas Fotos');
                break;
            case '/conta/posts':
                setTitle('Postar Foto');
                break;
            case '/conta/estatisticas':
                setTitle('Minhas Estatísticas');
                break;
            default:
                setTitle('Minha Conta');
        }
    }, [location]);

    return (
        <header className={styles.header}>
            <h1 className='title'>{title}</h1>
            <UserHeaderNev />
        </header>
    );
}

export default UserHeader;