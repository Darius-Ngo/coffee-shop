import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { loginApi, registerApi } from '../../core/apis/auth'

import {
    loginFailed, loginStart, loginSuccess,
    registerStart, registerSuccess, registerFailed,
    logoutStart, logoutSuccess, logoutFailed,
    // changePasswordStart, changePasswordSuccess, changePasswordFailed,
    // getInfoUserByIDStart, getInfoUserByIDSuccess, getInfoUserByIDFailed,
    // updateAvatarUserStart, updateAvatarUserSuccess, updateAvatarUserFailed
} from './redux';

const options = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
}

function* loginSaga(action) {
    try {
        const resLogin = yield call(loginApi, action.payload);
        if (resLogin.ok) {
            yield put({type: loginSuccess, payload: resLogin.data,});
            toast.success('đăng nhập thành công.', options);
        } else {
            yield put({ type: loginFailed, payload: resLogin.message });
            toast.error(resLogin.message, options);
        }
    } catch (error) {
        yield put({ type: loginFailed, payload: error });
        toast.error('có lỗi xảy ra vui lòng liên hệ quản trị viên!', options);
    }
}

function* registersSaga(action) {
    try {
        const res = yield call(registerApi, action.payload);
        if (res.ok) {
            yield put({ type: registerSuccess.type, payload: res.Object });
            toast.success('Đăng ký tài khoản mới thành công.', options);
        } else {
            yield put({ type: registerFailed.type, payload: res.Object });
            toast.error(res.message, options);
        }
    } catch (error) {
        yield put({ type: registerFailed.type, payload: error });
        toast.error('có lỗi xảy ra vui lòng liên hệ quản trị viên!', options);
    }
}

function* watchLogin() {
    yield takeLatest(loginStart.type, loginSaga);
}
function* watchRegister() {
    yield takeLatest(registerStart.type, registersSaga);
}

export default function* authSaga() {
    yield all([watchLogin(), watchRegister()]);
}
