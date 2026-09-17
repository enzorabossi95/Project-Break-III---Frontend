# Distrito Cerveza — Frontend

E-commerce de insumos de cervecería casera. React + Vite, Redux Toolkit para estado global, consume la API propia (Express + Prisma/Postgres + MongoDB).

## Stack

- React 19 + Vite
- React Router (rutas públicas, privadas y de admin)
- Redux Toolkit (auth, carrito, wishlist)
- Axios (con cookies, no localStorage)

## Funcionalidades

- Catálogo con búsqueda, orden y filtro por categoría, detalle de producto con reseñas y rating
- Registro / login, sesión con cookie httpOnly (no hay token guardado en el navegador)
- Carrito y wishlist sincronizados con el backend, con validación de stock
- Checkout con Stripe (modo test)
- Panel de administración (`/admin`, solo rol `ADMIN`): CRUD de productos con subida de imágenes a Cloudinary

## Requisitos

- Node.js 18+
- El backend corriendo (local o desplegado)

## Instalación

```bash
npm install
```

## Variables de entorno

```bash
cp .env.example .env
```

| Variable       | Descripción         | Default                 |
| -------------- | -------------------- | ------------------------ |
| `VITE_API_URL` | URL base de la API   | `http://localhost:3000`  |

## Scripts

| Comando           | Qué hace                       |
| ------------------ | -------------------------------- |
| `npm run dev`       | Servidor de desarrollo (Vite)   |
| `npm run build`     | Build de producción (`dist/`)   |
| `npm run preview`   | Sirve el build localmente       |
| `npm run lint`      | ESLint sobre todo el proyecto   |

## Backend

API separada (Express, Prisma/Postgres para productos/pedidos, MongoDB para reseñas/wishlist), en su propio repo. Tiene que estar corriendo (o desplegada) con `VITE_API_URL` apuntando ahí.

## Estructura

```
src/
  api/          # llamadas HTTP, una función por endpoint
  hooks/        # custom hooks de datos (useProducts, useProduct, useReviews)
  store/        # Redux Toolkit: slices de auth, cart, wishlist
  components/   # Layout, Header, Footer, ProductCard, formularios,
                # rutas protegidas (PrivateRoute, AdminRoute), etc.
  pages/        # catálogo, detalle, carrito, checkout, login/registro,
                # perfil, panel de admin (lista + formulario de productos)
  router/
  styles/
```

## Decisiones que se apartan un poco del tutorial

- **AdminRoute espera a que la sesión termine de cargar antes de decidir el acceso.** Sin token que leer al instante (ahora vive en una cookie), hay que consultarle al backend; sin esa espera, un admin real podía quedar afuera al recargar `/admin` por una carrera con esa consulta.
- **El checkout con Stripe confirma el pago en el backend antes de crear el pedido**, releyendo el carrito del servidor en vez de confiar en el cliente.
- **Validación de stock al agregar al carrito y al confirmar la compra**, agregada tras la corrección de Módulo 2 (el profesor señaló que faltaba).
