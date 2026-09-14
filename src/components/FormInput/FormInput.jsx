import { useEffect, useRef } from 'react';

export function FormInput({ label, value, onChange, error, type, name, autoFocus = false, multiline = false }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    return (
        <>
        <label>
            {label}
            {multiline ? (
                <textarea
                    ref={inputRef}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    ref={inputRef}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            )}
        </label>
        {error && <span>{error}</span>}
        </>
    )
}