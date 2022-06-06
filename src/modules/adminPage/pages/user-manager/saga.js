import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';
import { GetListUserApi, InsertUserApi, UpdateUserApi, DeleteUserApi } from '../../../../core/apis/userManager';

import {
    getListStart, getListSuccess, getListFailed,
    insertStart, insertSuccess, insertFailed,
    updateStart, updateSuccess, updateFailed,
    deleteStart, deleteSuccess, deleteFailed,
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
        const res = yield call(GetListUserApi, action.payload);
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

function* insertSaga(action) {
  try {
      const res = yield call(InsertUserApi, action.payload);
      if (res.ok) {
          yield put({type: insertSuccess,payload: res.data,});
          toast.success('Thêm thông tin thành công', options);
          yield put({type: getListStart.type});
      } else {
          yield put({ type: insertFailed, payload: res.message });
          toast.error(res.message, options);
      }
  } catch (error) {
      yield put({ type: insertFailed, payload: error });
      toast.error('có lỗi xảy ra vui lòng liên hệ quản trị viên!', options);
  }
}

function* updateSaga(action) {
  try {
      const res = yield call(UpdateUserApi, action.payload);
      if (res.ok) {
          yield put({type: updateSuccess,payload: res.data,});
          toast.success('Cập nhật thông tin thành công', options);
          yield put({type: getListStart.type});
      } else {
          yield put({ type: updateFailed, payload: res.message });
          toast.error(res.message, options);
      }
  } catch (error) {
      yield put({ type: updateFailed, payload: error });
      toast.error('có lỗi xảy ra vui lòng liên hệ quản trị viên!', options);
  }
}

function* deleteSaga(action) {
  try {
      const res = yield call(DeleteUserApi, action.payload);
      if (res.ok) {
          yield put({type: deleteSuccess,payload: res.data,});
          toast.success('Xóa thông tin thành công', options);
          yield put({type: getListStart.type});
      } else {
          yield put({ type: deleteFailed, payload: res.message });
          toast.error(res.message, options);
      }
  } catch (error) {
      yield put({ type: deleteFailed, payload: error });
      toast.error('có lỗi xảy ra vui lòng liên hệ quản trị viên!', options);
  }
}

function* watchGetList() {
    yield takeLatest(getListStart.type, getListSaga);
}
function* watchInsert() {
  yield takeLatest(insertStart.type, insertSaga);
}
function* watchUpdate() {
  yield takeLatest(updateStart.type, updateSaga);
}
function* watchDelete() {
  yield takeLatest(deleteStart.type, deleteSaga);
}

export default function* UserManagerSaga() {
    yield all([watchGetList(), watchInsert(), watchUpdate(), watchDelete()]);
}
