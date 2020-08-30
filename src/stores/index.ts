import {configureStore} from '@reduxjs/toolkit';
import common from './common';
import timer, {tick, TimerStatus} from './timer';

const store = configureStore({
    reducer: {
        common, timer
    }
});

let tickInterval: number | undefined;
store.subscribe(() => {
    const rootState = store.getState();
    const timerStatus = rootState.timer.status;
    if (!tickInterval && timerStatus === TimerStatus.RUNNING) {
        tickInterval = setInterval(() => {
            store.dispatch(tick());
        }, 1000);
    } else if (tickInterval && timerStatus === TimerStatus.STOPPED) {
        clearInterval(tickInterval);
        tickInterval = undefined;
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
