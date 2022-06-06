import { Routes, Route } from 'react-router-dom';

import UserManager from './pages/user-manager';
import ProductManager from './pages/product-manager';
import OrderManager from './pages/order-manager';
import CategoryManager from './pages/category-manager';

const AdminRouter = () => {
    return (
        <Routes>
            <Route path='/user-manager'
                element={<UserManager />}
            />
             <Route path='/category-manager'
                element={<CategoryManager />}
            />
            <Route path='/product-manager'
                element={<ProductManager />}
            />
            <Route path='/order-manager'
                element={<OrderManager />}
            />
        </Routes>
    )
}

export default AdminRouter;