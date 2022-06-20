import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { GetListDonHangApi, GetListChiTietDonHangApi, ChuyenTrangThaiApi } from '../../../../core/apis/orderManager';

import {
    getListStart, getListSuccess, getListFailed,
    getListDetailFailed, getListDetailSuccess, getListDetailStart,
    chuyenTrangThaiFailed, chuyenTrangThaiSuccess, chuyenTrangThaiStart,
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

function* getListSaga(action) {
    try {
        const res = yield call(GetListDonHangApi, action.payload);
        if (res.ok) {
            yield put({type: getListSuccess,payload: res.data});
        } else {
            yield put({ type: getListFailed, payload: res.message });
            toast.error(res.message, options);
        }
    } catch (error) {
        yield put({ type: getListFailed, payload: error });
        toast.error('có lỗi xảy ra vui lòng liên hệ quản trị viên!', options);
    }
}

function* getListDetailSaga(action) {
    try {
        const res = yield call(GetListChiTietDonHangApi, action.payload);
        if (res.ok) {
            yield put({type: getListDetailSuccess,payload: res.data});
        } else {
            yield put({ type: getListDetailFailed, payload: res.message });
            toast.error(res.message, options);
        }
    } catch (error) {
        yield put({ type: getListDetailFailed, payload: error });
        toast.error('có lỗi xảy ra vui lòng liên hệ quản trị viên!', options);
    }
}

function* chuyenTrangThaiSaga(action) {
    try {
        const res = yield call(ChuyenTrangThaiApi, action.payload);
        if (res.ok) {
            yield put({type: chuyenTrangThaiSuccess,payload: res.data});
            toast.success('Chuyển trạng thái đơn hàng thành công.', options);
            yield put({type: getListStart.type});
        } else {
            yield put({ type: chuyenTrangThaiFailed, payload: res.message });
            toast.error(res.message, options);
        }
    } catch (error) {
        yield put({ type: chuyenTrangThaiFailed, payload: error });
        toast.error('có lỗi xảy ra vui lòng liên hệ quản trị viên!', options);
    }
}

function* watchGetList() {
    yield takeLatest(getListStart.type, getListSaga);
}
function* watchGetListDetail() {
    yield takeLatest(getListDetailStart.type, getListDetailSaga);
}
function* watchChuyenTrangThai() {
    yield takeLatest(chuyenTrangThaiStart.type, chuyenTrangThaiSaga);
}

export default function* OrderManagerSaga() {
    yield all([watchGetList(), watchGetListDetail(), watchChuyenTrangThai()]);
}
