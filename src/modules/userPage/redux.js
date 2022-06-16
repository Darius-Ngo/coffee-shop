import { createSlice } from '@reduxjs/toolkit';
import ReduxType from '../../redux/types';

const initialState = {
    data: {
        listCategory: [],
        listProduct: [],
        categoryDetail: {},
        productDetail: {},
        listCart: [],
        listTinhThanh: [],
        listQuanHuyen: [],
        listXaPhuong: [],
    },
    status: ReduxType.INIT
}
const userPageSlice = createSlice({
    name: 'userPage',
    initialState,
    reducers: {

      getListCategoryStart: (state) => {
        state.status = ReduxType.LOADING;
      },
      getListCategorySuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listCategory = action.payload;
      },
      getListCategoryFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      getCategoryByIdStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      getCategoryByIdSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.categoryDetail = action.payload;
      },
      getCategoryByIdFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      getListProductStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      getListProductSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listProduct = action.payload;
      },
      getListProductFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      getProductByIdStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      getProductByIdSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.productDetail = action.payload;
      },
      getProductByIdFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      getTinhThanhStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      getTinhThanhSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listTinhThanh = action.payload;
      },
      getTinhThanhFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      getQuanHuyenStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      getQuanHuyenSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listQuanHuyen = action.payload;
      },
      getQuanHuyenFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      getXaPhuongStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      getXaPhuongSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listXaPhuong = action.payload;
      },
      getXaPhuongFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      getListCartStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      getListCartSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listCart = action.payload;
      },
      getListCartFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
      insertCartStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      insertCartSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
      },
      insertCartFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
      deleteCartStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      deleteCartSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
      },
      deleteCartFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      datHangStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      datHangSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
      },
      datHangFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
    }
});

export const { 
    getListCategoryFailed, getListCategorySuccess, getListCategoryStart,
    getListProductFailed, getListProductSuccess, getListProductStart,
    getCategoryByIdFailed, getCategoryByIdSuccess, getCategoryByIdStart,
    getProductByIdFailed, getProductByIdSuccess, getProductByIdStart,
    getTinhThanhFailed, getTinhThanhSuccess, getTinhThanhStart,
    getQuanHuyenFailed, getQuanHuyenSuccess, getQuanHuyenStart,
    getXaPhuongFailed, getXaPhuongSuccess, getXaPhuongStart,
    getListCartStart, getListCartSuccess, getListCartFailed,
    insertCartStart, insertCartSuccess, insertCartFailed,
    deleteCartStart, deleteCartSuccess, deleteCartFailed,
    datHangStart, datHangSuccess, datHangFailed,
  } = userPageSlice.actions;
export default userPageSlice.reducer;