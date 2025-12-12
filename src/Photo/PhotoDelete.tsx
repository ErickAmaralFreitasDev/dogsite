import React from "react";
import styles from "./PhotoDelete.module.css";
import { PHOTO_DELETE } from "../Hooks/api";

interface PhotoDeleteProps {
  id: number;
  onDelete?: () => void;
}

const PhotoDelete: React.FC<PhotoDeleteProps> = ({ id }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!window.confirm("Tem certeza que deseja deletar esta foto?")) {
      return;
    }

    const token = window.localStorage.getItem('token');

    if (!token) {
      setError('Você precisa estar logado para deletar fotos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { url, options } = PHOTO_DELETE({ 
        id, 
        token: token.trim()
      });

    const response = await fetch(url, options);

    if (response && response.ok) {
      window.location.reload();
    }
  }
    catch (err) {
      setError('Erro ao deletar a foto');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
        {loading ? (
            <button 
            className={styles.delete} 
            disabled
            >
                Deletar
            </button>

        ) : (
            <button 
            className={styles.delete} 
            onClick={handleClick}
            >
                Deletar
            </button>
        )}
        {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default PhotoDelete;