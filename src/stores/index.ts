import {configureStore} from '@reduxjs/toolkit';
import common from './common';
import timer from './timer';
import timerMiddleware from '../middlewares/timerMiddleware';
import newTimerMiddleware from '../middlewares/newTimerMiddleware';
import newTimer from './newTimer';

const store = configureStore({
    reducer: {
        common, timer, newTimer
    },
    middleware: [timerMiddleware, newTimerMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
