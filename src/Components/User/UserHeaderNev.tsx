import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import FeedIcon from "../../Assets/FeedIcon"; 
import EstatisticasIcon from "../../Assets/EstatisticasIcon";
import AdicionarIcon from "../../Assets/AdicionarIcon";
import SairIcon from "../../Assets/SairIcon";
import styles from "./UserHeaderNev.module.css"; // Importando o CSS
import useMedia from "../../Hooks/useMedia";
import { useLocation } from "react-router-dom"; 

const UserHeader = () => {
    const context = React.useContext(UserContext);
    const mobile = useMedia('(max-width: 40rem)');
    const [mobileMenu, setMobileMenu] = React.useState(false);
  
    if (!context) {
        throw new Error('Header must be used within a UserStorage');
    }

    const { userLogout } = context;
    const navigate = useNavigate();

    function handleLogout () {
        userLogout();
        navigate('/login');
    }

    const {pathname} = useLocation();
    React.useEffect(() => {
        setMobileMenu(false);
    }, [pathname]);

    return (
        <>
            {mobile && (
                <button 
                    aria-label='Menu'
                    className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
                    onClick={() => setMobileMenu(!mobileMenu)}>
                </button>
            )}
            <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
                <NavLink to="/conta" end>
                    <FeedIcon />
                    {mobile && <span>Minhas Fotos</span>}
                </NavLink>
                <NavLink to="/conta/estatisticas">
                    <EstatisticasIcon />
                    {mobile && <span>Minhas Estatísticas</span>}
                </NavLink>
                <NavLink to="/conta/posts">
                    <AdicionarIcon />
                    {mobile && <span>Postar Foto</span>}
                </NavLink>
                <button onClick={handleLogout}>
                    <SairIcon />
                    {mobile && <span>Sair</span>}
                </button>
            </nav>
        </>
    );
};

export default UserHeader;