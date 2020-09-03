import {createAction, createReducer, Draft, PayloadAction} from '@reduxjs/toolkit';

export enum TimerStatus {
    STOPPED, RUNNING, PENDING
}

export enum TimerType {
    WORK, REST
}

export interface TimerReducer {
    workTimeSound: string;
    restTimeSound: string;
    currentTomatoCount: number;
    maxTomatoCount: number;
    remainTime: number;
    initialWorkTime: number;
    initialRestTime: number;
    status: TimerStatus;
    currentTimerType: TimerType;
    pendingNextPhaseTime: number;
    autoPlay: boolean;
}

export const increaseTomatoCount = createAction('TIMER/INCREASE_TOMATO');
export const changeMaxTomatoCount = createAction<number>('TIMER/CHANGE_MAX_TOMATO');
export const changeInitialWorkTime = createAction<number>('TIMER/CHANGE_WORK_TIME');
export const changeInitialRestTime = createAction<number>('TIMER/CHANGE_REST_TIME');
export const changeTimerStatus = createAction<TimerStatus>('TIMER/CHANGE_STATUS');
export const startTimer = createAction('TIMER/START');
export const suspendTimer = createAction('TIMER/STOP');
export const resetTimer = createAction('TIMER/RESET');
export const pendingTimer = createAction('TIMER/PENDING');
export const endTimer = createAction('TIMER/TIME_ENDED');
export const tick = createAction('TIMER/TICK');
export const setAutoPlay = createAction<boolean>('TIMER/AUTOPLAY');

const defaultState: TimerReducer = {
    workTimeSound: 'dudungtak.mp3',
    restTimeSound: 'gujitmal.mp3',
    status: TimerStatus.STOPPED,
    currentTimerType: TimerType.WORK,
    currentTomatoCount: 0,
    maxTomatoCount: 10,
    initialRestTime: 5, // 5 min
    initialWorkTime: 5, // 25 min
    remainTime: 5, // 25 min, same as initialWorkTime
    pendingNextPhaseTime: 5000, // if 0, show next phase immediately
    autoPlay: true,
};

function resetTimerStateByType(state: Draft<TimerReducer>, timerType: TimerType) {
    if (timerType === TimerType.WORK) {
        state.remainTime = state.initialWorkTime;
        state.currentTimerType = TimerType.WORK;
    } else if (timerType === TimerType.REST) {
        state.remainTime = state.initialRestTime;
        state.currentTimerType = TimerType.REST;
    }

    state.status = TimerStatus.STOPPED;
}

export default createReducer(defaultState, {
    [startTimer.type]: (state) => {
        state.status = TimerStatus.RUNNING;

        if (state.currentTimerType === TimerType.WORK) {
            state.currentTomatoCount++;
        }
    },
    [suspendTimer.type]: (state) => {
        resetTimerStateByType(state, TimerType.WORK);
    },
    [resetTimer.type]: (state) => {
        resetTimerStateByType(state, TimerType.WORK);
        state.currentTomatoCount = 0;
    },
    [pendingTimer.type]: (state) => {
        state.status = TimerStatus.PENDING;
    },
    [changeInitialWorkTime.type]: (state, {payload}: PayloadAction<number>) => {
        state.initialWorkTime = payload;
        state.status = TimerStatus.STOPPED;
        if (state.currentTimerType === TimerType.WORK) {
            state.remainTime = state.initialWorkTime;
        }
    },
    [changeInitialRestTime.type]: (state, {payload}: PayloadAction<number>) => {
        state.initialRestTime = payload;
        state.status = TimerStatus.STOPPED;
        if (state.currentTimerType === TimerType.REST) {
            state.remainTime = state.initialRestTime;
        }
    },
    [changeMaxTomatoCount.type]: (state, {payload}: PayloadAction<number>) => {
        state.maxTomatoCount = payload;
        state.status = TimerStatus.STOPPED;
        state.currentTimerType = TimerType.WORK;
    },
    [tick.type]: (state) => {
        if (state.remainTime > 0 && state.status !== TimerStatus.STOPPED) {
            state.remainTime--;
        } else {
            state.status = TimerStatus.STOPPED;
        }
    },
    [endTimer.type]: (state) => {
        if (state.currentTimerType === TimerType.WORK) {
            resetTimerStateByType(state, TimerType.REST);
        } else if (state.currentTimerType === TimerType.REST) {
            resetTimerStateByType(state, TimerType.WORK);
        }
    },
    [setAutoPlay.type]: (state, {payload}: PayloadAction<boolean>) => {
        state.autoPlay = payload;
    }
});
