
import styles from './Footer.module.css'
import DogsFooter from '../Assets/DogsFooter' 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <DogsFooter/>
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  )
}

export default Footer
