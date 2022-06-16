import { all } from 'redux-saga/effects';
import authSaga from '../modules/auth/saga'
import userManagerSaga from '../modules/adminPage/pages/user-manager/saga';
import categoryManagerSaga from '../modules/adminPage/pages/category-manager/saga';
import productManagerSaga from '../modules/adminPage/pages/product-manager/saga';
import OrderManagerSaga from '../modules/adminPage/pages/order-manager/saga';
import UserPageSaga from '../modules/userPage/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        userManagerSaga(),
        categoryManagerSaga(),
        productManagerSaga(),
        UserPageSaga(),
        OrderManagerSaga(),
    ]);
}
