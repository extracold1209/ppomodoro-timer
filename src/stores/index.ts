import {configureStore} from '@reduxjs/toolkit';
import common from './common';
import newTimerMiddleware from '../middlewares/newTimerMiddleware';
import newTimer from './newTimer';

const store = configureStore({
    reducer: {common, newTimer},
    middleware: [newTimerMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
