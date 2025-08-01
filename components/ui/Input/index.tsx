import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <div className={styles.inputContainer}>
                {label && <label className={styles.label}>{label}</label>}
                <input type='number'  ref={ref} className={styles.input} {...props} />
                {error && <span className={styles.error}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;