import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ProductDetail from './pages/ProductDetail';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import NewsPage from './pages/NewsPage';
import NotFoundPage from '../../components/notFoundPage';

const UserRouter = () => {
    return (
        <Routes>
            <Route path='/'
                element={<HomePage />}
            />
            <Route path='/menu'
                element={<MenuPage />}
            />
             <Route path='/menu/:id'
                element={<ProductPage />}
            />
            <Route path='/product/:id'
                element={<ProductDetail />}
            />
            <Route path='/cart'
                element={<CartPage />}
            />
            <Route path='/news'
                element={<NewsPage />}
            />
            <Route path='/*'
                element={<NotFoundPage />}
            />
        </Routes>
    )
}

export default UserRouter;