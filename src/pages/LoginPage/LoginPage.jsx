import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../store/authSlice.js';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { Button } from '../../components/Button/Button.jsx';
import styles from './LoginPage.module.css';

export function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [validationError, setValidationError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setValidationError('Completá todos los campos');
            return;
        }
        setValidationError(null);
        try {
            await dispatch(loginThunk(formData)).unwrap();
            navigate('/');
        } catch {
            // no-op
        }
    }

    return (
        <div className={styles.page}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Iniciar sesión</h1>
                <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoFocus
                />
                <FormInput
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {(validationError || error) && (
                    <p className={styles.error}>{validationError || 'Email o contraseña incorrectos'}</p>
                )}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Iniciar sesión'}
                </Button>
            </form>
        </div>
    )
}
