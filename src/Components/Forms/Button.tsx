import styles from './button.module.css';
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

    const Button = ({ children, ...props }: ButtonProps) => {
        return (
            <button {...props} disabled={props.disabled} className={`${styles.button} ${props.disabled ? styles.disabled : ""}`}>
                {children}
            </button>
        )
    }

export default Button
