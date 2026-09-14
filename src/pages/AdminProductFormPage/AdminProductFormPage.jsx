import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../../api/products.js';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { Button } from '../../components/Button/Button.jsx';

const EMPTY_FORM = {
    name: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
};

export function AdminProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [fieldErrors, setFieldErrors] = useState({});
    const [loadError, setLoadError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(isEditing);

    useEffect(() => {
        if (!isEditing) return;

        let cancelled = false;

        async function fetchProduct() {
            setLoadingProduct(true);
            try {
                const product = await getProductById(id);
                if (cancelled) return;
                setFormData({
                    name: product.name ?? '',
                    price: String(product.price ?? ''),
                    stock: String(product.stock ?? ''),
                    description: product.description ?? '',
                    imageUrl: product.imageUrl ?? '',
                });
            } catch {
                if (!cancelled) setLoadError('No se pudo cargar el producto');
            } finally {
                if (!cancelled) setLoadingProduct(false);
            }
        }

        fetchProduct();
        return () => {
            cancelled = true;
        };
    }, [id, isEditing]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function validate() {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'El nombre es obligatorio';
        }

        if (formData.price === '') {
            errors.price = 'El precio es obligatorio';
        } else if (Number.isNaN(Number(formData.price)) || Number(formData.price) < 0) {
            errors.price = 'El precio debe ser un número mayor o igual a 0';
        }

        if (formData.stock !== '' && (Number.isNaN(Number(formData.stock)) || Number(formData.stock) < 0)) {
            errors.stock = 'El stock debe ser un número mayor o igual a 0';
        }

        return errors;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const errors = validate();
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const payload = {
            name: formData.name.trim(),
            price: Number(formData.price),
            stock: formData.stock === '' ? 0 : Number(formData.stock),
            description: formData.description.trim(),
            imageUrl: formData.imageUrl.trim() || undefined,
        };

        setSubmitting(true);
        setSubmitError(null);
        try {
            if (isEditing) {
                await updateProduct(id, payload);
            } else {
                await createProduct(payload);
            }
            navigate('/admin/products');
        } catch (err) {
            setSubmitError(err.response?.data?.error?.message ?? 'No se pudo guardar el producto');
        } finally {
            setSubmitting(false);
        }
    }

    if (loadingProduct) return <div>Cargando producto...</div>;
    if (loadError) return <div>{loadError}</div>;

    return (
        <div>
            <h1>{isEditing ? 'Editar producto' : 'Crear producto'}</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Nombre"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    error={fieldErrors.name}
                    autoFocus
                />
                <FormInput
                    label="Precio"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    error={fieldErrors.price}
                />
                <FormInput
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    error={fieldErrors.stock}
                />
                <FormInput
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                />
                <FormInput
                    label="URL de imagen (temporal, hasta integrar Cloudinary)"
                    name="imageUrl"
                    type="text"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
                {submitError && <p>{submitError}</p>}
                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
                </Button>
            </form>
        </div>
    );
}
