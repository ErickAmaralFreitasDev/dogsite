import React from "react";
import styles from "./Image.module.css";

interface ImageProps {
    alt: string;
    src: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ alt, src, className = "", ...props }) => {
    const [skeleton, setSkeleton] = React.useState(true);

    function handleLoad(event: React.SyntheticEvent<HTMLImageElement, Event>) {
        setSkeleton(false);
        event.currentTarget.style.opacity = "1";
    }

    return (
        <div className={styles.wrapper}>
            {skeleton && <div className={styles.skeleton}></div>}
            <img onLoad={handleLoad} className={styles.img} src={src} alt={alt} {...props} />
        </div>
    );
}

export default Image;