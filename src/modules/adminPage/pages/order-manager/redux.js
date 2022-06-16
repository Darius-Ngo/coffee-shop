import { createSlice } from '@reduxjs/toolkit';
import ReduxType from '../../../../redux/types';

const initialState = {
    data: {
        listOrder: [],
        listDetail: [],
    },
    status: ReduxType.INIT
}

const orderManagerSlice = createSlice({
    name: 'orderManager',
    initialState,
    reducers: {
      getListStart: (state) => {
        state.status = ReduxType.LOADING;
      },
      getListSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listOrder = action.payload;
      },
      getListFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },

      getListDetailStart: (state) => {
        state.status = ReduxType.LOADING;
      },
      getListDetailSuccess: (state, action) => {
        state.status = ReduxType.SUCCESS;
        state.data.listDetail = action.payload;
      },
      getListDetailFailed: (state, action) => {
        state.status = ReduxType.ERROR;
      },
    }
});

export const { 
    getListFailed, getListSuccess, getListStart,
    getListDetailFailed, getListDetailSuccess, getListDetailStart,
  } = orderManagerSlice.actions;
export default orderManagerSlice.reducer;