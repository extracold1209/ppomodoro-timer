import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';

export type Timer = {
    timerName: string;
    initialTime: number;
    currentTime: number;
}

enum TimerStatus {
    STOPPED, PENDING, STARTED
}

export interface NewTimerReducer {
    status: TimerStatus;
    timers: Timer[];
    selectedTimer: Timer;
}

export const startTimer = createAction('NEW_TIMER/START');
export const stopTimer = createAction('NEW_TIMER/STOP');
export const selectTimer = createAction<number>('NEW_TIMER/SELECT');
export const tick = createAction('NEW_TIMER/TICK');

const defaultTimers: Timer[] = [
    {timerName: 'workTime', initialTime: 600, currentTime: 600},
    {timerName: 'restTime', initialTime: 300, currentTime: 300},
];

const defaultState: NewTimerReducer = {
    status: TimerStatus.STOPPED,
    timers: defaultTimers,
    selectedTimer: defaultTimers[0],
};

export default createReducer(defaultState, {
    [selectTimer.type]: (state, {payload}: PayloadAction<number>) => {
        state.selectedTimer.currentTime = 0;
        state.selectedTimer = state.timers[payload];
    },
    [tick.type]: (state) => {
        console.log('pya', state.selectedTimer.currentTime);
        if (state.selectedTimer.currentTime > 0) {
            state.selectedTimer.currentTime--;
        }
    }
});
