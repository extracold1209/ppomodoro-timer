import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';

export type Timer = {
    id: string;
    timerName: string;
    endSound: string;
    initialTime: number;
    currentTime: number;
}

export type TimerMap = { [timerName: string]: Timer };

export enum TimerStatus {
    STOPPED, PENDING, STARTED
}

export interface TimerReducer {
    status: TimerStatus;
    timers: TimerMap;
    timerIds: string[];
    selectedTimer: string;
}

export const startTimer = createAction('TIMER_/START');
export const stopTimer = createAction('TIMER_/STOP');
export const nextTimer = createAction('TIMER_/NEXT');
export const selectTimer = createAction<string>('TIMER_/SELECT');
export const changeTimerInitialTime = createAction<{ id: string, value: number }>('TIMER_/CHANGE_INITIAL_TIME');
export const tick = createAction('TIMER_/TICK');

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

function createTimer({id, timerName, initialTime, endSound}: PartialBy<Omit<Timer, 'currentTime'>, 'endSound'>): Timer {
    return {
        id,
        timerName,
        initialTime,
        currentTime: initialTime,
        endSound: endSound || 'tadya.mp3',
    };
}

const timers: TimerMap = {
    'work': createTimer({id: 'work', timerName: '집중시간', initialTime: 1500}),
    'rest': createTimer({id: 'rest', timerName: '휴식시간', initialTime: 300}),
};

const defaultState: TimerReducer = {
    status: TimerStatus.STOPPED,
    timers,
    timerIds: Object.keys(timers),
    selectedTimer: 'work',
};


export default createReducer(defaultState, {
    [selectTimer.type]: (state, {payload}: PayloadAction<string>) => {
        // reset current timer's time
        const selectedTimer = state.timers[state.selectedTimer];
        selectedTimer.currentTime = selectedTimer.initialTime;


        const nextTimer = state.timers[payload];
        if (nextTimer) {
            nextTimer.currentTime = nextTimer.initialTime;
            state.selectedTimer = payload;
        } else {
            console.error('try to select timer is failed!');
        }
    },
    [nextTimer.type]: (state) => {
        const selectedTimer = state.timers[state.selectedTimer];

        selectedTimer.currentTime = selectedTimer.initialTime;
        const currentIndex = state.timerIds.findIndex((id) => id === selectedTimer.id);
        if (currentIndex >= state.timerIds.length - 1) {
            state.selectedTimer = state.timerIds[0];
        } else {
            state.selectedTimer = state.timerIds[currentIndex + 1];
        }
        selectedTimer.currentTime = selectedTimer.initialTime;
    },
    [tick.type]: (state) => {
        const selectedTimer = state.timers[state.selectedTimer];
        if (selectedTimer.currentTime > 0) {
            selectedTimer.currentTime--;
        }
    },
    [startTimer.type]: (state) => {
        state.status = TimerStatus.STARTED;
    },
    [stopTimer.type]: (state) => {
        state.status = TimerStatus.STOPPED;
    },
    [changeTimerInitialTime.type]: (state, {payload}: PayloadAction<{ id: string, value: number }>) => {
        const {id, value} = payload;
        const selectedTimer = state.timers[id];
        if (selectedTimer) {
            if (state.status !== TimerStatus.STOPPED) {
                state.status = TimerStatus.STOPPED;
            }

            selectedTimer.initialTime = value;
            selectedTimer.currentTime = value;
        }
    }
});
