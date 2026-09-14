import {createBrowserRouter} from 'react-router-dom';
import { Layout } from '../components/Layout/Layout.jsx';
import { HomePage } from '../pages/HomePage/HomePage.jsx';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage.jsx';
import { ProductDetailPage } from '../pages/ProductDetailPage/ProductDetailPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage.jsx';
import { LoginPage } from '../pages/LoginPage/LoginPage.jsx';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage.jsx';
import { CartPage } from '../pages/CartPage/CartPage.jsx';
import { CheckoutPage } from '../pages/CheckoutPage/CheckoutPage.jsx';
import { CheckoutSuccessPage } from '../pages/CheckoutSuccessPage/CheckoutSuccessPage.jsx';
import { WishlistPage } from '../pages/WishlistPage/WishlistPage.jsx';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage.jsx';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute.jsx';
import { AdminRoute } from '../components/AdminRoute/AdminRoute.jsx';
import { AdminPage } from '../pages/AdminPage/AdminPage.jsx';
import { AdminProductsPage } from '../pages/AdminProductsPage/AdminProductsPage.jsx';
import { AdminProductFormPage } from '../pages/AdminProductFormPage/AdminProductFormPage.jsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,       // ruta padre
        children: [
            { index: true,           element: <HomePage/> },
            { path: "products",        element: <ProductsPage/> },
            { path: "products/:id",    element: <ProductDetailPage/> },
            { path: "login",        element: <LoginPage/> },
            { path: "register",     element: <RegisterPage/> },
            {
                element: <PrivateRoute/>,
                children: [
                    { path: "cart",             element: <CartPage/> },
                    { path: "checkout",         element: <CheckoutPage/> },
                    { path: "checkout-success", element: <CheckoutSuccessPage/> },
                    { path: "wishlist",         element: <WishlistPage/> },
                    { path: "profile",          element: <ProfilePage/> },
                ]
            },
            {
                element: <AdminRoute/>,
                children: [
                    { path: "admin",                        element: <AdminPage/> },
                    { path: "admin/products",                element: <AdminProductsPage/> },
                    { path: "admin/products/new",             element: <AdminProductFormPage/> },
                    { path: "admin/products/:id/edit",        element: <AdminProductFormPage/> },
                ]
            },
            { path: "*",            element: <NotFoundPage/> }
        ]
    }
])