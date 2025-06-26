import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import Dogs from '../Assets/Dogs';
import { UserContext } from '../UserContext';
import React from 'react';

const Header = () => {
  const context = React.useContext(UserContext);

  return (
    <header className={styles.header}>
        <nav className={`${styles.nav} container`}>
          <Link className={styles.logo} to="/" aria-label='Dogs - Home'>
            <Dogs />
          </Link>
          <Link className={styles.login} to="/login">
            
          </Link>
        </nav>
    </header>
  )
}

export default Header
