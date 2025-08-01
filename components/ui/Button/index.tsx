import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           isLoading,
                                           ...props
                                       }) => {
    return (
        <button className={styles.button} disabled={isLoading} {...props}>
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;