import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';

export enum TimerStatus {
    STOPPED, RUNNING
}

export enum TimerType {
    WORK, REST
}

export interface TimerReducer {
    currentTomatoCount: number;
    maxTomatoCount: number;
    remainTime: number;
    initialWorkTime: number;
    initialRestTime: number;
    status: TimerStatus;
    currentTimerType: TimerType;
}

export const increaseTomatoCount = createAction('TIMER/INCREASE_TOMATO');
export const changeMaxTomatoCount = createAction<number>('TIMER/CHANGE_MAX_TOMATO');
export const changeInitialWorkTime = createAction<number>('TIMER/CHANGE_WORK_TIME');
export const changeInitialRestTime = createAction<number>('TIMER/CHANGE_REST_TIME');
export const changeTimerStatus = createAction<TimerStatus>('TIMER/CHANGE_STATUS');
export const startTimer = createAction('TIMER/START');
export const suspendTimer = createAction('TIMER/STOP');
export const resetTimer = createAction('TIMER/RESET');
export const endTimer = createAction('TIMER/TIME_ENDED');
export const tick = createAction('TIMER/TICK');

const defaultState: TimerReducer = {
    status: TimerStatus.STOPPED,
    currentTimerType: TimerType.WORK,
    currentTomatoCount: 0,
    maxTomatoCount: 10,
    initialRestTime: 300, // 5 min
    initialWorkTime: 1500, // 25 min
    remainTime: 1500, // 25 min, same as initialWorkTime
};

export default createReducer(defaultState, {
    [startTimer.type]: (state) => {
        state.status = TimerStatus.RUNNING;
        state.currentTomatoCount++;
    },
    [suspendTimer.type]: (state) => {
        state.remainTime = state.initialWorkTime;
        state.currentTimerType = TimerType.WORK;
        state.status = TimerStatus.STOPPED;
    },
    [resetTimer.type]: (state) => {
        state.remainTime = state.initialWorkTime;
        state.currentTimerType = TimerType.WORK;
        state.status = TimerStatus.STOPPED;
        state.currentTomatoCount = 0;
    },
    [changeInitialWorkTime.type]: (state, {payload}: PayloadAction<number>) => {
        state.initialWorkTime = payload;
        state.status = TimerStatus.STOPPED;
        state.currentTimerType = TimerType.WORK;
        state.remainTime = state.initialWorkTime;
    },
    [changeInitialRestTime.type]: (state, {payload}: PayloadAction<number>) => {
        state.initialRestTime = payload;
        state.status = TimerStatus.STOPPED;
        state.currentTimerType = TimerType.WORK;
    },
    [changeMaxTomatoCount.type]: (state, {payload}: PayloadAction<number>) => {
        state.maxTomatoCount = payload;
        state.status = TimerStatus.STOPPED;
        state.currentTimerType = TimerType.WORK;
    },
    [tick.type]: (state) => {
        if (state.remainTime > 0) {
            state.remainTime--;
        } else {
            state.status = TimerStatus.STOPPED;
        }
    },
    [endTimer.type]: (state) => {
        if (state.currentTimerType === TimerType.WORK) {
            state.currentTimerType = TimerType.REST;
            state.remainTime = state.initialRestTime;
            state.status = TimerStatus.STOPPED; // TODO, 세팅에 따라 자동실행이 될 수도 있어야 한다
        } else if (state.currentTimerType === TimerType.REST) {
            state.currentTimerType = TimerType.WORK;
            state.remainTime = state.initialWorkTime;
            state.status = TimerStatus.STOPPED; // TODO, 세팅에 따라 자동실행이 될 수도 있어야 한다
        }
    },
});
