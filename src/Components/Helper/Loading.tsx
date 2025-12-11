import React from "react";
import styles from "./Loading.module.css";
import Carregando from "../../Assets/Carregando";



const Loading = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <Carregando />
            </div>
        </div>
    );
}

export { Loading };