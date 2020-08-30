import {createAction, createReducer} from '@reduxjs/toolkit';

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
export const stopTimer = createAction('TIMER/STOP');
export const resetTimer = createAction('TIMER/RESET');
export const notifyWorkTimeEnded = createAction('TIMER/WORK_TIME_ENDED');
export const notifyRestTimeEnded = createAction('TIMER/REST_TIME_ENDED');

const defaultState: TimerReducer = {
    status: TimerStatus.STOPPED,
    currentTimerType: TimerType.WORK,
    currentTomatoCount: 1,
    maxTomatoCount: 10,
    initialRestTime: 300, // 5 min
    initialWorkTime: 1500, // 25 min
    remainTime: 1500, // 25 min, same as initialWorkTime
};

export default createReducer(defaultState, {
    [startTimer.type]: (state) => {
        state.status = TimerStatus.RUNNING;
    },
    [stopTimer.type]: (state) => {
        state.remainTime = state.initialWorkTime;
        state.currentTimerType = TimerType.WORK;
        state.status = TimerStatus.STOPPED;
    },
    [resetTimer.type]: (state) => {
        state.remainTime = state.initialWorkTime;
        state.currentTimerType = TimerType.WORK;
        state.status = TimerStatus.STOPPED;
        state.currentTomatoCount = 0;
    }
});

// export const addTimer = createAction<Timer>('TIMER/ADDED');
// export const removeTimer = createAction<number>('TIMER/REMOVED');
// export const selectTimer = createAction<number>('TIMER/SELECTED');
// export const changeTimerOrder = createAction<[number, number]>('TIMER/CHANGE_ORDER');
// export const selectTimerIndex = createAction<number>('TIMER/TIMER_SELECTED');
//
// const defaultState: TimerReducer = {
//     currentSelectedTimerIndex: 0,
//     timers: [
//         {title: '더미따리1', initialSecond: 10},
//         {title: '더미따리2', initialSecond: 15},
//         {title: '더미따리3', initialSecond: 20},
//         {title: '더미따리4', initialSecond: 25},
//     ],
// };
//
// export default createReducer(defaultState, {
//     [addTimer.type]: (state, {payload}: PayloadAction<Timer>) => {
//         state.timers = [payload, ...state.timers];
//     },
//     [removeTimer.type]: (state, {payload}: PayloadAction<number>) => {
//         state.timers.splice(payload, 1);
//     },
//     [selectTimerIndex.type]: (state, {payload}: PayloadAction<number>) => {
//         state.currentSelectedTimerIndex = payload;
//     },
//     [changeTimerOrder.type]: (state, {payload}: PayloadAction<[number, number]>) => {
//         const [prev, next] = payload;
//         const nextTimers = cloneDeep(state.timers);
//         const tempTimerObject = nextTimers[prev];
//         nextTimers[prev] = nextTimers[next];
//         nextTimers[next] = tempTimerObject;
//         state.timers = nextTimers;
//     }
// });
