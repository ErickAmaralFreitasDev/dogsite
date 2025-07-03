import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import FeedIcon from "../../Assets/FeedIcon"; 
import EstatisticasIcon from "../../Assets/EstatisticasIcon";
import AdicionarIcon from "../../Assets/AdicionarIcon";
import SairIcon from "../../Assets/SairIcon";
import styles from "./UserHeaderNev.module.css"; // Importando o CSS

const UserHeader = () => {
    const [mobile, setMobile] = React.useState(null);
  const context = React.useContext(UserContext);
  
  if (!context) {
    throw new Error('Header must be used within a UserStorage');
  }

  const { userLogout } = context;

    return (
        <nav className={styles.nav}>
            <NavLink to="/conta" end>
                <FeedIcon />
                {mobile && 'Minhas Fotos'}
            </NavLink>
            <NavLink to="/conta/estatisticas">
                <EstatisticasIcon />
                {mobile && 'Minhas Estatísticas'}
            </NavLink>
            <NavLink to="/conta/postar">
                <AdicionarIcon />
                {mobile && 'Postar Foto'}
            </NavLink>
            <button onClick={userLogout}>
                <SairIcon />
                {mobile && 'Sair'}
            </button>
        </nav>
    );
};

export default UserHeader;