import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import Dogs from '../Assets/Dogs';
import { UserContext } from '../UserContext';
import React from 'react';

const Header = () => {
  const context = React.useContext(UserContext);
  
  if (!context) {
    throw new Error('Header must be used within a UserStorage');
  }

  const { user } = context;

  return (
    <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          <Link className={styles.logo} to="/" aria-label='Dogs - Home'>
            <Dogs />
          </Link>
          {user ? (
            <Link className={styles.login} to="/conta">
              {user.nome}
            </Link>
          ) : (
            <Link className={styles.login} to="/login">
              Login/Criar
            </Link>
          )}
        </nav>
    </header>
  )
}

export default Header
