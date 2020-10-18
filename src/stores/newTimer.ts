import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';

export type Timer = {
    timerName: string;
    endSound: string;
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
export const nextTimer = createAction('NEW_TIMER/NEXT');
export const selectTimer = createAction<string>('NEW_TIMER/SELECT');
export const changeTimerInitialTime = createAction<{ timerName: string, value: number }>('NEW_TIMER/CHANGE_INITIAL_TIME');
export const tick = createAction('NEW_TIMER/TICK');

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

function createTimer({timerName, initialTime, endSound}: PartialBy<Omit<Timer, 'currentTime'>, 'endSound'>): Timer {
    return {
        timerName,
        initialTime,
        currentTime: initialTime,
        endSound: endSound || 'tadya.mp3',
    };
}

const defaultTimers: Timer[] = [
    createTimer({timerName: '집중시간', initialTime: 1500}),
    createTimer({timerName: '휴식시간', initialTime: 300}),
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
    [nextTimer.type]: (state) => {
        state.selectedTimer.currentTime = state.selectedTimer.initialTime;
        const currentIndex = state.timers.findIndex(timer => timer.timerName === state.selectedTimer.timerName);
        if (currentIndex >= state.timers.length - 1) {
            state.selectedTimer = state.timers[0];
        } else {
            state.selectedTimer = state.timers[currentIndex + 1];
        }
        state.selectedTimer.currentTime = state.selectedTimer.initialTime;
    },
    [tick.type]: (state) => {
        if (state.selectedTimer.currentTime > 0) {
            state.selectedTimer.currentTime--;
        }
    },
    [startTimer.type]: (state) => {
        state.status = TimerStatus.STARTED;
    },
    [stopTimer.type]: (state) => {
        state.status = TimerStatus.STOPPED;
    },
    [changeTimerInitialTime.type]: (state, {payload}: PayloadAction<{ timerName: string, value: number }>) => {
        const {timerName, value} = payload;
        const selectedTimer = state.timers.find((timer) => timer.timerName === timerName);
        if (selectedTimer) {
            selectedTimer.initialTime = value;
        }
    }
});
