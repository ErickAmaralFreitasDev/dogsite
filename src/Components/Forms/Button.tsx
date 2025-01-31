import styles from './button.module.css';

interface ButtonProps {
    children: React.ReactNode;
  }

    function Button({ children, ...props }: ButtonProps) {
    return (
        <button {...props} className={styles.button}>
            {children}
        </button>
    )
    }

export default Button
