import {configureStore} from '@reduxjs/toolkit';
import common from './common';
import timer from './timer';

const store = configureStore({
    reducer: {
        common, timer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
