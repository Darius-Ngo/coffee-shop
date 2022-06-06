import { createSlice } from '@reduxjs/toolkit';
import ReduxType from '../../../../redux/types';

const initialState = {
    data: {
        listProduct: [],
    },
    status: ReduxType.INIT
}

const productManagerSlice = createSlice({
    name: 'productManager',
    initialState,
    reducers: {
      getListStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      getListSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listProduct = action.payload;
      },
      getListFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      insertStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      insertSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
      },
      insertFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
      updateStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      updateSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
      },
      updateFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
      deleteStart: (state, action) => {
        state.status = ReduxType.LOADING;
      },
      deleteSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
      },
      deleteFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
    }
});

export const { 
    getListFailed, getListSuccess, getListStart,
    insertStart, insertSuccess, insertFailed,
    updateStart, updateSuccess, updateFailed,
    deleteStart, deleteSuccess, deleteFailed,

  } = productManagerSlice.actions;
export default productManagerSlice.reducer;