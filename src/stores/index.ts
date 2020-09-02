import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import common from './common';
import timer from './timer';
import timerMiddleware from '../middlewares/timerMiddleware';

const store: EnhancedStore = configureStore({
    reducer: {
        common, timer
    },
    middleware: [timerMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
