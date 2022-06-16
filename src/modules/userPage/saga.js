import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { toast } from "react-toastify";
import {
  GetListProductByCategoryIdApi,
  GetListCategoryApi,
  GetProductByIdApi,
  GetCategoryByIdApi,
  GetTinhThanhPhoApi,
  GetQuanHuyenApi,
  GetXaPhuongApi,
  DatHangApi,
  GetListCartApi,
  insertCartApi,
  deleteCartApi,
} from "../../core/apis/userApis";

import {
  getListCategoryStart,
  getListCategorySuccess,
  getListCategoryFailed,
  getListProductStart,
  getListProductSuccess,
  getListProductFailed,
  getProductByIdStart,
  getProductByIdSuccess,
  getProductByIdFailed,
  getCategoryByIdStart,
  getCategoryByIdSuccess,
  getCategoryByIdFailed,
  getTinhThanhStart,
  getTinhThanhSuccess,
  getTinhThanhFailed,
  getQuanHuyenStart,
  getQuanHuyenSuccess,
  getQuanHuyenFailed,
  getXaPhuongStart,
  getXaPhuongSuccess,
  getXaPhuongFailed,
  getListCartStart,
  getListCartSuccess,
  getListCartFailed,
  insertCartStart,
  insertCartSuccess,
  insertCartFailed,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailed,
  datHangStart,
  datHangSuccess,
  datHangFailed,
} from "./redux";

const options = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 2000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

function* getListCategorySaga(action) {
  try {
    const res = yield call(GetListCategoryApi);
    if (res.ok) {
      yield put({ type: getListCategorySuccess, payload: res.data });
    } else {
      yield put({ type: getListCategoryFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: getListCategoryFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}

function* getCategoryByIdSaga(action) {
  try {
    const res = yield call(GetCategoryByIdApi, action.payload);
    if (res.ok) {
      yield put({ type: getCategoryByIdSuccess, payload: res.data });
    } else {
      yield put({ type: getCategoryByIdFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: getCategoryByIdFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}

function* getListProductSaga(action) {
  try {
    const res = yield call(GetListProductByCategoryIdApi, action.payload);
    if (res.ok) {
      yield put({ type: getListProductSuccess, payload: res.data });
    } else {
      yield put({ type: getListProductFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: getListProductFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}

function* getProductByIdSaga(action) {
  try {
    const res = yield call(GetProductByIdApi, action.payload);
    if (res.ok) {
      yield put({ type: getProductByIdSuccess, payload: res.data });
    } else {
      yield put({ type: getProductByIdFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: getProductByIdFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}

function* getTinhThanhSaga(action) {
  try {
    const res = yield call(GetTinhThanhPhoApi);
    if (res.ok) {
      yield put({ type: getTinhThanhSuccess, payload: res.data });
    } else {
      yield put({ type: getTinhThanhFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: getTinhThanhFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}

function* getQuanHuyenSaga(action) {
  try {
    const res = yield call(GetQuanHuyenApi, action.payload);
    if (res.ok) {
      yield put({ type: getQuanHuyenSuccess, payload: res.data });
    } else {
      yield put({ type: getQuanHuyenFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: getQuanHuyenFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}
function* getXaPhuongSaga(action) {
  try {
    const res = yield call(GetXaPhuongApi, action.payload);
    if (res.ok) {
      yield put({ type: getXaPhuongSuccess, payload: res.data });
    } else {
      yield put({ type: getXaPhuongFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: getXaPhuongFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}

function* getListCartSaga(action) {
  try {
    const res = yield call(GetListCartApi, action.payload);
    if (res.ok) {
      yield put({ type: getListCartSuccess, payload: res.data });
    } else {
      yield put({ type: getListCartFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: getListCartFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}
function* insertCartSaga(action) {
  const User = JSON.parse(localStorage.getItem('User'));
  try {
    const res = yield call(insertCartApi, action.payload);
    if (res.ok) {
      yield put({ type: insertCartSuccess, payload: res.data });
      toast.success('Thêm sản phẩm vào giỏ thành công.', options);
      yield put({ type: getListCartStart.type, payload: User.id });
    } else {
      yield put({ type: insertCartFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: insertCartFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}
function* deleteCartSaga(action) {
  const User = JSON.parse(localStorage.getItem('User'));
  try {
    const res = yield call(deleteCartApi, action.payload);
    if (res.ok) {
      yield put({ type: deleteCartSuccess, payload: res.data });
      toast.success('Xóa sản phẩm khỏi giỏ thành công.', options);
      yield put({ type: getListCartStart.type, payload: User.id });
    } else {
      yield put({ type: deleteCartFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: deleteCartFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}
function* datHangSaga(action) {
  const User = JSON.parse(localStorage.getItem('User'));
  try {
    const res = yield call(DatHangApi, action.payload);
    if (res.ok) {
      yield put({ type: datHangSuccess, payload: res.data });
      toast.success('Đặt hàng thành công.', options);
      yield put({ type: getListCartStart.type, payload: User.id });
    } else {
      yield put({ type: datHangFailed, payload: res.message });
      toast.error(res.message, options);
    }
  } catch (error) {
    yield put({ type: datHangFailed, payload: error });
    // toast.error("có lỗi xảy ra vui lòng liên hệ quản trị viên!", options);
  }
}

function* watchGetListCategory() {
  yield takeLatest(getListCategoryStart.type, getListCategorySaga);
}
function* watchGetCategoryById() {
  yield takeLatest(getCategoryByIdStart.type, getCategoryByIdSaga);
}

function* watchGetListProduct() {
  yield takeLatest(getListProductStart.type, getListProductSaga);
}
function* watchGetProductById() {
  yield takeLatest(getProductByIdStart.type, getProductByIdSaga);
}

function* watchGetListCart() {
  yield takeLatest(getListCartStart.type, getListCartSaga);
}
function* watchInsertCart() {
  yield takeLatest(insertCartStart.type, insertCartSaga);
}
function* watchDeleteCart() {
  yield takeLatest(deleteCartStart.type, deleteCartSaga);
}
function* watchDatHang() {
  yield takeLatest(datHangStart.type, datHangSaga);
}

function* watchGetTinhThanh() {
  yield takeLatest(getTinhThanhStart.type, getTinhThanhSaga);
}
function* watchQuanHuyen() {
  yield takeLatest(getQuanHuyenStart.type, getQuanHuyenSaga);
}
function* watchXaPhuongId() {
  yield takeLatest(getXaPhuongStart.type, getXaPhuongSaga);
}

export default function* UserPageSaga() {
  yield all([
    watchGetListCategory(),
    watchGetListProduct(),
    watchGetProductById(),
    watchGetCategoryById(),
    watchGetTinhThanh(),
    watchQuanHuyen(),
    watchXaPhuongId(),
    watchGetListCart(),
    watchInsertCart(),
    watchDeleteCart(),
    watchDatHang(),
  ]);
}
