import styles from './button.module.css';
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

    const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button {...props} className={styles.button}>
            {children}
        </button>
    )
    }

export default Button
