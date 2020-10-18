import {configureStore} from '@reduxjs/toolkit';
import common from './common';
import timerMiddleware from '../middlewares/timerMiddleware';
import timer from './timer';

const store = configureStore({
    reducer: {common, timer},
    middleware: [timerMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
