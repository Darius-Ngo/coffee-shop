import { combineReducers } from 'redux';
import authSlice from '../modules/auth/redux';
import UserManagerSlice from '../modules/adminPage/pages/user-manager/redux';
import CategoryManagerSlice from '../modules/adminPage/pages/category-manager/redux';
import ProductManagerSlice from '../modules/adminPage/pages/product-manager/redux';

export default combineReducers({
    auth: authSlice,
    userManager: UserManagerSlice,
    categoryManager: CategoryManagerSlice,
    productManager: ProductManagerSlice,
});
