import { configureStore } from '@reduxjs/toolkit';
import sagaMiddleware, { setupMiddleware } from './middleware';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';



// const persistedReducer = persistReducer(persistConfig, rootReducer) as Reducer<CombinedState<RootState>, AnyAction>;
const saga = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
    // middleware: [saga]
});
// saga.run(rootSaga);
setupMiddleware();
export default store;
