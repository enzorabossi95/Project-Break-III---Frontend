import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../store/authSlice.js';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { Button } from '../../components/Button/Button.jsx';

export function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [validationError, setValidationError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setValidationError('Completá todos los campos');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setValidationError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setValidationError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setValidationError(null);
        const { confirmPassword, ...dataToSend } = formData;

        try {
            await dispatch(registerThunk(dataToSend)).unwrap();
            navigate('/login');
        } catch {
            // el error ya queda reflejado en el estado global (state.auth.error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Crear cuenta</h1>

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

            <FormInput
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            {(validationError || error) && <p>{validationError || error}</p>}

            <Button type="submit" disabled={loading}>
                {loading ? 'Creando cuenta...' : 'Registrarme'}
            </Button>
        </form>
    );
}
