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
export const selectTimer = createAction<string>('NEW_TIMER/SELECT');
export const tick = createAction('NEW_TIMER/TICK');

const defaultTimers: Timer[] = [
    {timerName: '집중시간', initialTime: 600, currentTime: 600},
    {timerName: '휴식시간', initialTime: 300, currentTime: 300},
];

const defaultState: NewTimerReducer = {
    status: TimerStatus.STOPPED,
    timers: defaultTimers,
    selectedTimer: defaultTimers[0],
};

export default createReducer(defaultState, {
    [selectTimer.type]: (state, {payload}: PayloadAction<string>) => {
        state.selectedTimer.currentTime = state.selectedTimer.initialTime;
        const nextTimer = state.timers.find((timer) => timer.timerName === payload);
        if (nextTimer) {
            state.selectedTimer = nextTimer;
            state.selectedTimer.currentTime = state.selectedTimer.initialTime;
        } else {
            console.error('try to select timer is failed!');
        }
    },
    [tick.type]: (state) => {
        if (state.selectedTimer.currentTime > 0) {
            state.selectedTimer.currentTime--;
        }
    }
});
