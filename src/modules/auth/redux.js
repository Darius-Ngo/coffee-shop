import { createSlice } from '@reduxjs/toolkit';
import ReduxType from '../../redux/types';

const initialState = {
    data: {
        User: {},
    },
    status: ReduxType.INIT
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.status = ReduxType.LOADING;
            state.error = undefined;
        },
        loginSuccess: (state, action) => {
            state.status = ReduxType.SUCCESS;
            state.data.User = action.payload.nguoiDung;
            localStorage.setItem('User', JSON.stringify(action.payload.nguoiDung));
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('authority', action.payload.nguoiDung.phanQuyen);
        },
        loginFailed: (state, action) => {
            state.status = ReduxType.ERROR;
            state.error = action.payload;
        },

        logoutStart: (state) => {
            state.status = ReduxType.LOADING;
            state.error = undefined;
            state.data.User = {};
            // localStorage.clear();
        },

        registerStart: (state) => {
            state.status = ReduxType.LOADING;
            state.error = undefined;
        },
        registerSuccess: (state, action) => {
            state.status = ReduxType.SUCCESS;
        },
        registerFailed: (state, action) => {
            state.status = ReduxType.ERROR;
            state.error = action.payload;
        },
    }
});

export const { loginFailed, loginSuccess, loginStart,
    logoutStart, logoutSuccess, logoutFailed,
    registerStart, registerSuccess, registerFailed } = authSlice.actions;
export default authSlice.reducer;