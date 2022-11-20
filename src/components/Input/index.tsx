import React from 'react';
import styles from './style.module.scss';

interface IProps {
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    icon?: JSX.Element;
}

const Input: React.FC<IProps> = props => {
    return (
        <label className={styles.input} {...props.labelProps}>
            <div className={styles.icon}>
                {
                    props.icon
                }
            </div>
            <input {...props.inputProps} />
        </label>
    )
}

export default Input