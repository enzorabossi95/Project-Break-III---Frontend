import { useEffect, useRef } from 'react';
import styles from './FormInput.module.css';

export function FormInput({ label, value, onChange, error, type, name, autoFocus = false, multiline = false }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const inputClassName = [
        styles.input,
        multiline && styles.textarea,
        error && styles.inputWithError,
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.field}>
            <label className={styles.label}>
                {label}
                {multiline ? (
                    <textarea
                        ref={inputRef}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={inputClassName}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className={inputClassName}
                    />
                )}
            </label>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}
