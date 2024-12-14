
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className={styles.header}>
      <nav>
        <nav className={styles.header}>
          <Link to="/">Home</Link>
          <Link to="/login">Login / Criar</Link>
        </nav>
      </nav>
    </div>
  )
}

export default Header
