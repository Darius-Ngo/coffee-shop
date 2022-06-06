import { createSlice } from '@reduxjs/toolkit';
import ReduxType from '../../../../redux/types';

const initialState = {
    data: {
        listCategory: [],
    },
    status: ReduxType.INIT
}

const categoryManagerSlice = createSlice({
    name: 'categoryManager',
    initialState,
    reducers: {
      getListStart: (state) => {
        state.status = ReduxType.LOADING;
      },
      getListSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listCategory = action.payload;
      },
      getListFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      insertStart: (state) => {
        state.status = ReduxType.LOADING;
      },
      insertSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
      },
      insertFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
      updateStart: (state) => {
        state.status = ReduxType.LOADING;
      },
      updateSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
      },
      updateFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
      deleteStart: (state) => {
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

  } = categoryManagerSlice.actions;
export default categoryManagerSlice.reducer;