import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, getProductById } from '../../api/products.js';
import { FormInput } from '../../components/FormInput/FormInput.jsx';
import { Button } from '../../components/Button/Button.jsx';
import styles from './AdminProductFormPage.module.css';

const EMPTY_FORM = {
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
};

export function AdminProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
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
                    category: product.category ?? '',
                    price: String(product.price ?? ''),
                    stock: String(product.stock ?? ''),
                    description: product.description ?? '',
                });
                setCurrentImageUrl(product.imageUrl ?? null);
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

    const [previewUrl, setPreviewUrl] = useState(null);
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (!imageFile) {
            setPreviewUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(imageFile);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);
    /* eslint-enable react-hooks/set-state-in-effect */

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleFileChange(e) {
        setImageFile(e.target.files[0] ?? null);
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

        const payload = new FormData();
        payload.append('name', formData.name.trim());
        payload.append('category', formData.category);
        payload.append('price', formData.price);
        payload.append('stock', formData.stock === '' ? '0' : formData.stock);
        payload.append('description', formData.description.trim());
        if (imageFile) {
            payload.append('image', imageFile);
        }

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

    const imageToShow = previewUrl ?? currentImageUrl;

    return (
        <div>
            <h1 className={styles.title}>{isEditing ? 'Editar producto' : 'Crear producto'}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                    label="Categoría"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
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
                <label className={styles.field}>
                    <span className={styles.label}>Imagen</span>
                    <input className={styles.fileInput} type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                {imageToShow && <img className={styles.preview} src={imageToShow} alt="Vista previa" />}
                {submitError && <p className={styles.error}>{submitError}</p>}
                <Button type="submit" disabled={submitting}>
                    {submitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
                </Button>
            </form>
        </div>
    );
}
