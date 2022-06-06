import { all } from 'redux-saga/effects';
import authSaga from '../modules/auth/saga'
import userManagerSaga from '../modules/adminPage/pages/user-manager/saga';
import categoryManagerSaga from '../modules/adminPage/pages/category-manager/saga';
import productManagerSaga from '../modules/adminPage/pages/product-manager/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        userManagerSaga(),
        categoryManagerSaga(),
        productManagerSaga(),
    ]);
}