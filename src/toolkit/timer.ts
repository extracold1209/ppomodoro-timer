import {createAction, createReducer, PayloadAction} from '@reduxjs/toolkit';

export enum TimerStatusEnum {
    STOPPED, RUNNING
}

export interface TimerReducer {
    currentSelectedTimerIndex: number;
    timers: Timer[];
    status: TimerStatusEnum;
}

export const addTimer = createAction<Timer>('TIMER/ADDED');
export const removeTimer = createAction<number>('TIMER/REMOVED');
export const changeTimerStatus = createAction<TimerStatusEnum>('TIMER/STATUS_CHANGED');
export const selectTimerIndex = createAction<number>('TIMER/TIMER_SELECTED');

const defaultState: TimerReducer = {
    currentSelectedTimerIndex: 0,
    timers: [
        {title: '더미따리1', initialSecond: 10},
        {title: '더미따리2', initialSecond: 15},
        {title: '더미따리3', initialSecond: 20},
        {title: '더미따리4', initialSecond: 25},
    ],
    status: TimerStatusEnum.STOPPED,
};

export default createReducer(defaultState, {
    [addTimer.type]: (state, {payload}: PayloadAction<Timer>) => {
        state.timers = [...state.timers, payload];
    },
    [removeTimer.type]: (state, {payload}: PayloadAction<number>) => {
        state.timers = state.timers.splice(payload, 1);
    },
    [changeTimerStatus.type]: (state, {payload}: PayloadAction<TimerStatusEnum>) => {
        state.status = payload;
    },
    [selectTimerIndex.type]: (state, {payload}: PayloadAction<number>) => {
        state.currentSelectedTimerIndex = payload;
    }
});
