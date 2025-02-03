import styles from './input.module.css';

interface InputProps {
    label: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    onBlur?: () => void; 
  }
  
  function Input({ label, type = "text", name, value, onChange, error, onBlur  }: InputProps) {

    return (
        <div className={styles.wrapper}>
            <label htmlFor={name} className={styles.label}>{label}</label>
            <input 
                id={name} 
                name={name} 
                className={styles.input} 
                type={type} 
                value={value} 
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}

export default Input
