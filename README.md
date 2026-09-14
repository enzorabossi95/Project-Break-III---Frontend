# Distrito Cerveza — Frontend

E-commerce de insumos de cervecería casera. Frontend en React + Vite, con estado global en Redux Toolkit, consumiendo una API REST propia (Express + Prisma/Postgres + MongoDB).

## Stack

- React 19 + Vite
- React Router (rutas públicas, privadas y de administrador)
- Redux Toolkit (auth, carrito, wishlist)
- Axios (con interceptores de autenticación)

## Funcionalidades implementadas

- Catálogo de productos con búsqueda y ordenamiento
- Detalle de producto con reseñas (rating promedio + listado) y formulario para dejar una reseña
- Registro / login con JWT, sesión persistente
- Carrito de compras (agregar, eliminar, checkout) y wishlist, sincronizados con el backend
- Panel de administración (`/admin`, solo rol `ADMIN`) con CRUD completo de productos

Pendiente (en desarrollo): subida de imágenes a Cloudinary, migración de auth a cookies httpOnly, integración de pagos con Stripe.

## Requisitos

- Node.js 18+
- El [backend](#backend) corriendo (local o desplegado)

## Instalación

```bash
npm install
```

## Variables de entorno

Copiá `.env.example` a `.env` y ajustá el valor si tu backend no corre en `localhost:3000`:

```bash
cp .env.example .env
```

| Variable       | Descripción                          | Default (si no se define) |
| -------------- | ------------------------------------- | -------------------------- |
| `VITE_API_URL` | URL base de la API (backend)          | `http://localhost:3000`    |

## Scripts disponibles

| Comando           | Descripción                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`       | Levanta el servidor de desarrollo (Vite)  |
| `npm run build`     | Build de producción (carpeta `dist/`)     |
| `npm run preview`   | Sirve el build de producción localmente   |
| `npm run lint`      | Corre ESLint sobre todo el proyecto       |

## Backend

Este frontend consume una API separada (Express, Prisma/Postgres para productos/órdenes, MongoDB para reseñas/wishlist), en su propio repositorio. Necesitás tenerla corriendo (o desplegada) y apuntar `VITE_API_URL` a su URL antes de usar el frontend.

## Estructura del proyecto

```
src/
  api/          # capa de llamadas HTTP (una función por endpoint, sin lógica de UI)
  hooks/        # custom hooks de datos (useProducts, useProduct, useReviews)
  store/        # Redux Toolkit: slices de auth, cart, wishlist
  components/   # componentes reutilizables (Layout, Header, Footer, ProductCard,
                # formularios, rutas protegidas PrivateRoute/AdminRoute, etc.)
  pages/        # vistas de cada ruta (catálogo, detalle, carrito, checkout,
                # login/registro, perfil, panel de administración)
  router/       # definición de rutas con react-router-dom
  styles/       # variables CSS y estilos globales
```
